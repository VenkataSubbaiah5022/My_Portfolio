import type { Metadata } from "next";
import { cookies } from "next/headers";
import { factsRegistry } from "@/lib/resume/facts";
import { STUDIO_SESSION_COOKIE, verifySessionToken } from "@/lib/studio/session";
import { lockStudio } from "./actions";
import { UnlockForm } from "./UnlockForm";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  const token = (await cookies()).get(STUDIO_SESSION_COOKIE)?.value;
  const unlocked = await verifySessionToken(token);

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-4 py-16">
      {unlocked ? (
        <section className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-lg font-semibold">Resume studio</h1>
            <form action={lockStudio}>
              <button
                type="submit"
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition hover:border-primary/50"
              >
                Lock
              </button>
            </form>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Unlocked. {factsRegistry.length} portfolio facts are ready. The resume builder
            arrives in Phase 3.
          </p>
        </section>
      ) : (
        <UnlockForm />
      )}
    </main>
  );
}
