/**
 * Shared shape of the contact form state.
 *
 * This lives outside the action module on purpose: a `"use server"` file may
 * only export async functions, so exporting the initial state object from there
 * makes every call to the action fail at runtime with
 * "A \"use server\" file can only export async functions, found object."
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
