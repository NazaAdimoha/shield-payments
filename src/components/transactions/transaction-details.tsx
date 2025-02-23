"use client";
import { Button } from "@/components/ui/button";
import { TransactionDetails } from "@/types";
import { ClipboardCopy } from "lucide-react";
import { StatusPill } from "../ui/status-pill";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

interface TransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionDetails | null;
}

export const TransactionDrawer = ({
  isOpen,
  onClose,
  transaction,
}: TransactionDrawerProps) => {
  if (!transaction) return null;

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col space-y-1 py-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {value}
      </span>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">
            Transaction Details
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {transaction.amount}
            </h2>
          </div>

          <DetailRow
            label="DATE & TIME"
            value={new Date(transaction.dateTime).toLocaleString()}
          />

          <div className="flex justify-between">
            <DetailRow label="TRANSACTION TYPE" value={transaction.type} />
            {transaction.recipient && (
              <DetailRow label="RECIPIENT" value={transaction.recipient} />
            )}
          </div>

          <div className="flex items-center space-x-2">
            <DetailRow label="TRANSACTION ID" value={transaction.transactionId} />
            <button
              onClick={() => navigator.clipboard.writeText(transaction.transactionId)}
              className="text-primary hover:text-primary/80"
            >
              <ClipboardCopy size={16} />
            </button>
          </div>

          {transaction.amountTendered && (
            <DetailRow label="AMOUNT TENDERED" value={transaction.amountTendered} />
          )}

          <div className="flex justify-between">
            {transaction.totalFees && (
              <DetailRow label="TOTAL FEES" value={transaction.totalFees} />
            )}
            {transaction.amountReceived && (
              <DetailRow
                label="AMOUNT RECEIVED"
                value={transaction.amountReceived}
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <DetailRow label="DESCRIPTION" value={transaction.description} />
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                STATUS
              </span>
              <StatusPill status={transaction.status} />
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <Button className="w-full" variant="default">
              Download Receipt
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                // Implement report functionality
                console.log("Report transaction:", transaction.id);
              }}
            >
              Report Transaction
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};