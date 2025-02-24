"use client";

import Image from "next/image";
import Send from "../../../assets/money-tick.svg";
import DollarSign from "../../../assets/wallet.svg";
import CreditCard from "../../../assets/card-pos.svg";
import FileText from "../../../assets/receipt-2.svg";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { RecentTransactions } from "@/components/transactions/recent-transactions";

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

export default function PayPage() {
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

          <RecentTransactions />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}