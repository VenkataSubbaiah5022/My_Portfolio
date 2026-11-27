import type { Metadata } from "next";
import { cookies } from "next/headers";
import { factsRegistry } from "@/lib/resume/facts";
import { STUDIO_SESSION_COOKIE, verifySessionToken } from "@/lib/studio/session";
import { lockStudio } from "./actions";
import { ResumeStudio } from "./ResumeStudio";
import { UnlockForm } from "./UnlockForm";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  const token = (await cookies()).get(STUDIO_SESSION_COOKIE)?.value;
  const unlocked = await verifySessionToken(token);

  if (!unlocked) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-4 py-16">
        <UnlockForm />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold">Resume studio</h1>
          <p className="text-xs text-muted-foreground">
            Built only from {factsRegistry.length} portfolio facts. Nothing leaves this browser.
          </p>
        </div>
        <form action={lockStudio}>
          <button
            type="submit"
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition hover:border-primary/50"
          >
            Lock
          </button>
        </form>
      </div>
      <ResumeStudio />
    </main>
  );
}
