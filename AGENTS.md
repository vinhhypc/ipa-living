# Project Rules

## Stack

- Next.js
- TypeScript
- Tailwind v4
- Shadcn-ui
- React Query

## Architecture

- Feature-based architecture
- Do not put business logic inside UI components
- API calls must be inside services/

## Naming

- Components: PascalCase
- Hooks: useXxx
- Utils: camelCase

## Styling / Tailwind (MANDATORY — read before writing any className)

- NEVER use arbitrary fixed values for spacing/sizing, e.g. `p-[7px]`, `top-[64px]`, `w-[10px]`.
  Full rule set: `.trae/theme-config-system-ai-rules.md`, `.trae/theme-config-system-design-guidelines.md`.
- Only allowed forms: (1) a scale utility already built into Tailwind (`p-4`, `top-16`,
  `max-w-7xl`...), or (2) `[var(--token-name)]` pointing at a CSS variable declared in
  `app/globals.css`. Never invent a new hardcoded number.
- If no existing token/utility fits: snap to the nearest existing one. If a genuinely new
  layout token is needed (rare — e.g. a container width Tailwind has no step for), add it as a
  named CSS variable in `app/globals.css` next to the existing tokens (`--space-section`,
  `--container-2xl`...) and reference it via `[var(--name)]` — do not hardcode the px inline.
- Responsive/breakpoint-specific rules (container width, sticky offsets, grid columns per
  breakpoint...): `docs/responsive-rules.md` — READ THIS before touching any layout/responsive
  className.

## Before modifying code

1. Inspect existing implementation
2. Search for similar patterns
3. Reuse existing components
4. Do not introduce dependencies without approval
5. If the change touches className/styling: read the Styling section above and `docs/responsive-rules.md` first
