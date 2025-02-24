import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet - Shield Payments",
};

export default function WalletPage() {
  return (
    <div className="flex h-[calc(100vh-65px)] items-center justify-center flex-col">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
          Coming Soon
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          The Wallet feature is under development
        </p>
      </div>
    </div>
  );
} 