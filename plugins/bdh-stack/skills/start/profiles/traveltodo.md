# TravelTodo

Concept: Travel booking, plus the internal apps that run it.
Audience: Customers, agencies, affiliates and staff.
Stack: See the apps below. Check versions in `composer.json` and `package.json`.
Language and tone: Every visible string exists in EN and FR. French must read naturally.

## The apps

| App | Repo | What it is | Stack |
| --- | --- | --- | --- |
| Workspace | `C:\laragon\www\workspace` | Central identity hub, live at identity.traveltodo.com: SSO, roles, permissions, sessions, supervision | Laravel 13, Inertia 3, Vue 3 + TypeScript, shadcn-vue/reka-ui, Tailwind 4, vue-i18n, Reverb, PHPUnit |
| Booking backend | `C:\laragon\www\backend` | Travel booking and back office: Flight, Hotel, Cart, Product, Omra, EveningTicket, Payment, Invoice, Affiliate, Supplier, PriceComparison | Laravel 12, Horizon, Reverb, Laravel MCP, Pest 4 |
| Website | Not under `C:\laragon\www` | Public site, Nuxt | Nuxt |
| RH | Not under `C:\laragon\www` | HR app, hr.traveltodo.com | Check its repo |

## Rules

### Direction

- Every app's auth, roles, permissions and sessions live in the workspace. Each user holds one role per app.
- No app manages its own accounts. New integrations use a catalogue URL plus role grants in the id_token or introspection.
- Permissions follow the Resabo shape: pages (paths) plus per-page permission keys. Roles grant both.
- Pages and permissions reach the workspace by a signed POST to the app's catalogue URL, plus a webhook the app calls (`POST /apps/catalogue`, client Basic auth) and a ping at boot. Never add a CLI sync step.
- The website is integrated. Other apps must be migrated to this model.

### Workspace

- Code lives in `app/Modules/{Application,Sso,Supervision,User}`, each with `Http`, `Models`, `Services` and `routes`. Controller methods are named `handle…`.
- Admin routes are gated with the `page` middleware: `page` or `page:{page}#{permission}`. The front end's `v-permission` uses the same name.
- Locale files are `resources/js/i18n/locales/{en,fr}.json` and `lang/{en,fr}`.
- Routes come from Wayfinder, never hand-written URLs.
- Full local check: `composer ci:check` (front-end lint, types, pint, phpstan, tests). Single test: `php artisan test --filter=Name`.

### Website warning

The website repo changes branch often, and uncommitted work was lost there once. After website work, say plainly that it is uncommitted and on which branch. Running `nuxt prepare` while `nuxt dev` runs breaks the dev client until a real restart.

## Rules by role

### ceo

The workspace stays the central hub.

### commercial

- **Booking backend:** the commercial side of Flight, Hotel, Cart, Omra, EveningTicket, Payment, Invoice, Affiliate, Supplier and PriceComparison.
- **Website:** conversion and what customers see when they book.
- **Workspace:** internal adoption. It has no billing, plans or tenants, so its value is staff time, less risk and one place to manage people.

### team-lead

Verify with `php artisan test --filter`, `npm run check` or `npm run types:check`. Flag missing FR or EN strings, and breaking changes for apps that call the workspace.

### researcher

Useful read-only commands: `php artisan route:list` and tests with `--filter`.

### designer

- In the workspace: Vue 3 `<script setup lang="ts">` pages in `resources/js/pages`, layouts in `resources/js/layouts`.
- shadcn-vue components in `resources/js/components/ui`, app components in `resources/js/components`. Reuse before creating.
- Tailwind 4 and the theme tokens in the CSS. No hard-coded hex colors, no inline styles.
- Icons from `@lucide/vue`, toasts from `vue-sonner`, routes from Wayfinder.
- Keep it calm and dense enough for an admin tool, with one primary action per view.
- Run `npm run check` and `npm run types:check`.

### backend

- Gate every new workspace admin route with the `page` middleware, and every state change with its permission.
- Connect apps by signed catalogue request and app ping. Never add a CLI sync.
- Say before you change anything that breaks a contract with another app: token claims, the `/oauth/*` endpoints, or the `/apps/*` endpoints.
- Run `composer ci:check` in the workspace, or the repo's own checks elsewhere.

### qa

- PHPUnit in the workspace, Pest in the booking backend. Tests run on SQLite in memory, never on a real database.
- Also test each role and permission involved, French and English including emails, and a calling app that is down or sends an expired or wrong signature.
- The workspace has no front-end test suite, so list what needs checking by hand.

### security

The workspace signs in everyone for every app, so a flaw there reaches all of them.

- **Workspace:** OAuth and id_tokens (`app/Modules/Sso`), app sign-in, sign-in requests, security checks, sessions and revocation, two-factor, password reset, allowed IPs.
- **Authorization:** the `page` middleware on every route, and checks that a record belongs to the acting user.
- **App-to-workspace trust:** client secrets, signed catalogue requests, webhook authentication.
- **Booking backend:** payments, invoices and customer data.
- Also look for token replay or weak expiry, redirect URI abuse, and SSRF through app URLs.

### release

Read `docs/deployment.md` in the workspace first. You own `.gitlab-ci.yml`, `scripts/`, `docker/ci/` and `docs/deployment.md`, and you keep that doc in step with the pipeline.

## Release

Ships to: Production, through GitLab CI on merge to `main`, using `scripts/deploy.sh`. A merge deploys automatically.
Done means:

1. `composer ci:check` and `npm run build` pass locally.
2. Migrations are safe on live data, and work with the previous release still answering for about two minutes.
3. New environment variables are documented, including `VITE_*` values that are compiled at build time.
4. New scheduled work runs through `routes/console.php`.
5. Rollback is possible, or the reason it is not is stated.

Must agree: `release`, `team-lead`, and `security` for sensitive changes.
Steps: See `docs/deployment.md`.

- The workspace's signing keys sign every app's tokens. Replacing them signs every user out of every app. Never regenerate or move them.
- PHP-FPM and the server are shared with other sites, including `hr.traveltodo.com`. Never change anything that affects them.
