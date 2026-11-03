"use client";

import { useActionState } from "react";
import { createGroup, type GroupFormState } from "@/app/actions/groups";
import { GROUP_LIMITS } from "@/lib/groups";

export function CreateGroupForm() {
  const [state, action, pending] = useActionState<GroupFormState, FormData>(createGroup, undefined);
  return (
    <form action={action} className="space-y-3" aria-labelledby="create-group-title">
      <h2 id="create-group-title" className="text-lg font-bold">Založit skupinu</h2>
      <div>
        <label className="label" htmlFor="group-name">Název skupiny</label>
        <input
          className="input"
          id="group-name"
          name="name"
          required
          minLength={GROUP_LIMITS.nameMin}
          maxLength={GROUP_LIMITS.nameMax}
          placeholder="Kurz Střelnice Brno – listopad"
          aria-describedby="group-name-hint"
          aria-invalid={state?.error ? true : undefined}
        />
        <p id="group-name-hint" className="mt-1 text-xs text-stone-500">Název uvidí studenti při připojení. Stačí kurz a termín.</p>
      </div>
      {state?.error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <button className="btn-primary w-full" disabled={pending}>{pending ? "Zakládám…" : "Založit skupinu"}</button>
    </form>
  );
}
