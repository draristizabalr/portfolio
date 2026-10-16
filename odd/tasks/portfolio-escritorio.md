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
