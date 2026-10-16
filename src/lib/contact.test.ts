import { describe, expect, it } from "vitest";
import {
  MAX_EMAIL,
  MAX_MESSAGE,
  MAX_NAME,
  parseContactSubmission,
} from "./contact";

type Fields = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

/** A submission that passes every rule, so each test can vary exactly one thing. */
function form(overrides: Fields = {}) {
  const fields: Fields = {
    name: "Ana Pérez",
    email: "ana@example.com",
    message: "Un mensaje lo bastante largo.",
    company: "",
    ...overrides,
  };

  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      data.set(key, value);
    }
  }
  return data;
}

describe("parseContactSubmission", () => {
  it("accepts a well-formed submission", () => {
    const result = parseContactSubmission(form());

    expect(result.kind).toBe("valid");
    if (result.kind !== "valid") return;
    expect(result.submission).toEqual({
      name: "Ana Pérez",
      email: "ana@example.com",
      message: "Un mensaje lo bastante largo.",
    });
  });

  it("trims the name and the message before they are sent", () => {
    const result = parseContactSubmission(
      form({ name: "  Ana  ", message: "  Un mensaje lo bastante largo.  " }),
    );

    expect(result.kind).toBe("valid");
    if (result.kind !== "valid") return;
    expect(result.submission.name).toBe("Ana");
    expect(result.submission.message).toBe("Un mensaje lo bastante largo.");
  });

  describe("name", () => {
    it("rejects an empty name", () => {
      const result = parseContactSubmission(form({ name: "" }));

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(result.state.fieldErrors?.name).toBe("Decime cómo te llamás.");
    });

    // The browser's own `required` attribute treats spaces as a value, so this
    // is the case that proves the check is real rather than a duplicate of the
    // native one.
    it("rejects a name that is only whitespace", () => {
      const result = parseContactSubmission(form({ name: "     " }));

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(result.state.fieldErrors?.name).toBe("Decime cómo te llamás.");
    });

    it(`accepts a name of exactly ${MAX_NAME} characters`, () => {
      const result = parseContactSubmission(
        form({ name: "a".repeat(MAX_NAME) }),
      );

      expect(result.kind).toBe("valid");
    });

    it(`rejects a name of ${MAX_NAME + 1} characters`, () => {
      const result = parseContactSubmission(
        form({ name: "a".repeat(MAX_NAME + 1) }),
      );

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(result.state.fieldErrors?.name).toBe(
        `Máximo ${MAX_NAME} caracteres.`,
      );
    });
  });

  describe("email", () => {
    it.each([
      ["missing the @", "anaexample.com"],
      ["missing the domain", "ana@"],
      ["missing the local part", "@example.com"],
      ["containing a space", "an a@example.com"],
      ["empty", ""],
    ])("rejects an address %s", (_label, email) => {
      const result = parseContactSubmission(form({ email }));

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(result.state.fieldErrors?.email).toBe(
        "Ese correo no parece válido.",
      );
    });

    it(`rejects an address longer than ${MAX_EMAIL} characters`, () => {
      const email = `${"a".repeat(MAX_EMAIL)}@example.com`;
      const result = parseContactSubmission(form({ email }));

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(result.state.fieldErrors?.email).toBe(
        `Máximo ${MAX_EMAIL} caracteres.`,
      );
    });
  });

  describe("message", () => {
    it("accepts a message of exactly 10 characters", () => {
      const result = parseContactSubmission(form({ message: "0123456789" }));

      expect(result.kind).toBe("valid");
    });

    it("rejects a message of 9 characters", () => {
      const result = parseContactSubmission(form({ message: "012345678" }));

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(result.state.fieldErrors?.message).toBe(
        "Contame un poco más, al menos 10 caracteres.",
      );
    });

    it(`accepts a message of exactly ${MAX_MESSAGE} characters`, () => {
      const result = parseContactSubmission(
        form({ message: "a".repeat(MAX_MESSAGE) }),
      );

      expect(result.kind).toBe("valid");
    });

    it(`rejects a message of ${MAX_MESSAGE + 1} characters`, () => {
      const result = parseContactSubmission(
        form({ message: "a".repeat(MAX_MESSAGE + 1) }),
      );

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(result.state.fieldErrors?.message).toBe(
        `Máximo ${MAX_MESSAGE} caracteres.`,
      );
    });
  });

  describe("honeypot", () => {
    it("silently rejects a submission that fills the hidden field", () => {
      const result = parseContactSubmission(form({ company: "spam" }));

      expect(result.kind).toBe("honeypot");
    });

    // The trap must win over everything else: a bot that fills the honeypot and
    // also gets the rest right still must not reach the send path.
    it("wins even when every other field is valid", () => {
      const result = parseContactSubmission(form({ company: "x" }));

      expect(result.kind).not.toBe("valid");
      expect(result.kind).toBe("honeypot");
    });
  });

  describe("error reporting", () => {
    it("reports every invalid field at once, not just the first", () => {
      const result = parseContactSubmission(
        form({ name: "", email: "nope", message: "corto" }),
      );

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(Object.keys(result.state.fieldErrors ?? {}).sort()).toEqual([
        "email",
        "message",
        "name",
      ]);
      expect(result.state.status).toBe("error");
    });

    it("keeps only the first message per field", () => {
      // An over-long name fails the max check; the min check must not overwrite
      // whatever is already recorded for that field.
      const result = parseContactSubmission(
        form({ name: "a".repeat(MAX_NAME + 1) }),
      );

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(result.state.fieldErrors?.name).toBe(
        `Máximo ${MAX_NAME} caracteres.`,
      );
    });

    it("treats a submission that fills only the hidden field as a bot", () => {
      const data = new FormData();
      data.set("company", "spam");

      expect(parseContactSubmission(data).kind).toBe("honeypot");
    });

    // An empty body is not a bot signal by itself — a bot fills the honeypot.
    // Naming the missing fields is what helps a human whose client posted
    // nothing, and it tells a bot nothing it did not already know.
    it("reports every field when the form arrives with no fields at all", () => {
      const result = parseContactSubmission(new FormData());

      expect(result.kind).toBe("invalid");
      if (result.kind !== "invalid") return;
      expect(Object.keys(result.state.fieldErrors ?? {}).sort()).toEqual([
        "email",
        "message",
        "name",
      ]);
    });
  });
});
