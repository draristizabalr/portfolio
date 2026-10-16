/**
 * Content for the four folders on the desk.
 *
 * Every entry below is a PLACEHOLDER shaped like the real thing: replace the
 * strings, keep the shape, and the desk renders it without any other change.
 */

export type FolderTone = "kraft" | "manila" | "olive" | "paper";

export type FolderMeta = {
  /** URL segment. Also the key the desk and the window share for the morph. */
  slug: string;
  /** Written on the folder tab, in the handwriting font. */
  tab: string;
  /** Heading inside the opened window. */
  title: string;
  /** One line describing what is inside, shown on the folder itself. */
  summary: string;
  tone: FolderTone;
};

export const folders: FolderMeta[] = [
  {
    slug: "personal",
    tab: "personal",
    title: "Personal",
    summary: "Quién soy fuera del código",
    tone: "kraft",
  },
  {
    slug: "profesional",
    tab: "profesional",
    title: "Perfil profesional",
    summary: "Con qué trabajo y cómo pienso",
    tone: "manila",
  },
  {
    slug: "experiencia",
    tab: "experiencia laboral",
    title: "Experiencia laboral",
    summary: "Dónde trabajé y qué hice",
    tone: "olive",
  },
  {
    slug: "proyectos",
    tab: "proyectos personales",
    title: "Proyectos personales",
    summary: "Lo que construyo por mi cuenta",
    tone: "paper",
  },
];

/**
 * Throws rather than returning undefined: every caller is a statically
 * prerendered route that knows its own slug, so a miss is a programming error
 * and should fail the build instead of rendering an empty window.
 */
export function folderBySlug(slug: string): FolderMeta {
  const folder = folders.find((candidate) => candidate.slug === slug);
  if (!folder) {
    throw new Error(`No folder is defined for slug "${slug}".`);
  }
  return folder;
}

/* -------------------------------------------------------------------------- */

export const personal = {
  intro: [
    "PLACEHOLDER Párrafo de presentación. Contá en dos o tres líneas quién sos, de dónde venís y qué te gusta hacer.",
    "PLACEHOLDER Segundo párrafo. Acá podés hablar de intereses, de cómo llegaste a la programación o de qué te mueve.",
  ],
  facts: [
    { label: "Base", value: "PLACEHOLDER Ciudad, País" },
    { label: "Idiomas", value: "PLACEHOLDER Español, Inglés" },
    { label: "Fuera del trabajo", value: "PLACEHOLDER Un hobby, otro hobby" },
  ],
};

export type SkillGroup = {
  area: string;
  items: string[];
};

export const profesional = {
  pitch:
    "PLACEHOLDER Una línea sobre cómo trabajás: qué tipo de problemas te gustan y cómo los encarás.",
  groups: [
    { area: "Frontend", items: ["PLACEHOLDER", "PLACEHOLDER", "PLACEHOLDER"] },
    { area: "Backend", items: ["PLACEHOLDER", "PLACEHOLDER"] },
    {
      area: "Herramientas",
      items: ["PLACEHOLDER", "PLACEHOLDER", "PLACEHOLDER"],
    },
  ] satisfies SkillGroup[],
};

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experiencia: ExperienceEntry[] = [
  {
    role: "PLACEHOLDER Rol",
    company: "PLACEHOLDER Empresa",
    period: "PLACEHOLDER 2023 — presente",
    summary: "PLACEHOLDER Qué hacía ahí, en una línea.",
    highlights: [
      "PLACEHOLDER Un logro concreto, con número si se puede.",
      "PLACEHOLDER Otro logro.",
    ],
  },
  {
    role: "PLACEHOLDER Rol anterior",
    company: "PLACEHOLDER Empresa anterior",
    period: "PLACEHOLDER 2021 — 2023",
    summary: "PLACEHOLDER Qué hacía ahí, en una línea.",
    highlights: ["PLACEHOLDER Un logro concreto."],
  },
];

export type ProjectEntry = {
  name: string;
  year: string;
  summary: string;
  stack: string[];
  href?: string;
};

export const proyectos: ProjectEntry[] = [
  {
    name: "PLACEHOLDER Proyecto",
    year: "PLACEHOLDER 2025",
    summary: "PLACEHOLDER Qué es, para quién y por qué lo hiciste.",
    stack: ["PLACEHOLDER", "PLACEHOLDER"],
  },
  {
    name: "PLACEHOLDER Otro proyecto",
    year: "PLACEHOLDER 2024",
    summary: "PLACEHOLDER Qué resuelve.",
    stack: ["PLACEHOLDER", "PLACEHOLDER", "PLACEHOLDER"],
  },
];
