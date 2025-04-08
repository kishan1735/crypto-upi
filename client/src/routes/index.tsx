import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-x-4 h-screen flex justify-center items-center">
      <Link
        to="/user/login"
        className="w-50 h-50 text-center flex items-center justify-center bg-white font-semibold text-black shadow-xs  opacity-90 rounded-lg text-2xl p-12 hover:scale-105 cursor-pointer"
      >
        User
      </Link>
      <Link
        to="/merchant/login"
        className="bg-white w-50 h-50 flex items-center justify-center font-semibold shadow-xs text-black  opacity-90 rounded-lg text-2xl px-12 py-16 hover:scale-105 cursor-pointer"
      >
        Merchant
      </Link>
    </div>
  );
}
