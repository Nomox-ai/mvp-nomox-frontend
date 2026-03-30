# Nomox Frontend — Claude Guidelines

This is the Nomox frontend built with SvelteKit and TypeScript.

## Tech stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn-svelte

## Coding rules

### Components

- **Always use shadcn-svelte** for UI components — if a shadcn component exists for what you need, install and use it instead of writing from scratch
  - Install: `npx shadcn-svelte@latest add <component>`
  - Available components: https://www.shadcn-svelte.com/docs/components
- Svelte components go in `src/lib/` (reusable) or `src/routes/` (page-specific)
- Component file names: `PascalCase.svelte`

### TypeScript

- Use TypeScript for all `.ts` and `.svelte` files — avoid `any` types
- `camelCase` for variables, functions, and props
- `PascalCase` for types, interfaces, and component names
- Define shared types in `src/lib/` — do not inline complex types in components

### Styling

- Use Tailwind utility classes — avoid inline styles and custom CSS unless necessary
- Follow existing patterns in the codebase for spacing, colors, and layout

### API calls

- All backend calls go through a centralized API layer in `src/lib/`
- Never hardcode URLs — use environment variables via `$env/`

## Environment variables

- Defined in `.env` (not committed to git)
- Maintain `.env.example` with development defaults
- Public vars (exposed to browser) must be prefixed `PUBLIC_`

## Git

- Use **conventional commits**: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, etc.
- PRs to `main` require a code review from another developer

## Running locally

```sh
npm install
npm run dev
```

## Building

```sh
npm run build
npm run preview
```

Full guidelines: https://github.com/your-org/nomox-wiki/wiki/code/code_guidelines/guidelines
