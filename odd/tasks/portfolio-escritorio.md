# Portfolio — Desktop Workstation Metaphor

Feature: personal portfolio built as an interactive office desk. Each desk object
carries a piece of the profile. Stack: Next.js 16 (App Router) + Tailwind v4 +
React 19.3 View Transitions. Deploy target: Vercel Hobby, default branch `main`.

## Specs

S1. Folders carry the profile sections. Verbatim:
   "Habrían carpetas que tenga información: personal, profesional, experiencia
   laboral y proyectos personales."

S2. Email writing happens on a sheet of paper. Verbatim:
   "Escribir un correo, a mi correo electrónico. (podría ser una hoja con un
   lapiz, con el form y los inputs dentro de la hoja para escribir el correo)"

S3. Social links live on a wall board / agenda. Verbatim:
   "Hipervinculos para ingresar a mis redes sociales: LinkedIn, Github, entre
   otros ...(esto sería bueno agregarlo a un "tablero" de pared o una agenda
   donde estén todas las opciones de hipervinculos)"

S4. WhatsApp via a desk telephone. Verbatim:
   "Escribir a mi cuenta de whatsapp (sería un teléfono que se encuentre en el
   escritorio)."

S5. Stack and UX constraints. Verbatim:
   "El proyecto será creado en Next.js, como front-end framework, y Tailwindcss,
   como framework css, por ahora. Quiero que tenga algún tipo de animaciones y
   view transitions para la experiencia de usuario y se diseñará movil first para
   tener un manejo de responsive más adecuado"

S6. Free/open-source only, no paid subscriptions. Verbatim:
   "recordar que por ahora no se pagará ningún tip de suscripción"

S7. Deploy constraints. Verbatim:
   "se desplegará en Vercel con el plan gratuito (Hobbie) y está ligado al
   repositorio remoto con branch por defecto main"

S8. Non-aesthetic dependencies are in scope: SEO, cache/lazy for performance.
   Verbatim: "Mejoramiento de SEO de la página. Consultas con cache o lazy para
   mejor performance de todo. Routers para mejorar la experiencia"

S9. Router: App Router. Pages Router cannot express native View Transitions
   (`transitionTypes` exists only in App Router docs for Next 16.4.2).

S10. Visual technique: CSS 3D (`perspective` + `preserve-3d` + `translateZ`) plus
   `motion`. No Three.js / R3F. Rationale: ~30KB gzip vs ~600KB+ WebGL payload,
   and the desk objects stay real DOM (keyboard + screen reader work).

S11. Mobile-first: one vertical scrolling scene, one component tree. Wall board on
   top, desk below. Touch targets >= 44px. No hover-only affordances.

S12. Contact form delivery: Resend free tier via Server Action + `zod` +
   `useActionState`. API key in Vercel env vars.

S13. Structure: desk at `/`, each section at its own linkable route. Folder is a
   `<Link transitionTypes>` and the morph uses a shared `<ViewTransition name>`.

S14. Aesthetic: paper and wood. Kraft/cream/ink/olive palette, editorial serif for
   headings, cardboard folders with handwritten labels, long soft shadows.

T1. App Router migration, cacheComponents, project skeleton. (S5, S7, S8, S9)

T2. Design foundation: paper/wood tokens, fonts, grain textures, view transition
   CSS. (S14, S5)

T3. Desk scene at `/`: vertical mobile-first scene, wall + desk, parallax,
   reduced-motion fallback. (S5, S11, S14)

T4. Folders with info: personal, professional, work experience, personal
   projects. (S1)

T5. Content routes: `/sobre-mi`, `/experiencia`, `/proyectos` with typed content
   source and shared window frame. (S1, S13)

T6. Wall board with social links: LinkedIn, GitHub, others. (S3)

T7. Desk telephone for WhatsApp. (S4)

T8. Paper sheet contact form: Resend + Server Action + zod + `useActionState`.
   (S2, S12)

T9. SEO and metadata: per-route metadata, `sitemap.ts`, `robots.ts`,
   `opengraph-image.tsx`, JSON-LD. (S8)

T10. Verification: build, lint, typecheck, responsive, keyboard accessibility,
   reduced-motion, Lighthouse. (S5, S6, S8, S11)

## Log

