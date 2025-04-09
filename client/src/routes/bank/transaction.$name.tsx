import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/bank/transaction/$name")({
  component: RouteComponent,
});

function RouteComponent() {
  const { name } = useParams({ from: "/bank/transaction/$name" });
  const { data, isLoading, isError } = useQuery({
    queryKey: [`bank ${name}`],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/upi/bank/${name.toUpperCase()}`
      );
      if (response.data.chain.length <= 1) return [];
      return response.data.chain.slice(1);
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
  console.log(data);
  return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-screen">
      <div className="text-white text-6xl uppercase">{name}</div>
      <div>
        <Table className="bg-white text-black rounded-lg min-w-2xl">
          <TableCaption>
            A list of all Transactions from or to the bank
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">No</TableHead>
              <TableHead className="text-center">UID</TableHead>
              <TableHead className="text-center">MID</TableHead>
              <TableHead className="text-center">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((el: any, i: number) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-center">
                  {i + 1}
                </TableCell>
                <TableCell className="text-center">{el.uid}</TableCell>
                <TableCell className="text-center">{el.mid}</TableCell>
                <TableCell className="text-center">{el.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
