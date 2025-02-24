"use client";
    
import { Sheet } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { Transaction } from "@/types";
import { Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useRef } from "react";
import { StatusPill } from "../ui/status-pill";

interface TransactionDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function TransactionDrawer({ transaction, onClose }: TransactionDrawerProps) {
  const { isMobile } = useMediaQuery();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {transaction && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />
          <Sheet open={!!transaction} onOpenChange={onClose}>
            <motion.div
              initial={isMobile ? { y: "100%" } : { x: "100%" }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: "100%" } : { x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={cn(
                "fixed bg-white shadow-lg dark:bg-slate-950",
                isMobile 
                  ? "inset-x-0 bottom-0 h-[65vh] rounded-t-[10px]" 
                  : "inset-y-0 right-0 w-[400px]"
              )}
              ref={drawerRef}
            >
              <div className={cn(
                    "h-full p-6 overflow-y-auto",
                    isMobile && "pb-safe"
                  )}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">Transaction Details</h2>
                      <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mb-8">
                      <h1 className="text-3xl font-bold">
                        {new Intl.NumberFormat('en-CA', {
                          style: 'currency',
                          currency: 'CAD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(Number(transaction.amount))}
                      </h1>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground uppercase">Date & Time</p>
                          <p className="text-sm font-medium mt-1">
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
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground uppercase">Transaction Type</p>
                          <p className="text-sm font-medium mt-1">{transaction.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground uppercase">Recipient</p>
                          <p className="text-sm font-medium mt-1">{transaction.recipient}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground uppercase">Transaction ID</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm font-medium">{transaction.id}</p>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground uppercase">Amount Tendered</p>
                          <p className="text-sm font-medium mt-1">{transaction.amountTendered} CAD</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground uppercase">Amount Received</p>
                          <p className="text-sm font-medium mt-1">{transaction.amountReceived} USD</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground uppercase">Total Fees</p>
                          <p className="text-sm font-medium mt-1">{transaction.fees} CAD</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground uppercase">Status</p>
                          <div className="mt-1">
                            <StatusPill status={transaction.status} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground uppercase">Description</p>
                        <p className="text-sm font-medium mt-1">{transaction.description}</p>
                      </div>

                      <div className="space-y-3 mt-8">
                        <Button className="w-full" variant="default">
                          Download Receipt
                        </Button>
                        <Button className="w-full" variant="ghost">
                          Report Transaction
                        </Button>
                      </div>
                    </div>
                  </div>
            </motion.div>
          </Sheet>
        </>
      )}
    </AnimatePresence>
  );
}
