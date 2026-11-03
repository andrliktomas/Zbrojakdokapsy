import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Přihlášení", robots: { index: false, follow: true } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (await getCurrentUser()) redirect("/prehled");
  const { next } = await searchParams;
  return <AuthForm mode="login" next={next} />;
}
