"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { TransactionDrawer } from "@/components/transactions/transaction-drawer";
import { type ColumnDef } from "@tanstack/react-table";
import { columns } from "@/components/dashboard/pay/columns";
import { type Transaction } from "@/types";
import { useTransactions } from "@/hooks/use-transactions";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { StatusPill } from "../ui/status-pill";

interface RecentTransactionsProps {
  title?: boolean;
}

function MobileTransaction({ 
  transaction, 
  onClick 
}: { 
  transaction: Transaction; 
  onClick: () => void;
}) {
  return (
    <div 
      className="p-4 space-y-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            {new Date(transaction.dateTime).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>
        <p className="font-medium">
          {new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(Number(transaction.amount))}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{transaction.description}</p>
        <div className="flex items-center gap-2">
          <StatusPill 
            status={transaction.status} 
            className={
              transaction.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
              transaction.status === 'Failed' ? 'bg-red-50 text-red-700' :
              'bg-gray-50 text-gray-700'
            }
          />
        </div>
      </div>
    </div>
  );
}

export function RecentTransactions({ title = true }: RecentTransactionsProps) {
  const [page, setPage] = useState(1);
  const { data: transactions, isLoading } = useTransactions(page);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>();
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <div className="space-y-4">
        {title && (
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
        )}
        
        <div className="bg-white rounded-lg border divide-y">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : transactions?.data.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No transactions found</div>
          ) : (
            transactions?.data.map((transaction: Transaction) => (
              <MobileTransaction
                key={transaction.id}
                transaction={transaction}
                onClick={() => setSelectedTransaction(transaction)}
              />
            ))
          )}
        </div>

        {transactions?.totalPages && transactions.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {transactions.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(transactions.totalPages!, p + 1))}
              disabled={page === transactions.totalPages}
            >
              Next
            </Button>
          </div>
        )}

        <TransactionDrawer
          transaction={selectedTransaction as Transaction}
          onClose={() => setSelectedTransaction(undefined)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
      )}
      
      <div className="bg-white rounded-lg border">
        <DataTable<Transaction>
          columns={columns as ColumnDef<Transaction, any>[]}
          data={transactions?.data || []}
          onRowClick={(row) => setSelectedTransaction(row)}
          metadata={{
            currentPage: page,
            totalPages: transactions?.totalPages || 1
          }}
          onPageChange={setPage}
        />
      </div>

      <TransactionDrawer
        transaction={selectedTransaction as Transaction}
        onClose={() => setSelectedTransaction(undefined)}
      />
    </div>
  );
} 