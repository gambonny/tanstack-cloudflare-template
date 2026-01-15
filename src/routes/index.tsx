import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSessionFn } from "@/server/auth";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const session = await getSessionFn();
    if (!session?.user) throw redirect({ to: "/register" });
    return { session };
  },
  component: AppPage,
});

function AppPage() {
  const data = Route.useLoaderData();
  console.log("data: ", data);

  return (
    <div style={{ padding: 16 }}>
      <h1>Protected App</h1>
      <p>If you can see this, you are authenticated.</p>
    </div>
  );
}
