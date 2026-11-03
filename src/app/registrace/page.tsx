import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Registrace", robots: { index: false, follow: true } };

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/prehled");
  return <AuthForm mode="register" />;
}