L1 (user, verbatim): "Quiero realizar una página web, que sería mi portfolio, con
una estética de escritorio de oficina. Donde cada componente del escritorio tenga
funcionalidades o información sobre mi perfil. / Ideas visuales: 1. Habrían
carpetas que tenga información: personal, profesional, experiencia laboral y
proyectos personales. 2. Escribir un correo, a mi correo electrónico. (podría ser
una hoja con un lapiz, con el form y los inputs dentro de la hoja para escribir el
correo) 3. Hipervinculos para ingresar a mis redes sociales: LinkedIn, Github,
entre otros ...(esto sería bueno agregarlo a un "tablero" de pared o una agenda
donde estén todas las opciones de hipervinculos) 4. Escribir a mi cuenta de
whatsapp (sería un teléfono que se encuentre en el escritorio). / Infraestructura:
El proyecto será creado en Next.js, como front-end framework, y Tailwindcss, como
framework css, por ahora. Quiero que tenga algún tipo de animaciones y view
transitions para la experiencia de usuario y se diseñará movil first para tener un
manejo de responsive más adecuado. También quiero que me des opciones para tener
componentes llamativos y animaciones fluidas. Como por ejemplo: Shadcn,
Tailwind-animations, React bits (pero, esta es de pago y por ahora solo se
realizará con proyectos free/open-source), Barba.js, Three.js, Y todas las que
pienses que pueden ayudar en este momento (recordar que por ahora no se pagará
ningún tip de suscripción). / Despliegue: Como el proyecto es un proyecto de
Next.js con TypeScript se desplegará en Vercel con el plan gratuito (Hobbie) y
está ligado al repositorio remoto con branch por defecto main. / Dependencias:
Las dependecias no solo se pueden tener en cuenta en la parte estética. También se
pueden tener dependencias para la facilidad o mejoramiento del mismo proyecto. Por
ejemplo: Mejoramiento de SEO de la página. Consultas con cache o lazy para mejor
performance de todo. Routers para mejorar la experiencia (si es necesario, aun que
no creo porque el enrutador de Next.js es bastante bueno). O lo que te paresca
mejor también."

L2 (evidence, scaffold audit): project is Next 16.4.2 / React 19.3.0 / Tailwind
4.3.3 / TS 5 / Biome 2.4.2 / bun 1.4.3. Scaffold used Pages Router (`src/pages/`).
`transitionTypes` appears only under `docs/01-app/.../02-components/link.md`, never
under `docs/02-pages/`. React 19.3.0 exports `ViewTransition`. GitHub reports
`defaultBranchRef=main`; local `origin/HEAD` still points at the stale
`origin/master`.

L3 (corrections delivered to the user): Barba.js is discarded — its own FAQ says
not to layer it over a framework router, and it has SSR breakage in Next
(`DOMParser is not defined`, `Element is not defined`). React Bits is NOT paid:
reactbits.dev is MIT + Commons Clause (usable in apps, resale of the components
themselves is not); React Bits Pro is a separate optional tier. `tailwindcss-animate`
is deprecated in favour of `tw-animate-css`, which shadcn installs by default for
Tailwind v4; skip `tw-animate-css` 1.4.0 (prefix/spacing regression).

L4 (user decisions): App Router migration approved. CSS 3D + Motion approved, no
Three.js. Vertical scrolling scene approved, one layout. Resend + Server Action
approved. Routes + windows approved. Paper and wood aesthetic approved.

L5 (implementation, commit 9fc9bc8): App Router migration and the design
foundation. Build green with every route prerendered static and `biome check`
exit 0. `/` and `/_not-found` were the only routes at that point.

L6 (evidence, library traps found the hard way):
- `lucide-react` ships no brand marks at all — `Github`, `Linkedin` and
  `Instagram` are simply absent. Brand icons come from
  `@icons-pack/react-simple-icons` instead.
- Simple Icons has also dropped LinkedIn over trademark policy, so
  `SiLinkedin` does not exist in that package either. The LinkedIn mark is
  hand-written in `src/components/icons/brand-icon.tsx` from the CC0 Simple
  Icons v13 geometry, drawn to the same props contract as the packaged icons.
- `tw-animate-css` 1.4.0 does NOT break Tailwind's `--spacing` in this setup;
  verified in the built CSS (`--spacing:.25rem`, `.p-4{padding:calc(var(--spacing) * 4)}`)
  rather than assumed from the release notes.
- Piping a command into `tail` masks its exit code. One false green was already
  produced this way; every check now uses `set -o pipefail`.
- Deleting `src/pages` leaves stale route types in `.next/dev/types/validator.ts`
  that fail the typecheck until `.next` is removed.

L7 (design corrections after looking at real screenshots): the first build of the
wall board ruled each row with a repeating background gradient, which drifted out
of alignment with rows whose text wrapped, and the handles wrapped onto two lines.
Rows are now ruled individually with a bottom border and the handle uses
`min-w-0 truncate`. The desk grid was `lg:grid-cols-2` holding a single child,
which stranded the telephone off-centre on a 1440px viewport; it is now
`lg:grid-cols-3` at `lg:max-w-5xl` so the four folders plus the telephone fill it.
The telephone handset was a plain pill and is now two cups joined by a bar.

