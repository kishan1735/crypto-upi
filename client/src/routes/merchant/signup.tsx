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
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

export const Route = createFileRoute("/merchant/signup")({
  component: RouteComponent,
});

const registerSchema = z.object({
  name: z.string().nonempty(),
  ifscCode: z.string().length(11),
  password: z.string().nonempty(),
  amount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Amount must be a valid number",
  }),
  phoneNumber: z.string().nonempty(),
});

type RegisterType = z.infer<typeof registerSchema>;

function RouteComponent() {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      ifscCode: "",
      password: "",
      amount: "0",
    },
  });
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterType) => {
      await axios.post("http://localhost:8000/merchant/register", data);
    },
    onSuccess: () => {
      toast.success("Merchant Registered Successfully");
      navigate({ to: "/merchant/login" });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log("Error registering merchant", error.response?.data);
      }
      console.log(error);
      toast.error("An error occurred while registering merchant");
    },
  });

  const onSubmit: SubmitHandler<RegisterType> = (data: RegisterType) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="min-w-md md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0 ">
              <Form {...form}>
                <form
                  className="p-6 md:p-8 text-black"
                  onSubmit={(e) => {
                    void form.handleSubmit(onSubmit)(e);
                  }}
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Signup as Merchant</h1>
                      <p className="text-balance text-muted-foreground">
                        Enter following details
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
                        name="ifscCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IFSC Code</FormLabel>
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
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
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
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
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
                                type="password"
                                {...field}
                                required
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      ></FormField>
                    </div>

                    <Button type="submit" className="w-full cursor-pointer">
                      Signup
                    </Button>

                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link
                        to="/merchant/login"
                        className="underline underline-offset-4 hover:scale-105"
                      >
                        Login
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
