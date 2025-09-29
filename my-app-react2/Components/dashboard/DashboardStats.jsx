import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ShoppingCart, TrendingUp, Truck } from "lucide-react";
import { motion } from "framer-motion";

const statsConfig = [
  {
    title: "Total Parcels",
    key: "totalParcels",
    icon: Package,
    color: "blue",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Active Shipments", 
    key: "activeParcels",
    icon: Truck,
    color: "green",
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "Pending Orders",
    key: "pendingOrders", 
    icon: ShoppingCart,
    color: "yellow",
    gradient: "from-yellow-500 to-yellow-600"
  },
  {
    title: "Total Spent",
    key: "totalSpent",
    icon: TrendingUp,
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    format: "currency"
  }
];

export default function DashboardStats({ stats, isLoading }) {
  const formatValue = (value, format) => {
    if (format === "currency") {
      return `$${value.toFixed(2)}`;
    }
    return value.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {statsConfig.map((config, index) => (
        <motion.div
          key={config.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full transform translate-x-8 -translate-y-8`} />
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">{config.title}</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <p className="text-3xl font-bold text-slate-900">
                      {formatValue(stats[config.key] || 0, config.format)}
                    </p>
                  )}
                </div>
                
                <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg`}>
                  <config.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">↗ 12%</span>
                <span className="text-slate-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}