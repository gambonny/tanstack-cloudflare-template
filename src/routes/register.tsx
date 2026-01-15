import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/client";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const nav = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Email+password signup; include `name` if your Better Auth config stores it
      const res = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if ((res as any)?.error) {
        setError((res as any).error.message ?? "Sign up failed");
        return;
      }

      nav({ to: "/" });
    } catch (err: any) {
      setError(err?.message ?? "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Create account</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Email
          <input
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Password
          <input
            type="password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error ? <div style={{ color: "crimson" }}>{error}</div> : null}

        <button disabled={loading} type="submit">
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
