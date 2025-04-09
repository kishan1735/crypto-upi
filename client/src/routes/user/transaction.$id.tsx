import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/user/transaction/$id")({
  component: RouteComponent,
});

const transactionSchema = z.object({
  mmid: z.string().nonempty(),
  vid: z.string().nonempty(),
  amount: z.coerce.number().default(0),
  pin: z.string().nonempty(),
});

type TransactionType = z.infer<typeof transactionSchema>;

function RouteComponent() {
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { id } = useParams({ from: "/user/transaction/$id" });
  const navigate = useNavigate();
  const transactionMutation = useMutation({
    mutationFn: async (data: TransactionType) => {
      await axios.post(`http://localhost:8000/upi/transaction/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Transaction successful");
      navigate({ to: "/user/$id", params: { id } });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<TransactionType> = (data) => {
    transactionMutation.mutate(data);
  };
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Enter Transaction Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="px-6 md:px-8 text-black"
              onSubmit={(e) => {
                void form.handleSubmit(onSubmit)(e);
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN</FormLabel>
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
                    name="mmid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MMID</FormLabel>
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
                    name="vid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VID</FormLabel>
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
                <Button className="mt-2 cursor-pointer mx-auto">Pay</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
