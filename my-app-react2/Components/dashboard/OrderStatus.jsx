import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Clock, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  confirmed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle },
  purchasing: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: ShoppingCart },
  purchased: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  shipped: { color: "bg-indigo-100 text-indigo-800 border-indigo-200", icon: CheckCircle },
  delivered: { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle }
};

export default function OrderStatus({ orders, isLoading }) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-slate-50/50">
        <CardTitle className="flex items-center gap-2 text-xl">
          <ShoppingCart className="w-6 h-6 text-blue-600" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          <AnimatePresence mode="wait">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-40" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-24" />
                </div>
              ))
            ) : orders.length > 0 ? (
              orders.map((order, index) => {
                const statusInfo = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = statusInfo.icon;
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 font-mono">
                          #{order.order_number}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {order.items?.length || 0} items • ${order.total_amount?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                      <Badge className={`${statusInfo.color} border font-medium flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-slate-600">
                      Created: {new Date(order.created_date).toLocaleDateString()}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-medium text-slate-900 mb-2">No orders yet</h3>
                <p className="text-sm text-slate-500">
                  Your purchase requests will appear here
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}