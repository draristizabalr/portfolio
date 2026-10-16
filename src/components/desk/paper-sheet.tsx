"use client";

import { Check, TriangleAlert } from "lucide-react";
import { useActionState, useId } from "react";
import { sendContactMessage } from "@/app/actions/contact";
import { mailtoHref, profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { type ContactState, initialContactState } from "@/lib/contact";

const fieldShell =
  "min-h-11 w-full border-kraft-deep/50 border-b bg-transparent pb-1 font-hand text-xl text-ink outline-none transition-colors duration-200 ease-paper placeholder:text-ink-faint/60 focus:border-rust";

const labelShell = "text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft";

/**
 * The sheet of paper on the desk. A real form, not a mailto link: it posts to a
 * Server Action so the message is validated and delivered server-side, and the
 * visitor never has to have a mail client configured.
 */
export function PaperSheet() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendContactMessage,
    initialContactState,
  );

  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    message: `${uid}-message`,
  };

  return (
    /* The grid span lives on the caller's wrapper, not here: this section is
       not itself a grid child, so a span declared on it would be ignored. */
    <section aria-labelledby={`${uid}-heading`} className="relative">
      <div className="relative mx-auto max-w-2xl -rotate-[0.35deg] rounded-[3px] bg-paper px-5 pt-8 pb-7 lift sm:px-9 sm:pt-10 sm:pb-9">
        <div
          aria-hidden="true"
          className="grain-layer absolute inset-0 rounded-[3px]"
        />

        {/* A pencil resting along the top edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-5 right-6 h-3 w-24 rotate-[34deg] sm:right-10 sm:w-28"
        >
          <span className="absolute inset-y-0 -left-2 w-2 rounded-l-[2px] bg-rust" />
          <span className="absolute inset-0 bg-[#d9a441]" />
          <span className="absolute inset-y-0 -right-3 w-3 bg-[#e8cfa0] [clip-path:polygon(0_0,100%_50%,0_100%)]" />
        </span>

        <h2
          id={`${uid}-heading`}
          className="relative font-hand text-3xl text-ink-soft sm:text-4xl"
        >
          escribime
        </h2>
        <p className="relative mt-1 text-sm text-ink-soft">
          Contame en qué estás pensando y te contesto.
        </p>

        <form action={formAction} className="relative mt-6 flex flex-col gap-5">
          {/* Honeypot. Off-screen rather than display:none, because a hidden
              field is still submitted and some bots check for visibility. */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor={`${uid}-company`}>No completar</label>
            <input
              id={`${uid}-company`}
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Field
            id={ids.name}
            name="name"
            label="Nombre"
            placeholder="Cómo te llamás"
            autoComplete="name"
            maxLength={80}
            error={state.fieldErrors?.name}
          />
          <Field
            id={ids.email}
            name="email"
            type="email"
            label="Correo"
            placeholder="donde te contesto"
            autoComplete="email"
            maxLength={200}
            error={state.fieldErrors?.email}
          />
          <Field
            id={ids.message}
            name="message"
            label="Mensaje"
            placeholder="Escribí acá, como si fuera una hoja"
            multiline
            maxLength={4000}
            error={state.fieldErrors?.message}
          />

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex min-h-11 items-center gap-2 rounded-[2px] bg-ink px-5 font-display text-base text-paper transition-colors duration-200 ease-paper hover:bg-rust focus-visible:bg-rust disabled:opacity-60"
            >
              {pending ? "Mandando…" : "Mandar"}
            </button>

            <a
              href={mailtoHref(profile)}
              className="min-h-11 content-center font-hand text-xl text-ink-soft underline decoration-kraft-deep decoration-dotted underline-offset-4 transition-colors duration-200 ease-paper hover:text-rust"
            >
              o escribime a {profile.email}
            </a>
          </div>

          {/* Announced, not just displayed: a screen reader user gets the
              result without hunting for it. */}
          <p
            aria-live="polite"
            className={cn(
              "flex items-center gap-2 text-sm",
              state.status === "success" && "text-olive",
              state.status === "error" && "text-rust",
            )}
          >
            {state.status === "success" ? (
              <Check aria-hidden="true" className="size-4 shrink-0" />
            ) : null}
            {state.status === "error" ? (
              <TriangleAlert aria-hidden="true" className="size-4 shrink-0" />
            ) : null}
            {state.message}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  error,
  type = "text",
  multiline = false,
  maxLength,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  type?: string;
  multiline?: boolean;
  maxLength?: number;
  autoComplete?: string;
}) {
  // One error node per field: a shared id would be duplicated in the DOM as
  // soon as two fields failed at once.
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;
  const invalid = error ? true : undefined;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={labelShell}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          maxLength={maxLength}
          placeholder={placeholder}
          required
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={cn(fieldShell, "resize-y leading-7")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={fieldShell}
        />
      )}
      {error ? (
        <p id={errorId} className="text-xs text-rust">
          {error}
        </p>
      ) : null}
    </div>
  );
}
