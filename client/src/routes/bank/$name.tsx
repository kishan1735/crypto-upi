import { Button } from "@/components/ui/button";
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
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";

export const Route = createFileRoute("/bank/$name")({
  component: RouteComponent,
});

function RouteComponent() {
  const { name } = useParams({ from: "/bank/$name" });
  const [bank, setBank] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: [`bank ${name}`],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8000/bank/${name.toUpperCase()}`
      );
      setBank(response.data.data.name);
      return [
        ...response.data.data.users.map((user: object) => {
          return { ...user, type: "User" };
        }),
        ...response.data.data.merchants.map((merchant: object) => {
          return { ...merchant, type: "Merchant" };
        }),
      ];
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
    <div className="flex flex-col gap-6 justify-center items-center min-h-screen">
      <div className="text-white text-6xl">{bank}</div>
      <Link to="/bank/transaction/$name" params={{ name }}>
        <Button variant="outline" className="cursor-pointer hover:opacity-90">
          View All Transactions
        </Button>
      </Link>
      <div>
        <Table className="bg-white text-black rounded-lg min-w-2xl">
          <TableCaption>A list of all Bank Users and Merchants</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">Name</TableHead>
              <TableHead className="text-center">Date Created</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Phone Number</TableHead>
              <TableHead className="text-center">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((el) => (
              <TableRow key={el.id}>
                <TableCell className="font-medium text-center">
                  {el.name}
                </TableCell>
                <TableCell className="text-center">
                  {el.createdAt.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">{el.amount}</TableCell>
                <TableCell className="text-center">{el.phoneNumber}</TableCell>
                <TableCell className="text-center">{el.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
