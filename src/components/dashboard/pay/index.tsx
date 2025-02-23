"use client";

import { useState } from "react";
import Image from "next/image";
import Send from "../../../assets/money-tick.svg";
import DollarSign from "../../../assets/wallet.jpg";
import CreditCard from "../../../assets/card-pos.jpg";
import FileText from "../../../assets/receipt-2.svg";
import { Transaction } from "@/types";
import { StatusPill } from "@/components/ui/status-pill";
import { useTransactions } from "@/hooks/use-transactions";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { DataTable } from "@/components/ui/data-table";
import { TransactionDrawer } from "@/components/transactions/transaction-details";

const PayActionCard = ({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: any;
  title: string;
  description: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex flex-col space-y-2 rounded-lg bg-gray-50 dark:bg-gray-800 p-6 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    <div className="rounded-full p-2 w-fit">
      <Image src={Icon} alt="pay-icons" width={48} height={48} />
    </div>
    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
  </button>
);

const columns = [
  {
    id: "dateTime",
    header: "Date & Time",
    accessorKey: "dateTime",
    cell: ({ row }: { row: Transaction }) => (
      <span>{new Date(row.dateTime).toLocaleString()}</span>
    ),
  },
  {
    id: "amount",
    header: "Amount",
    accessorKey: "amount",
  },
  {
    id: "type",
    header: "Type",
    accessorKey: "type",
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: ({ row }: { row: Transaction }) => (
      <StatusPill status={row.status} />
    ),
  },
];

export default function PayPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: transactionsData, isLoading } = useTransactions(currentPage);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(
    null
  );

  const actions = [
    {
      icon: Send,
      title: "Send money",
      description: "Transfer funds to anyone",
    },
    {
      icon: DollarSign,
      title: "Request money",
      description: "Get paid by another user",
    },
    {
      icon: CreditCard,
      title: "Shield Card",
      description: "Spend freely anywhere",
    },
    {
      icon: FileText,
      title: "Pay Bills",
      description: "Manage your bills",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <MaxWidthWrapper>
        <div className="py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {actions.map((action) => (
              <PayActionCard key={action.title} {...action} />
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Transactions
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : (
              <DataTable
                data={transactionsData?.data || []}
                columns={columns}
                metadata={transactionsData?.metadata || {
                  currentPage: 1,
                  totalPages: 1,
                  totalItems: 0,
                  itemsPerPage: 10,
                }}
                onPageChange={setCurrentPage}
                onRowClick={setSelectedTransaction}
              />
            )}
          </div>
        </div>
      </MaxWidthWrapper>

      <TransactionDrawer
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      />
    </div>
  );
}