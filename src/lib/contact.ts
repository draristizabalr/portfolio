import { z } from "zod";

/**
 * The contact form's domain logic, deliberately free of Next.js and Resend.
 *
 * It lives here rather than inside the Server Action because a `"use server"`
 * module may only export async functions, which makes its internals impossible
 * to unit test. Everything below is pure: given form data, it says what should
 * happen. The action does the sending.
 */

export type ContactField = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Sentence shown on the sheet, announced through an aria-live region. */
  message: string;
  /** Per-field messages, keyed by input name. */
  fieldErrors?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};

export const MAX_NAME = 80;
export const MAX_EMAIL = 200;
export const MAX_MESSAGE = 4000;

/**
 * `company` is the honeypot: a field a sighted visitor never sees and therefore
 * never fills. It accepts an empty string and rejects anything else, so a bot
 * that fills every input it finds fails validation on it.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Decime cómo te llamás.")
    .max(MAX_NAME, `Máximo ${MAX_NAME} caracteres.`),
  email: z
    .email("Ese correo no parece válido.")
    .max(MAX_EMAIL, `Máximo ${MAX_EMAIL} caracteres.`),
  message: z
    .string()
    .trim()
    .min(10, "Contame un poco más, al menos 10 caracteres.")
    .max(MAX_MESSAGE, `Máximo ${MAX_MESSAGE} caracteres.`),
  company: z.string().max(0).optional(),
});

export type ContactSubmission = {
  name: string;
  email: string;
  message: string;
};

export type ParseContactResult =
  | { kind: "valid"; submission: ContactSubmission }
  /** Something the visitor can fix, so it is shown back on the sheet. */
  | { kind: "invalid"; state: ContactState }
  /** A bot. Answered as if it worked, so the trap is never revealed. */
  | { kind: "honeypot" };

const FIELDS: ContactField[] = ["name", "email", "message"];

function isContactField(value: unknown): value is ContactField {
  return typeof value === "string" && (FIELDS as string[]).includes(value);
}

/**
 * Reads the raw form data once and decides the outcome. The honeypot is checked
 * before the schema so a bot that fills it gets the success answer even when the
 * rest of its submission happens to be valid.
 */
export function parseContactSubmission(formData: FormData): ParseContactResult {
  const company = formData.get("company");
  if (typeof company === "string" && company.length > 0) {
    return { kind: "honeypot" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: company ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (isContactField(field)) {
        // Keep the first message per field: repeating a field is noise.
        fieldErrors[field] ??= issue.message;
      }
    }

    // A failure with no field attached is not something the visitor can act on,
    // so fall back to the honeypot answer rather than showing an empty form.
    if (Object.keys(fieldErrors).length === 0) {
      return { kind: "honeypot" };
    }

    return {
      kind: "invalid",
      state: {
        status: "error",
        message: "Revisá los campos marcados.",
        fieldErrors,
      },
    };
  }

  const { name, email, message } = parsed.data;
  return { kind: "valid", submission: { name, email, message } };
}
