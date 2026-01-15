import { drizzle } from "drizzle-orm/d1/driver";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { betterAuthOptions } from "@/lib/auth/options";
import { env } from "cloudflare:workers";

const { BETTER_AUTH_URL, BETTER_AUTH_SECRET } = process.env;

const db = drizzle(env.blackbox_db);

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  ...betterAuthOptions,
  database: drizzleAdapter(db, { provider: "sqlite" }),
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
});
