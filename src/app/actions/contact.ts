"use server";

import { Resend } from "resend";
import { profile } from "@/content/profile";
import { type ContactState, parseContactSubmission } from "@/lib/contact";

/** Digits-only wa.me format is a content concern; this is the mail one. */
function recipient() {
  return process.env.CONTACT_TO_EMAIL ?? profile.email;
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const result = parseContactSubmission(formData);

  if (result.kind === "honeypot") {
    // Same answer a human gets, so the trap is never revealed.
    return { status: "success", message: "Listo, te llegó el mensaje." };
  }

  if (result.kind === "invalid") {
    return result.state;
  }

  const { name, email, message } = result.submission;

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
    // validated by the schema.
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
