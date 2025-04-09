import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/merchant/login")({
  component: RouteComponent,
});

const loginSchema = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
});
type LoginType = z.infer<typeof loginSchema>;

function RouteComponent() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate({ from: "/merchant/login" });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginType) => {
      const response = await axios.post(
        "http://localhost:8000/merchant/login",
        data
      );
      return response;
    },
    onSuccess: (data: AxiosResponse) => {
      toast.success("Login Successful");
      navigate({ to: "/merchant/$id", params: { id: data.data.merchant.id } });
    },
    onError: (error) => {
      if (isAxiosError(error))
        toast.error("Login Failed", error.response?.data);
      toast.error("Login Failed - Incorrect Credentials");
    },
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="min-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0 ">
              <Form {...form}>
                <form
                  className="p-6 md:p-8"
                  onSubmit={(e) => {
                    void form.handleSubmit(onSubmit)(e);
                  }}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">
                        Welcome Back Merchant
                      </h1>
                      <p className="text-balance text-muted-foreground">
                        Login to your Bank Account
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                className="text-center px-4"
                                {...field}
                                required
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      ></FormField>
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                className="text-center px-4"
                                {...field}
                                type="password"
                                required
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      ></FormField>
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
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
