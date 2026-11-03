import "server-only";
import { cookies } from "next/headers";
import { db } from "./db";
import { appUrl } from "./billing";
import { REFERRAL_CODE_LENGTH, normalizeCode, randomCode } from "./codes";
import { REFERRAL, attributionRejection, isPlausibleReferralCode, referralStats } from "./referral";

/** Vrátí kód doporučení uživatele; při prvním použití ho vygeneruje. */
export async function ensureReferralCode(userId: string) {
  const user = await db.user.findUniqueOrThrow({ where: { id: userId }, select: { referralCode: true } });
  if (user.referralCode) return user.referralCode;
  for (let i = 0; i < 5; i++) {
    const code = randomCode(REFERRAL_CODE_LENGTH);
    try {
      // Podmínka referralCode: null – při souběhu dvou vykreslení vyhraje první zápis.
      const res = await db.user.updateMany({ where: { id: userId, referralCode: null }, data: { referralCode: code } });
      if (res.count === 1) return code;
      const again = await db.user.findUniqueOrThrow({ where: { id: userId }, select: { referralCode: true } });
      if (again.referralCode) return again.referralCode;
    } catch {
      // kolize unikátního kódu s jiným uživatelem – zkusíme jiný
    }
  }
  throw new Error("Nepodařilo se vygenerovat kód doporučení");
}

export const referralLink = (code: string) => `${appUrl()}/r/${code}`;

export async function findReferrerByCode(raw: string) {
  const code = normalizeCode(raw);
  if (!isPlausibleReferralCode(code)) return null;
  return db.user.findUnique({ where: { referralCode: code }, select: { id: true, name: true, email: true } });
}

/** Přehled pro kartu "Doporučte Zbroják" na stránce účtu. */
export async function getReferralOverview(userId: string) {
  const code = await ensureReferralCode(userId);
  const rows = await db.referral.findMany({ where: { referrerId: userId }, select: { status: true, rewardMonth: true } });
  return { code, link: referralLink(code), ...referralStats(rows) };
}

/** Kdo uživatele pozval (pro uvítací stránku z cookie). */
export async function pendingInviter() {
  const code = (await cookies()).get(REFERRAL.cookieName)?.value;
  if (!code) return null;
  const referrer = await findReferrerByCode(code);
  return referrer ? { name: referrer.name.split(" ")[0] } : null;
}

/**
 * Volá se hned po vytvoření účtu: přečte cookie z odkazu /r/<kód>,
 * ověří, že nejde o doporučení sebe sama, a založí čekající doporučení.
 * Chyby registraci nikdy neshodí.
 */
export async function attachReferralFromCookie(user: { id: string; email: string }) {
  try {
    const jar = await cookies();
    const code = jar.get(REFERRAL.cookieName)?.value;
    if (!code) return null;
    jar.delete(REFERRAL.cookieName);
    const referrer = await findReferrerByCode(code);
    if (!referrer) return null;
    const rejection = attributionRejection({
      referrerId: referrer.id,
      referredId: user.id,
      referrerEmail: referrer.email,
      referredEmail: user.email,
    });
    if (rejection) return null;
    return await db.referral.create({ data: { referrerId: referrer.id, referredId: user.id } });
  } catch (e) {
    console.error("Uložení doporučení selhalo", e);
    return null;
  }
}
