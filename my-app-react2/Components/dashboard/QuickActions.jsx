import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Store, ShoppingCart, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Browse Store",
    description: "Shop from Korean retailers",
    icon: Store,
    color: "blue",
    url: createPageUrl("Store")
  },
  {
    title: "Request Purchase",
    description: "Let us order for you",
    icon: ShoppingCart,
    color: "purple",
    url: createPageUrl("Store") + "?action=order"
  },
  {
    title: "Track Parcel",
    description: "Check shipment status",
    icon: Package,
    color: "green",
    url: createPageUrl("Parcels")
  }
];

export default function QuickActions() {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={action.url}>
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-4 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all duration-200"
              >
                <div className={`p-2 rounded-lg mr-4 flex-shrink-0 ${
                  action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  action.color === 'green' ? 'bg-green-100 text-green-600' :
                  action.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="font-medium text-slate-900 truncate">{action.title}</div>
                  <div className="text-sm text-slate-500 truncate">{action.description}</div>
                </div>
              </Button>
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}