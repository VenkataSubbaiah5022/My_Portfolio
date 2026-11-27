"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { unlockStudio, type UnlockState } from "./actions";

const initialState: UnlockState = { error: null };

export function UnlockForm() {
  const [state, action, pending] = useActionState(unlockStudio, initialState);

  return (
    <form
      action={action}
      className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-foreground">
        <LockKeyhole className="h-4 w-4 text-primary" aria-hidden />
        Private studio
      </div>
      <label htmlFor="studio-key" className="mb-1.5 block text-xs text-muted-foreground">
        Access key
      </label>
      <input
        id="studio-key"
        name="key"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
      {state.error ? (
        <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition disabled:opacity-60"
      >
        {pending ? "Checking…" : "Unlock"}
      </button>
    </form>
  );
}
