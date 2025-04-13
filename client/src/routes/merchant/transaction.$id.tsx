import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/merchant/transaction/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/merchant/transaction/$id" });
  const { data, isLoading, isError } = useQuery({
    queryKey: [`merchant ${id}`],
    queryFn: async () => {
      const response = await axios.get(
        `http://192.168.200.129:8000/upi/generate/${id}`
      );
      return response.data.qr;
    },
  });
  console.log(data);
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
          <CardTitle className="text-center text-xl">Scan QR</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={data} className="mx-auto" />
        </CardContent>
      </Card>
    </div>
  );
}
