# Tanstack Start App Template

An opinionated, full-stack application template wiring **TanStack Start**, **PandaCSS**, **Drizzle**, and **Better Auth**.
Runs on **Cloudflare** with **D1** as the database.

## Instructions

### 1) Rename the template (project identity)

This repository ships with placeholder names. After forking, update the following identifiers to match your app name:

* **Cloudflare Worker name**: update `name` in `wrangler.jsonc`
  (currently `tanstack-cloudflare-template`).

* **Better Auth app name**: update `appName` in `src/lib/auth/options.ts`
  (currently `tanstack-cloudflare-template`).

* **Package name**: update `name` in `package.json`
  (currently `tanstack-cloudflare-template`).

At this stage, you should be able to run the app locally without deploying anything to Cloudflare.

---

### 2) Install dependencies

This project uses **pnpm** as the package manager.

If you don’t have pnpm installed yet:

```
npm install -g pnpm
```

Then install the project dependencies:

```
pnpm install
```

---

### 3) Create the D1 database

This template uses **Cloudflare D1** as its database.
You must create the database before deploying the Worker.

Create a new D1 database:

```
npx wrangler@latest d1 create <database-name>
```

Wrangler will output a `database_id`.
Update the following fields in `wrangler.jsonc`:

* `database_name`
* `database_id`

These values must match the database you just created.

---

### 4) Configure environment variables

This template uses environment variables for authentication and Cloudflare access.

Start by renaming the example file:

```
.env.example → .env
```

Then fill in the following values:

```
BETTER_AUTH_SECRET=xxx
BETTER_AUTH_URL=http://localhost:3000
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_DATABASE_ID=xxx
CLOUDFLARE_D1_TOKEN=xxx
```

* **BETTER_AUTH_SECRET**: can be any random string for local development.
* **BETTER_AUTH_URL**: must remain `http://localhost:3000` for local development.
* **CLOUDFLARE_ACCOUNT_ID**: your Cloudflare account ID.
* **CLOUDFLARE_DATABASE_ID**: the D1 database ID created earlier.
* **CLOUDFLARE_D1_TOKEN**: an API token with access to D1.

These Cloudflare values can be obtained from the Cloudflare dashboard.

---

### 5) Run database migrations

Once the database and environment variables are configured, you can run the Drizzle migrations against D1:

```
npx drizzle-kit migrate
```

This will create the required tables used by Better Auth and the application.

---

### 6) Run the app locally

After migrations have completed successfully, the app is ready to run locally:

```
pnpm dev
```

The application should now be available at:

```
http://localhost:3000
```

---

### 7) Generate Cloudflare Worker types

After updating `wrangler.jsonc` (Worker name, bindings, D1 config), regenerate the Cloudflare Worker types:

```
pnpm run cf-typegen
```

This ensures `worker-configuration.d.ts` matches the current Worker bindings (for example, the D1 binding type).

---

### 8) Deploy to Cloudflare

Deploy the Worker:

```
pnpm run deploy
```

After the first deployment, Cloudflare will assign your Worker its production URL (for example `https://<your-app>.workers.dev`).

---

### 9) Configure production environment variables (required after first deployment)

The deployed Worker is not usable until the production environment variables are configured.

#### 9.1 Set `BETTER_AUTH_URL`

Set `BETTER_AUTH_URL` to the deployed Worker URL.

You can configure this in the Cloudflare dashboard under your Worker settings (Variables / Environment Variables), or via Wrangler.

#### 9.2 Set secrets via Wrangler

The following values should be stored as **secrets**:

* `BETTER_AUTH_SECRET`
* `CLOUDFLARE_ACCOUNT_ID`
* `CLOUDFLARE_DATABASE_ID`
* `CLOUDFLARE_D1_TOKEN`

You can generate a strong auth secret with:

```
openssl rand -base64 32
```

Then set each secret using Wrangler:

```
npx wrangler secret put <VARIABLE_NAME>
```

Repeat the command for each variable above. Wrangler will prompt you for the value.

---

### 10) Post-deploy configuration (required after first deployment)

Some values depend on the final Cloudflare Worker URL and **must be updated only after the first deployment**.

* **Production URL**: update `BETTER_AUTH_URL` in `wrangler.jsonc`.

  During local development, this should remain:

  ```
  http://localhost:3000
  ```

  After deploying the app to Cloudflare, replace it with the assigned Worker URL, for example:

  ```
  https://<your-app>.workers.dev
  ```

  Better Auth uses this value as the canonical application origin, so it must match the deployed URL.
