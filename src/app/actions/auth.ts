"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";

export type FormState = { error?: string } | undefined;

const registerSchema = z.object({
  name: z.string().trim().min(2, "Zadejte jméno (alespoň 2 znaky)").max(60),
  email: z.string().trim().toLowerCase().email("Neplatný e-mail"),
  password: z.string().min(8, "Heslo musí mít alespoň 8 znaků").max(200),
  terms: z.literal("on", { message: "Je potřeba souhlasit s podmínkami" }),
});

export async function register(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { name, email, password } = parsed.data;
  if (await db.user.findUnique({ where: { email } })) {
    return { error: "Účet s tímto e-mailem už existuje" };
  }
  const user = await db.user.create({
    data: { name, email, passwordHash: await bcrypt.hash(password, 12) },
  });
  await createSession(user.id);
  redirect("/prehled?vitej=1");
}

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Neplatný e-mail"),
  password: z.string().min(1, "Zadejte heslo"),
});

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return { error: "Nesprávný e-mail nebo heslo" };
  }
  await createSession(user.id);
  const next = String(formData.get("next") ?? "");
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/prehled");
}

export async function logout() {
  await destroySession();
  redirect("/");
}
