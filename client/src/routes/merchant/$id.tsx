import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/merchant/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/merchant/$id" });
  const { data, isLoading, isError } = useQuery({
    queryKey: [`merchant ${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `http://192.168.200.129:8000/merchant/${id}`
      );
      return response.data.merchant;
    },
  });
  if (isLoading)
    return (
      <div className="flex text-white h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error fetching merchant
      </div>
    );
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <Card className="min-w-xs">
        <CardHeader>
          <CardTitle className="text-xl text-center">{data.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="amount" className="text-lg">
              Balance
            </Label>
            <div id="amount">{data.amount}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="ifscCode" className="text-lg">
              Bank IFSC
            </Label>
            <div id="ifscCode">{data.bankIfsc}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="amount" className="text-lg">
              Merchant ID
            </Label>
            <div id="amount">{data.merchantID}</div>
          </div>
          <Link
            to={`/merchant/transaction/$id`}
            params={{ id }}
            className="w-full flex"
          >
            <Button className="mt-6 cursor-pointer mx-auto">
              Enter UPI Transaction
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
