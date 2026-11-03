import "server-only";
import { createHash } from "node:crypto";
import { cookies, headers } from "next/headers";
import { db } from "./db";
import { planPurchaseData, settleReferralSafely } from "./billing";
import { getPlan } from "./plans";
import { LESSONS } from "@/content";
import {
  ACTIVATION_CODE_LENGTH,
  JOIN_CODE_LENGTH,
  REDEEM_LIMITS,
  isWellFormedCode,
  normalizeCode,
  randomCode,
  rateLimitStatus,
} from "./codes";
import {
  bestTestByPermit,
  daysSince,
  latestDate,
  AFTER_REGISTER_COOKIE,
  allowedAfterRegisterPath,
  redeemDecision,
  seatSummary,
  sectionAccuracy,
} from "./groups";

// --- Autorizace ---

/** Skupina jen pro jejího instruktora – jinak null (stránky pak vrací 404, aby neprozradily existenci). */
export async function getInstructorGroup(groupId: string, userId: string) {
  if (!groupId) return null;
  return db.group.findFirst({ where: { id: groupId, instructorId: userId } });
}

export async function listInstructorGroups(userId: string) {
  const groups = await db.group.findMany({
    where: { instructorId: userId },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { members: true } }, codes: { select: { redeemedAt: true } } },
  });
  return groups.map((g) => ({ id: g.id, name: g.name, createdAt: g.createdAt, members: g._count.members, seats: seatSummary(g.codes) }));
}

export async function generateUniqueJoinCode() {
  for (let i = 0; i < 5; i++) {
    const code = randomCode(JOIN_CODE_LENGTH);
    if (!(await db.group.findUnique({ where: { joinCode: code }, select: { id: true } }))) return code;
  }
  throw new Error("Nepodařilo se vygenerovat kód skupiny");
}

export async function findGroupByJoinCode(raw: string) {
  const code = normalizeCode(raw);
  if (!isWellFormedCode(code, JOIN_CODE_LENGTH)) return null;
  return db.group.findUnique({
    where: { joinCode: code },
    include: { instructor: { select: { id: true, name: true } }, _count: { select: { members: true } } },
  });
}

export async function listMemberships(userId: string) {
  return db.groupMember.findMany({
    where: { userId },
    orderBy: { joinedAt: "desc" },
    include: { group: { select: { id: true, name: true, instructor: { select: { name: true } } } } },
  });
}

// --- Pokrok studentů pro instruktora ---

