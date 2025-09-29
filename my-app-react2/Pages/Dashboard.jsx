
import React, { useState, useEffect } from "react";
import { Parcel, Order, Payment } from "@/entities/all";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Clock, 
  Plus,
  Truck,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "../components/i18n/languageProvider";

import DashboardStats from "../components/dashboard/DashboardStats";
import RecentParcels from "../components/dashboard/RecentParcels";
import QuickActions from "../components/dashboard/QuickActions";
import OrderStatus from "../components/dashboard/OrderStatus";

export default function Dashboard() {
  const [parcels, setParcels] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const userData = await User.me(); // Fetch user first
      setUser(userData);
      
      const [parcelsData, ordersData, paymentsData] = await Promise.all([
        // Filter by created_by with user's email
        // Assuming Parcel, Order, Payment entities have a filter method that takes query, sort, and limit
        Parcel.filter({ created_by: userData.email }, '-created_date', 10),
        Order.filter({ created_by: userData.email }, '-created_date', 5),
        Payment.filter({ created_by: userData.email }, '-created_date', 5),
      ]);

      setParcels(parcelsData);
      setOrders(ordersData);
      setPayments(paymentsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      // If user is not logged in or an error occurs, set empty arrays and null user
      setParcels([]);
      setOrders([]);
      setPayments([]);
      setUser(null); 
    }
    setIsLoading(false);
  };

  const stats = {
    totalParcels: parcels.length,
    activeParcels: parcels.filter(p => ['processing', 'shipped', 'in_transit'].includes(p.status)).length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalSpent: payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {t('dashboard.welcome')}{user?.full_name ? `, ${user.full_name}` : ''}!
          </h1>
          <p className="text-slate-600">
            {t('dashboard.overview')}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <DashboardStats stats={stats} isLoading={isLoading} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            <RecentParcels parcels={parcels} isLoading={isLoading} />
            <OrderStatus orders={orders} isLoading={isLoading} />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8">
            <QuickActions />
            
            {/* Recent Activity */}
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.slice(0, 3).map((payment, index) => (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          payment.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {payment.status === 'completed' ? 
                            <CheckCircle className="w-4 h-4 text-green-600" /> : 
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">
                            {payment.description || 'Payment'}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(payment.created_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">
                        ${payment.amount.toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                  
                  {payments.length === 0 && (
                    <p className="text-slate-500 text-sm text-center py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
