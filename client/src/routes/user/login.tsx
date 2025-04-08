import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/user/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="min-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0 ">
              <form className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome Back User</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to your Bank Account
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text">Name</Label>
                    <Input id="text" type="text" placeholder="Name" required />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full cursor-pointer">
                    Login
                  </Button>

                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/user/signup"
                      className="underline underline-offset-4 hover:scale-105"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