export async function getGroupProgress(groupId: string, now = new Date()) {
  const members = await db.groupMember.findMany({
    where: { groupId },
    orderBy: { joinedAt: "asc" },
    include: { user: { select: { id: true, name: true, email: true, xp: true } } },
  });
  const ids = members.map((m) => m.userId);
  if (!ids.length) return [];
  const inIds = { userId: { in: ids } };
  const [attemptCounts, attemptLast, tests, cards, lessons, redeemed] = await Promise.all([
    db.questionAttempt.groupBy({ by: ["userId", "topic", "correct"], where: inIds, _count: { _all: true } }),
    db.questionAttempt.groupBy({ by: ["userId"], where: inIds, _max: { createdAt: true } }),
    db.testResult.findMany({ where: inIds, select: { userId: true, score: true, total: true, passed: true, permitType: true, createdAt: true } }),
    db.cardProgress.groupBy({ by: ["userId"], where: inIds, _sum: { reviews: true }, _max: { updatedAt: true } }),
    db.lessonRead.groupBy({ by: ["userId"], where: inIds, _count: { _all: true }, _max: { createdAt: true } }),
    db.activationCode.findMany({ where: { groupId, redeemedById: { in: ids } }, select: { redeemedById: true } }),
  ]);
  const withCode = new Set(redeemed.map((r) => r.redeemedById));

  return members
    .map((m) => {
      const uid = m.userId;
      const counts = attemptCounts.filter((a) => a.userId === uid).map((a) => ({ topic: a.topic, correct: a.correct, count: a._count._all }));
      const answered = counts.reduce((s, c) => s + c.count, 0);
      const correct = counts.filter((c) => c.correct).reduce((s, c) => s + c.count, 0);
      const userTests = tests.filter((t) => t.userId === uid);
      const card = cards.find((c) => c.userId === uid);
      const lesson = lessons.find((l) => l.userId === uid);
      const lastActivity = latestDate([
        attemptLast.find((a) => a.userId === uid)?._max.createdAt,
        latestDate(userTests.map((t) => t.createdAt)),
        card?._max.updatedAt,
        lesson?._max.createdAt,
      ]);
      return {
        userId: uid,
        name: m.user.name,
        email: m.user.email,
        joinedAt: m.joinedAt,
        xp: m.user.xp,
        answered,
        accuracy: answered ? correct / answered : null,
        sections: sectionAccuracy(counts),
        tests: bestTestByPermit(userTests),
        testsTaken: userTests.length,
        cardReviews: card?._sum.reviews ?? 0,
        lessonsRead: lesson?._count._all ?? 0,
        lessonsTotal: LESSONS.length,
        lastActivity,
        inactiveDays: lastActivity ? daysSince(lastActivity, now) : null,
        hasGroupCode: withCode.has(uid),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "cs"));
}

export type StudentProgress = Awaited<ReturnType<typeof getGroupProgress>>[number];

export async function getSeatSummary(groupId: string) {
  return seatSummary(await db.activationCode.findMany({ where: { groupId }, select: { redeemedAt: true } }));
}

export async function getGroupCodes(groupId: string) {
  const [codes, orders] = await Promise.all([
    db.activationCode.findMany({
      where: { groupId },
      orderBy: [{ createdAt: "asc" }, { code: "asc" }],
      include: { redeemedBy: { select: { name: true, email: true } } },
    }),
    db.seatOrder.findMany({ where: { groupId }, orderBy: { createdAt: "desc" } }),
  ]);
  return { codes, orders, summary: seatSummary(codes) };
}

// --- Omezení pokusů (hádání kódů) ---

export type AttemptKind = "code" | "join";

/** Hash IP adresy klienta (neukládáme ji v čitelné podobě). */
export async function clientIpHash() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip")?.trim();
  return ip ? createHash("sha256").update(`zk-rate:${ip}`).digest("hex").slice(0, 32) : null;
}

/** Vrací počet sekund do odblokování, nebo 0, pokud je pokus povolen. */
export async function retryAfterSeconds(userId: string, ipHash: string | null, kind: AttemptKind, now = new Date()) {
  const since = (ms: number) => new Date(now.getTime() - ms);
  const [byUser, byIp] = await Promise.all([
    db.redeemAttempt.findMany({
      where: { userId, kind, success: false, createdAt: { gt: since(REDEEM_LIMITS.user.windowMs) } },
      select: { createdAt: true },
    }),
    ipHash
      ? db.redeemAttempt.findMany({
          where: { ipHash, kind, success: false, createdAt: { gt: since(REDEEM_LIMITS.ip.windowMs) } },
          select: { createdAt: true },
        })
      : Promise.resolve([]),
  ]);
  const u = rateLimitStatus(byUser.map((a) => a.createdAt), now, REDEEM_LIMITS.user);
  const i = rateLimitStatus(byIp.map((a) => a.createdAt), now, REDEEM_LIMITS.ip);
  return Math.max(u.retryAfterSec, i.retryAfterSec);
}

export async function recordAttempt(userId: string, ipHash: string | null, kind: AttemptKind, success: boolean) {
  await db.redeemAttempt.create({ data: { userId, ipHash, kind, success } });
  // Úklid starých záznamů tohoto účtu (stačí den zpět).
  await db.redeemAttempt.deleteMany({ where: { userId, createdAt: { lt: new Date(Date.now() - 86_400_000) } } });
}

export function retryMessage(seconds: number) {
  const minutes = Math.ceil(seconds / 60);
  return `Příliš mnoho neúspěšných pokusů. Zkuste to prosím znovu za ${minutes} min.`;
}

