"use client";

import { useFormStatus } from "react-dom";

/** Odesílací tlačítko s potvrzením (odebrání studenta, odchod ze skupiny, nový odkaz). */
export function ConfirmSubmit({
  children,
  confirm,
  className = "btn-secondary",
  pendingLabel = "Moment…",
}: {
  children: React.ReactNode;
  confirm: string;
  className?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(confirm)) e.preventDefault();
      }}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

/** Odesílací tlačítko se stavem odesílání (bez potvrzení). */
export function SubmitButton({ children, className = "btn-primary", pendingLabel = "Moment…" }: { children: React.ReactNode; className?: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}
