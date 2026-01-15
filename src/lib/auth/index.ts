import { drizzle } from "drizzle-orm/d1/driver";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";

import { betterAuthOptions } from "./options";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import * as schema from "@/db/schema";

export const auth = (env: Cloudflare.Env): ReturnType<typeof betterAuth> => {
  const db = drizzle(env.blackbox_db);

  return betterAuth({
    ...betterAuthOptions,
    emailAndPassword: {
      enabled: true,
    },
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    plugins: [tanstackStartCookies()],
  });
};