// --- Uplatnění aktivačního kódu ---

export type RedeemResult =
  | {
      ok: true;
      alreadyYours: boolean;
      planName: string;
      accessEnd: string | null;
      group: { name: string; instructorName: string; joinCode: string; isMember: boolean };
    }
  | { ok: false; error: string };

export async function redeemActivationCode(userId: string, rawCode: string): Promise<RedeemResult> {
  const now = new Date();
  const ipHash = await clientIpHash();
  const wait = await retryAfterSeconds(userId, ipHash, "code", now);
  if (wait > 0) return { ok: false, error: retryMessage(wait) };

  const code = normalizeCode(rawCode);
  if (!isWellFormedCode(code, ACTIVATION_CODE_LENGTH)) {
    return { ok: false, error: "Aktivační kód má 12 znaků (písmena a číslice), například ABCD-EFGH-JKMN. Zkontrolujte ho prosím." };
  }
  const row = await db.activationCode.findUnique({
    where: { code },
    include: { group: { select: { id: true, name: true, joinCode: true, instructor: { select: { name: true } } } } },
  });
  let decision = redeemDecision(row, userId);

  if (row && decision === "ok") {
    // Jedna dávková transakce: podmíněný update kódu (jen dokud je volný) + nákup s unikátním
    // providerRef "code_<id>". Když kód mezitím zabral jiný požadavek, update selže (P2025)
    // nebo narazí unikátní index a celá transakce se vrátí – přístup se nepřipíše dvakrát.
    const purchase = await planPurchaseData(db, { userId, planId: row.planId, provider: "code", providerRef: `code_${row.id}`, amountCzk: 0 }, now);
    try {
      await db.$transaction([
        db.activationCode.update({ where: { id: row.id, redeemedById: null }, data: { redeemedById: userId, redeemedAt: now } }),
        db.purchase.create({ data: purchase }),
      ]);
    } catch (e) {
      const fresh = await db.activationCode.findUnique({ where: { id: row.id }, select: { redeemedById: true } });
      if (!fresh?.redeemedById) throw e; // jiná chyba než souběh – neukazovat "kód už byl použit"
      decision = fresh.redeemedById === userId ? "already_yours" : "used";
    }
  }

  if (!row || decision === "not_found" || decision === "used") {
    await recordAttempt(userId, ipHash, "code", false);
    return {
      ok: false,
      error: decision === "used" ? "Tento kód už byl použit. Každý kód lze uplatnit jen jednou." : "Kód neexistuje. Zkontrolujte, zda jste ho opsali správně.",
    };
  }

  await recordAttempt(userId, ipHash, "code", true);
  await settleReferralSafely(userId);
  const [membership, active] = await Promise.all([
    db.groupMember.findUnique({ where: { groupId_userId: { groupId: row.group.id, userId } }, select: { userId: true } }),
    db.purchase.findFirst({ where: { userId, endsAt: { gt: new Date() } }, orderBy: { endsAt: "desc" }, select: { endsAt: true } }),
  ]);
  return {
    ok: true,
    alreadyYours: decision === "already_yours",
    planName: getPlan(row.planId)?.name ?? row.planId,
    accessEnd: active ? active.endsAt.toLocaleDateString("cs-CZ", { timeZone: "Europe/Prague" }) : null,
    group: { name: row.group.name, instructorName: row.group.instructor.name, joinCode: row.group.joinCode, isMember: !!membership },
  };
}

// --- Návrat po registraci (připojení ke skupině, uplatnění kódu) ---

/** Přečte a smaže cookie s cílem po registraci (volá se z akce register). */
export async function consumeAfterRegisterPath() {
  const jar = await cookies();
  const value = jar.get(AFTER_REGISTER_COOKIE)?.value;
  if (!value) return null;
  jar.delete(AFTER_REGISTER_COOKIE);
  return allowedAfterRegisterPath(value);
}
