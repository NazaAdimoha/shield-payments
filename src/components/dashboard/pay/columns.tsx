"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Transaction } from "@/types";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "dateTime",
    header: "Date & Time",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const formatted = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
      
      return <span className="font-medium">{formatted}</span>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <StatusPill 
          status={status as "Pending" | "Approved" | "Failed"} 
          className={
            status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
            status === 'Failed' ? 'bg-red-50 text-red-700' :
            status === 'Pending' ? 'bg-gray-50 text-gray-700' : ''
          }
        />
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      );
    },
  },
]; 