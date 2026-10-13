import "server-only";
import { redirect } from "next/navigation";
import { db } from "./db";
import { requireUser } from "./auth";

export async function getActivePurchase(userId: string) {
  return db.purchase.findFirst({
    where: { userId, endsAt: { gt: new Date() } },
    orderBy: { endsAt: "desc" },
  });
}

/** Konec předplatného – bere nejzazší konec ze všech balíčků (navazujících). */
export async function getAccessEnd(userId: string) {
  return (await getActivePurchase(userId))?.endsAt ?? null;
}

export async function hasAccess(userId: string) {
  return (await getAccessEnd(userId)) !== null;
}

/** Pro stránky dostupné jen s aktivním balíčkem (s výjimkou volných okruhů). */
export async function requirePaidUser() {
  const user = await requireUser();
  if (!(await hasAccess(user.id))) redirect("/cenik?expired=1");
  return user;
}
