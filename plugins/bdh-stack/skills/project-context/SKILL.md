---
description: Shared facts and rules for the TravelTodo apps. Load before running a BDH-STACK role or skill.
user-invocable: false
---

# TravelTodo: shared context for every role

These notes can go stale. Check versions in `composer.json` and `package.json`. The code wins over this file.

## Keep it small

- The repo's `CLAUDE.md` is already loaded for the roles that need it. Do not read it again.
- Search first, then read only the part you need.
- Run the narrow test first. Show only what failed.
- Keep your report short. Cite `file:line`, and never paste code, diffs or logs. The main session carries your report for the rest of the conversation.

## The apps

| App | Repo | What it is | Stack |
| --- | --- | --- | --- |
| Workspace | `C:\laragon\www\workspace` | Central identity hub, live at identity.traveltodo.com: SSO, roles, permissions, sessions, supervision | Laravel 13, Inertia 3, Vue 3 + TypeScript, shadcn-vue/reka-ui, Tailwind 4, vue-i18n, Reverb, PHPUnit |
| Booking backend | `C:\laragon\www\backend` | Travel booking and back office: Flight, Hotel, Cart, Product, Omra, EveningTicket, Payment, Invoice, Affiliate, Supplier, PriceComparison | Laravel 12, Horizon, Reverb, Laravel MCP, Pest 4 |
| Website | Not under `C:\laragon\www` | Public site, Nuxt | Nuxt |
| RH | Not under `C:\laragon\www` | HR app, hr.traveltodo.com | Check its repo |

## Direction

- Every app's auth, roles, permissions and sessions live in the workspace. Each user holds one role per app.
- No app manages its own accounts. New integrations use a catalogue URL plus role grants in the id_token or introspection.
- Permissions follow the Resabo shape: pages (paths) plus per-page permission keys. Roles grant both.
- Pages and permissions reach the workspace by a signed POST to the app's catalogue URL, plus a webhook the app calls (`POST /apps/catalogue`, client Basic auth) and a ping at boot. Never add a CLI sync step.
- The website is integrated. Other apps must be migrated to this model.

## Workspace rules

- Code lives in `app/Modules/{Application,Sso,Supervision,User}`, each with `Http`, `Models`, `Services` and `routes`. Controller methods are named `handle…`.
- Admin routes are gated with the `page` middleware: `page` or `page:{page}#{permission}`. The front end's `v-permission` uses the same name.
- Every visible string exists in EN and FR, in `resources/js/i18n/locales/{en,fr}.json` and `lang/{en,fr}`. French must read naturally.
- Routes come from Wayfinder, never hand-written URLs.
- Full local check: `composer ci:check` (front-end lint, types, pint, phpstan, tests). Single test: `php artisan test --filter=Name`.

## Production

- Workspace deploys through GitLab CI on merge to `main`, using `scripts/deploy.sh`. `docs/deployment.md` is the reference.
- Its signing keys sign every app's tokens. Replacing them signs every user out of every app.
- PHP-FPM and the server are shared with other sites, including `hr.traveltodo.com`. Never change anything that affects them.

## Website warning

The website repo changes branch often, and uncommitted work was lost there once. After website work, say plainly that it is uncommitted and on which branch. Running `nuxt prepare` while `nuxt dev` runs breaks the dev client until a real restart.
