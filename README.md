# Naija Kitchen

A recipe-sharing web app for Nigerian dishes from different tribes. Guests can browse public recipes, and members can share their own, with ingredients, steps and photos.

Built by Nathan, Chidumaga, Frank and Vic for COM619 DevOps at Solent University.

## Links

| What | Link |
|---|---|
| Live site | https://naija-kitchen-solent.vercel.app |
| Staging site | https://naija-kitchen-staging.vercel.app |
| Kanban board | https://github.com/users/ChidumagaOkoyeuzu/projects/8 |
| Figma mockups and style guide | [Figma link] |

## Features

**Guests**
- Browse public recipes with thumbnails
- View a recipe's ingredients, steps and photos
- Sign up

**Members**
- Log in and log out
- Edit profile and profile picture
- Preferences: dark mode, and metric or imperial units
- Create, edit and delete own recipes, with ingredients, steps and photos
- Make a recipe public or private
- Like and favourite recipes
- Add, edit and delete own comments

**Our extras**
- Every recipe has a tribe, with a tribe filter
- A page for each tribe
- Starter recipes loaded in, so the site isn't empty

**Left out on purpose (future work):** ratings, following/feed, meal planner, admin dashboard, password reset, social login.

## Running it locally

You need Node.js 20 or newer, and access to our Neon project.

1. Clone the repo and install packages (this also sets up Prisma):
   ```bash
   git clone https://github.com/ChidumagaOkoyeuzu/DevOps.git
   cd DevOps
   npm install
   ```
2. In Neon, create your own branch from `production` (e.g. `dev-yourname`, auto-delete set to Never).
3. Copy the settings template and fill in your branch's connection strings:
   ```bash
   cp .env.example .env
   ```
   - `DATABASE_URL`: connection string with pooling **off**
   - `DATABASE_URL_POOLED`: connection string with pooling **on**
   - `BETTER_AUTH_SECRET`: any long random text (make one with `openssl rand -base64 32`)
   - `BETTER_AUTH_URL`: `http://localhost:3000`
4. Create the tables in your branch and add the starter recipes:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
5. Start the app:
   ```bash
   npm run dev
   ```
6. Open http://localhost:3000. To check the database is connected, open http://localhost:3000/api/health. It should show `{"status":"ok","database":"ok"}`.

Never commit `.env`. It holds your database password.

## Environments

| Environment | Branch | Address | Database (Neon branch) |
|---|---|---|---|
| Live | `main` | https://naija-kitchen-solent.vercel.app | `production` |
| Staging | `develop` | https://naija-kitchen-staging.vercel.app | `staging` |
| PR preview | any PR | link posted on the PR by Vercel | `staging` |

Settings for live and staging are stored in Vercel, never in the repo.
New migrations are applied with `npx prisma migrate deploy` (automatic from the Auto deploy card).

## Project docs

- [CONTRIBUTING.md](CONTRIBUTING.md): how we branch, review and release
- [TECH_STACK.md](TECH_STACK.md): what we use and why
- [er-diagram.md](er-diagram.md): database tables and links
- [Docs/Scrum](Docs/Scrum): weekly scrum notes

## Licence

[Apache License 2.0](LICENSE)
