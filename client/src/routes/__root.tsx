import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/images/home.jpg')" }}
      >
        <div className="min-h-screen bg-black opacity-75">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </QueryClientProvider>
  );
}