L8 (decisions recorded while implementing T9):
- `sitemap.ts` omits `lastModified`. Producing it would require `new Date()`
  during render, which Cache Components rejects as a request-time read.
- The root layout deliberately sets no `alternates.canonical`. A single canonical
  on the root layout would declare every section a duplicate of the home page;
  each section route declares its own instead.
- Motion animates through inline styles, so the CSS `prefers-reduced-motion`
  guard cannot stop it. `MotionConfig reducedMotion="user"` in the root layout
  is what actually honours the preference.

L9 (delegation): T4 and T5 (window chrome plus the four section routes) were
handed to `gentle-ai-worker` under the context backstop, with an
`## Allowed edit surfaces` block limited to the window, the backdrop, the four
routes, `src/app/page.tsx` and `src/app/globals.css`.

L10 (open, needs the user): every value in `src/content/profile.ts` and
`src/content/sections.ts` marked PLACEHOLDER must be replaced before the site is
publishable. The WhatsApp number must be digits only including the country code,
because that is the format wa.me requires.

L11 (delegation outcome): the `gentle-ai-worker` handoff for T4/T5 produced no
files and stalled at 16 turns / 28 tool calls with its last action reported as
`bash`. It was cancelled and the work was completed inline. The likely cause was
contention on `.next`: a `next dev` server was holding the directory while the
worker tried to build. Lesson for later delegations: stop the dev server before
handing a writer a task whose gate is `next build`.

L12 (bugs found by looking at the running page, not by the build):
- `"use server"` may only export async functions. Exporting
  `initialContactState` (a plain object) from the action module made every call
  fail with a 500 and `A "use server" file can only export async functions,
  found object`. The state shape and its initial value now live in
  `src/lib/contact.ts`.
- React keys were taken from content strings. The placeholder copy repeats
  `PLACEHOLDER`, so nine duplicate-key warnings fired. Static lists that never
  reorder now use positional keys, suppressed per site with the reason recorded.
- The contact action's error ids were shared across fields, which would have
  duplicated an `id` in the DOM as soon as two fields failed at once. Each field
  now owns its error id, verified through `aria-describedby`.
- `Reveal` (motion `whileInView`) server-rendered `style="opacity:0"` into the
  HTML. With JavaScript blocked, the telephone, the contact form and the wall
  content stayed permanently invisible — the main call to action of the whole
  site, unreachable. Replaced by `Settle`, a CSS-animation server component with
  no JavaScript at all. Verified with `javaScriptEnabled: false`: after the
  animation ends every one of those elements computes to `opacity 1`.
- The `Settle` wrapper is the grid child, so a `col-span-3` declared on the
  sheet inside it was ignored and the form landed in a single cell. The span now
  lives on the wrapper.
- The folder tab had a fixed `w-32`, so "experiencia laboral" wrapped onto the
  folder body. Tabs now size to their own label.

L13 (verification actually observed, not assumed):
- `bun run build` exit 0, and all nine routes prerender static: `/`,
  `/_not-found`, `/experiencia`, `/opengraph-image`, `/personal`, `/profesional`,
  `/proyectos`, `/robots.txt`, `/sitemap.xml`.
- `bunx biome check` exit 0 over 33 files; `bunx tsc --noEmit` exit 0.
- React's `ViewTransition` works from a server component in this version; no
  client wrapper was needed.
- One visible `<h1>` per route. On a section route the desk's `<h1>` is still in
  the DOM but inside an `<Activity mode="hidden">` subtree, so it computes to
  `display: none` and is out of the accessibility tree.
- Server-side validation proven through the browser: a whitespace-only name
  passes the native `required` check and is then rejected by zod, producing
  `aria-invalid`, a per-field `aria-describedby` that resolves, and the live
  message "Revisá los campos marcados.".
- No horizontal overflow at 390x844 or 1440x900; no console errors.
- Tab order is real DOM order: the three social links, the four folders, the
  telephone, then the first form input.

L14 (not verified, and must not be reported as working): the Resend send path
has never executed. There are no credentials in this environment, so the branch
that calls `resend.emails.send` is unexercised. What is proven is the validation
path and the missing-key guard, which returns a calm message rather than
throwing. The operator needs `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` on a verified
domain, and optionally `CONTACT_TO_EMAIL` and `NEXT_PUBLIC_SITE_URL`.

L15 (commit slice boundary): the whole implementation landed as one commit. The
pieces are genuinely interdependent — `src/lib/site.ts` is imported by the root
layout, the folders link to routes that must exist, and the sheet imports the
action — so any split would have produced commits that do not build. That is a
worse history than one honest large commit, and it is recorded here rather than
hidden.
