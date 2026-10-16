"use server";

import { Resend } from "resend";
import { z } from "zod";
import { profile } from "@/content/profile";
import type { ContactState } from "@/lib/contact";

const MAX_MESSAGE = 4000;

/**
 * The honeypot is a text field a sighted visitor never sees and therefore never
 * fills. A submission that carries it is a bot, and gets the same answer a
 * human gets so the trap is not revealed.
 */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Decime cómo te llamás.")
    .max(80, "Máximo 80 caracteres."),
  email: z
    .email("Ese correo no parece válido.")
    .max(200, "Máximo 200 caracteres."),
  message: z
    .string()
    .trim()
    .min(10, "Contame un poco más, al menos 10 caracteres.")
    .max(MAX_MESSAGE, `Máximo ${MAX_MESSAGE} caracteres.`),
  company: z.string().max(0).optional(),
});

/** Digits-only wa.me format is a content concern; this is the mail one. */
function recipient() {
  return process.env.CONTACT_TO_EMAIL ?? profile.email;
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "email" || field === "message") {
        // Keep the first message per field: repeating a field is noise.
        fieldErrors[field] ??= issue.message;
      }
    }

    // A filled honeypot fails validation on `company`, which is not a field a
    // human can see. Answer as if it worked.
    if (
      fieldErrors.name === undefined &&
      fieldErrors.email === undefined &&
      fieldErrors.message === undefined
    ) {
      return { status: "success", message: "Listo, te llegó el mensaje." };
    }

    return {
      status: "error",
      message: "Revisá los campos marcados.",
      fieldErrors,
    };
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; nothing was sent.");
    return {
      status: "error",
      message:
        "El envío no está configurado todavía. Probá por WhatsApp o correo.",
    };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    // Resend requires a verified domain here. `onboarding@resend.dev` is its
    // test sender and only delivers to the account owner's own address.
    from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
    to: recipient(),
    // Reply goes straight back to the visitor, and the address is already
    // validated by the schema above.
    replyTo: email,
    // Deliberately fixed: no visitor input reaches a mail header, so there is
    // no header-injection surface to defend.
    subject: "Mensaje desde el portfolio",
    // Plain text, not HTML, so a message cannot inject markup either.
    text: [
      `De: ${name} <${email}>`,
      "",
      message,
      "",
      "---",
      `Enviado desde el formulario de ${profile.name}`,
    ].join("\n"),
  });

  if (error) {
    // Log the provider detail for the operator, return something calm to the
    // visitor. Provider errors can name configuration, which is not theirs.
    console.error("[contact] Resend rejected the message:", error);
    return {
      status: "error",
      message: "No se pudo enviar. Probá de nuevo en un rato.",
    };
  }

  return {
    status: "success",
    message: "Listo, me llegó. Te contesto a la brevedad.",
  };
}
