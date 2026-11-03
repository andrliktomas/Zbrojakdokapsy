"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { GROUP_LIMITS, groupNameError, normalizeGroupName } from "@/lib/groups";
import {
  clientIpHash,
  findGroupByJoinCode,
  generateUniqueJoinCode,
  getInstructorGroup,
  recordAttempt,
  redeemActivationCode,
  retryAfterSeconds,
  retryMessage,
  type RedeemResult,
} from "@/lib/groups.server";

export type GroupFormState = { error?: string } | undefined;

// --- Instruktor ---

export async function createGroup(_: GroupFormState, formData: FormData): Promise<GroupFormState> {
  const user = await requireUser();
  const name = normalizeGroupName(String(formData.get("name") ?? ""));
  const error = groupNameError(name);
  if (error) return { error };
  const count = await db.group.count({ where: { instructorId: user.id } });
  if (count >= GROUP_LIMITS.groupsPerInstructor) {
    return { error: `Můžete mít nejvýš ${GROUP_LIMITS.groupsPerInstructor} skupin. Pro více nás prosím kontaktujte.` };
  }
  const group = await db.group.create({ data: { name, instructorId: user.id, joinCode: await generateUniqueJoinCode() } });
  redirect(`/skupiny/${group.id}?nova=1`);
}

const idSchema = z.string().min(1).max(64);

/** Nový odkaz pro připojení – starý přestane platit (např. když unikl mimo kurz). */
export async function regenerateJoinCode(formData: FormData) {
  const user = await requireUser();
  const group = await getInstructorGroup(idSchema.parse(formData.get("groupId")), user.id);
  if (!group) notFound();
  await db.group.update({ where: { id: group.id }, data: { joinCode: await generateUniqueJoinCode() } });
  revalidatePath(`/skupiny/${group.id}`);
  redirect(`/skupiny/${group.id}?novyOdkaz=1`);
}

export async function removeMember(formData: FormData) {
  const user = await requireUser();
  const group = await getInstructorGroup(idSchema.parse(formData.get("groupId")), user.id);
  if (!group) notFound();
  const memberId = idSchema.parse(formData.get("userId"));
  await db.groupMember.deleteMany({ where: { groupId: group.id, userId: memberId } });
  revalidatePath(`/skupiny/${group.id}`);
  redirect(`/skupiny/${group.id}?odebran=1`);
}

// --- Student ---

export type JoinFormState = { error?: string } | undefined;

export async function joinGroup(_: JoinFormState, formData: FormData): Promise<JoinFormState> {
  const user = await requireUser();
  const ipHash = await clientIpHash();
  const wait = await retryAfterSeconds(user.id, ipHash, "join");
  if (wait > 0) return { error: retryMessage(wait) };

  const group = await findGroupByJoinCode(String(formData.get("code") ?? ""));
  if (!group) {
    await recordAttempt(user.id, ipHash, "join", false);
    return { error: "Odkaz na skupinu je neplatný. Požádejte instruktora o aktuální odkaz." };
  }
  if (formData.get("consent") !== "on") {
    return { error: "Pro připojení je potřeba souhlasit se sdílením pokroku s instruktorem." };
  }
  if (group.instructorId === user.id) return { error: "Toto je vaše skupina – jako instruktor jejím členem být nemusíte." };
  if (group._count.members >= GROUP_LIMITS.membersPerGroup) {
    return { error: "Skupina je plná. Obraťte se prosím na instruktora." };
  }
  const now = new Date();
  await db.groupMember.upsert({
    where: { groupId_userId: { groupId: group.id, userId: user.id } },
    create: { groupId: group.id, userId: user.id, consentAt: now },
    update: {},
  });
  await recordAttempt(user.id, ipHash, "join", true);
  revalidatePath("/skupina");
  redirect(`/skupina?pripojeno=${group.id}`);
}

export async function leaveGroup(formData: FormData) {
  const user = await requireUser();
  const groupId = idSchema.parse(formData.get("groupId"));
  // Smazáním členství instruktor okamžitě ztrácí přístup k pokroku studenta.
  await db.groupMember.deleteMany({ where: { groupId, userId: user.id } });
  revalidatePath("/skupina");
  redirect("/skupina?odchod=1");
}

export type RedeemState = RedeemResult | undefined;

export async function redeemCode(_: RedeemState, formData: FormData): Promise<RedeemState> {
  const user = await requireUser();
  const raw = String(formData.get("code") ?? "").slice(0, 64);
  if (!raw.trim()) return { ok: false, error: "Zadejte aktivační kód." };
  const result = await redeemActivationCode(user.id, raw);
  if (result.ok) revalidatePath("/", "layout");
  return result;
}
