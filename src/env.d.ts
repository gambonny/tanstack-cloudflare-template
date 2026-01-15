declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BETTER_AUTH_URL: string;
      BETTER_AUTH_SECRET: string;
      CLOUDFLARE_ACCOUNT_ID: string;
      CLOUDFLARE_DATABASE_ID: string;
      CLOUDFLARE_D1_TOKEN: string;
    }
  }
}

export {};
