# Edu Knowledge Base & LMS

Vue 3 + TypeScript (strict) + Vite. Architecture: [project_architecture_template.md](./project_architecture_template.md).

## Local dev

```bash
npm install
npm run dev
```

Without any Supabase configuration the app runs fully offline against `src/api/mock-data.ts` — this is the default and needs no setup.

## Connecting Supabase (optional)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run every file in [supabase/migrations/](./supabase/migrations/) in order. They create all tables, RLS policies, and a trigger that auto-creates a `profiles` row on sign-up.
3. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (Settings → API).
4. `npm run dev`, sign up once from the app's login screen (this is your personal account).
5. Seed shared content (knowledge tree, article, quiz, practice task, graph) plus your personal demo data (notes, daily tasks, stats, progress) — matching what the offline mock shows:
   ```bash
   # add SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (Settings → API → service_role)
   # and SEED_USER_EMAIL (the account from step 4) to .env, then:
   npm run seed
   ```

`src/api/client.ts` automatically switches between mock data and real Supabase queries based on whether `VITE_SUPABASE_*` is set — no code changes needed either way. Table shapes are typed in `src/api/database.types.ts`; regenerate it with `supabase gen types typescript` once you have a live project.

## Adding content (articles, images) without code changes

Once Supabase is connected, new articles/sections/images are just rows in tables — no code, no redeploy. See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md).

## Scripts

- `npm run dev` — dev server
- `npm run build` — type-check (`vue-tsc -b`) + production build
- `npm run test` — Vitest unit tests
- `npm run seed` — push mock content/demo data into a configured Supabase project
