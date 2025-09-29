
import React, { useState, useEffect } from "react";
import { Payment, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentMethods from "../components/billing/PaymentMethods";
import TransactionHistory from "../components/billing/TransactionHistory";
import AddFundsModal from "../components/billing/AddFundsModal";

export default function BillingPage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    setIsLoading(true);
    try {
      // First, fetch user data to get the user's email
      const userData = await User.me();
      // Then, filter payments by the user's email
      const payments = await Payment.filter({ created_by: userData.email }, '-created_date');

      setTransactions(payments);
      setBalance(userData.balance || 0);
    } catch (error) {
      console.error("Error loading billing data:", error);
      // Set to default values on error
      setTransactions([]);
      setBalance(0);
    }
    setIsLoading(false);
  };

  const handleFundsAdded = () => {
    setIsAddFundsOpen(false);
    loadBillingData(); // Refresh data to show new balance
  };

  return (
    <>
      <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Billing</h1>
            <p className="text-slate-600 mt-1">Manage your payment methods and view your transaction history.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <PaymentMethods />
              <TransactionHistory transactions={transactions} isLoading={isLoading} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-blue-600"/>
                    Account Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-32 mb-4" />
                  ) : (
                    <p className="text-4xl font-bold text-slate-900 mb-4">${balance.toFixed(2)}</p>
                  )}
                  <Button 
                    onClick={() => setIsAddFundsOpen(true)} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Funds
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <AddFundsModal 
        isOpen={isAddFundsOpen} 
        onClose={() => setIsAddFundsOpen(false)} 
        onSuccess={handleFundsAdded} 
      />
    </>
  );
}
