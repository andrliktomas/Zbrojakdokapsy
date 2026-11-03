import "server-only";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { hasAccess } from "@/lib/access";
import { questionById } from "@/content";
import {
  createAnthropicGenerator,
  explainMistake,
  fail,
  httpStatusOf,
  readAiConfig,
  type ExplainResponse,
  type ExplanationGenerator,
  type ExplanationStore,
} from "@/lib/ai-explain";

export const dynamic = "force-dynamic";
// Volání modelu je omezené timeoutem v SDK (25 s × 2 pokusy); rezerva pro hosting.
export const maxDuration = 60;

/** Při souběhu může upsert narazit na unikátní klíč (P2002) – pak stačí zopakovat. */
async function retryOnConflict<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") return fn();
    throw err;
  }
}

const store: ExplanationStore = {
  getCached: (questionId, chosenIndex) =>
    db.aiExplanation.findUnique({
      where: { questionId_chosenIndex: { questionId, chosenIndex } },
      select: { text: true, promptHash: true },
    }),
  async saveCached({ questionId, chosenIndex, promptHash, text, model }) {
    await retryOnConflict(() =>
      db.aiExplanation.upsert({
        where: { questionId_chosenIndex: { questionId, chosenIndex } },
        create: { questionId, chosenIndex, promptHash, text, model },
        update: { promptHash, text, model, createdAt: new Date() },
      }),
    );
  },
  async incrementUsage(userId, day) {
    const row = await retryOnConflict(() =>
      db.aiUsage.upsert({
        where: { userId_day: { userId, day } },
        create: { userId, day, count: 1 },
        update: { count: { increment: 1 } },
        select: { count: true },
      }),
    );
    return row.count;
  },
  async decrementUsage(userId, day) {
    await db.aiUsage.updateMany({ where: { userId, day, count: { gt: 0 } }, data: { count: { decrement: 1 } } });
  },
};

let generator: { key: string; fn: ExplanationGenerator } | null = null;

function getGenerator(apiKey: string | null, model: string): ExplanationGenerator | null {
  if (!apiKey) return null;
  const key = `${model}:${apiKey}`;
  if (generator?.key !== key) generator = { key, fn: createAnthropicGenerator({ apiKey, model }) };
  return generator.fn;
}

function respond(res: ExplainResponse) {
  return NextResponse.json(res, { status: httpStatusOf(res), headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  // Jen JSON: běžný cross-site formulář ho poslat nemůže (doplňuje SameSite=Lax cookie).
  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return respond(fail("invalid"));
  }
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return respond(fail("invalid"));
  }

  const config = readAiConfig();
  try {
    const result = await explainMistake(body, {
      getUser: getCurrentUser,
      hasPaidAccess: hasAccess,
      getQuestion: (id) => questionById.get(id),
      store,
      generate: getGenerator(config.apiKey, config.model),
      dailyLimit: config.dailyLimit,
    });
    return respond(result);
  } catch (err) {
    // Např. nedostupná DB – nikdy neshodit stránku, jen vrátit přátelskou chybu.
    console.error("[ai-vysvetleni] neočekávaná chyba", err);
    return respond(fail("unavailable"));
  }
}
