import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ExternalLink, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200", 
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  in_transit: "bg-indigo-100 text-indigo-800 border-indigo-200",
  out_for_delivery: "bg-orange-100 text-orange-800 border-orange-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200"
};

export default function RecentParcels({ parcels, isLoading }) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-slate-50/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Package className="w-6 h-6 text-blue-600" />
            Recent Parcels
          </CardTitle>
          <Link to={createPageUrl("Parcels")}>
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              View All
            </Button>
          </Link>
        </div>
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
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))
            ) : parcels.length > 0 ? (
              parcels.slice(0, 5).map((parcel, index) => (
                <motion.div
                  key={parcel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 font-mono">
                        {parcel.tracking_number}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {parcel.store_name || 'Unknown Store'}
                      </p>
                    </div>
                    <Badge className={`${statusColors[parcel.status]} border font-medium`}>
                      {parcel.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{parcel.destination_address || 'Address not set'}</span>
                    </div>
                    {parcel.estimated_delivery && (
                      <div className="text-slate-500">
                        Est: {new Date(parcel.estimated_delivery).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  {parcel.total_value && (
                    <div className="mt-2 text-sm font-medium text-slate-900">
                      Value: ${parcel.total_value.toFixed(2)}
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-medium text-slate-900 mb-2">No parcels yet</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Start by creating your first parcel or order
                </p>
                <Link to={createPageUrl("Store")}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Browse Store
                  </Button>
                </Link>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}