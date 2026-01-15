import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";
import { auth } from "@/lib/auth";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => auth(env).handler(request),
      POST: async ({ request }) => auth(env).handler(request),
    },
  },
});
