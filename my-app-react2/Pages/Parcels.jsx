
import React, { useState, useEffect } from "react";
import { Parcel } from "@/entities/all";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Package, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import CreateParcelModal from "../components/parcels/CreateParcelModal";
import TariffPlans from "../components/parcels/TariffPlans";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  in_transit: "bg-indigo-100 text-indigo-800 border-indigo-200",
  out_for_delivery: "bg-orange-100 text-orange-800 border-orange-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200"
};

const parcelStatusTabs = ["all", "processing", "in_transit", "delivered"];

export default function ParcelsPage() {
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainActiveTab, setMainActiveTab] = useState("parcels");
  const [parcelFilterStatus, setParcelFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateParcelModalOpen, setIsCreateParcelModalOpen] = useState(false);

  useEffect(() => {
    loadParcels();
  }, []);

  const loadParcels = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      const parcelsData = await Parcel.filter({ created_by: user.email }, "-created_date");
      setParcels(parcelsData);
    } catch (error) {
      console.error("Error loading parcels:", error);
      setParcels([]); // Set to empty array on error
    }
    setIsLoading(false);
  };

  const filteredParcels = parcels.filter(parcel => {
    // Only apply parcel-specific filters if on the 'parcels' main tab
    if (mainActiveTab !== "parcels") return false;

    const matchesTab = parcelFilterStatus === "all" || parcel.status === parcelFilterStatus;
    const matchesSearch =
      parcel.tracking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.recipient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.destination_address?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header - Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-6 md:mb-8"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Parcels</h1>
              <p className="text-slate-600 mt-1 text-sm md:text-base">Track and manage all your shipments.</p>
            </div>
            <Button
              onClick={() => setIsCreateParcelModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Parcel
            </Button>
          </motion.div>

          {/* Main Tabs Navigation and Content */}
          <Card className="shadow-lg border-0 mb-6 md:mb-8">
            <CardContent className="p-4">
              <Tabs value={mainActiveTab} onValueChange={setMainActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="parcels" className="text-sm md:text-base">
                    My Parcels
                  </TabsTrigger>
                  <TabsTrigger value="rates" className="text-sm md:text-base">
                    Shipping Rates
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="parcels" className="space-y-6">
                  {/* Search and Filter for Parcels */}
                  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 gap-4">
                    <div className="relative flex-1">
                      <Search className="w-5 h-5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3" />
                      <Input
                        type="text"
                        placeholder="Search by tracking number, name, or destination..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border-slate-300 rounded-lg"
                      />
                    </div>
                    {/* Parcel Status Filter Tabs */}
                    <Tabs value={parcelFilterStatus} onValueChange={setParcelFilterStatus}>
                      <TabsList className="bg-slate-100 w-full md:w-auto">
                        {parcelStatusTabs.map(tab => (
                          <TabsTrigger
                            key={tab}
                            value={tab}
                            className="capitalize text-xs md:text-sm px-2 md:px-4"
                          >
                            {tab.replace("_", " ")}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Parcels List - Mobile Cards / Desktop Table */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {/* Mobile View - Card Layout */}
                    <div className="block md:hidden space-y-4">
                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          Array(5).fill(0).map((_, i) => (
                            <Card key={i} className="shadow-lg border-0">
                              <CardContent className="p-4">
                                <Skeleton className="h-4 w-32 mb-2" />
                                <Skeleton className="h-3 w-24 mb-3" />
                                <Skeleton className="h-3 w-full mb-2" />
                                <Skeleton className="h-6 w-20" />
                              </CardContent>
                            </Card>
                          ))
                        ) : filteredParcels.length > 0 ? (
                          filteredParcels.map((parcel) => (
                            <motion.div
                              key={parcel.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                            >
                              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1 min-w-0">
                                      <p className="font-mono font-medium text-slate-900 truncate">
                                        {parcel.tracking_number}
                                      </p>
                                      <p className="text-sm text-slate-500 mt-1">
                                        {parcel.store_name || 'Unknown Store'}
                                      </p>
                                    </div>
                                    <Badge className={`${statusColors[parcel.status]} border font-medium ml-2`}>
                                      {parcel.status.replace('_', ' ')}
                                    </Badge>
                                  </div>

                                  <div className="space-y-2 text-sm text-slate-600">
                                    <div>
                                      <span className="font-medium">From:</span> {parcel.origin_address || 'N/A'}
                                    </div>
                                    <div>
                                      <span className="font-medium">To:</span> {parcel.destination_address || 'N/A'}
                                    </div>
                                    {parcel.estimated_delivery && (
                                      <div>
                                        <span className="font-medium">Est. Delivery:</span> {new Date(parcel.estimated_delivery).toLocaleDateString()}
                                      </div>
                                    )}
                                    {parcel.total_value && (
                                      <div className="font-medium text-slate-900">
                                        Value: ${parcel.total_value.toFixed(2)}
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))
                        ) : (
                          <Card className="shadow-lg border-0">
                            <CardContent className="text-center py-16">
                              <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                              <h3 className="font-medium text-slate-900">No Parcels Found</h3>
                              <p className="text-sm text-slate-500 mt-2">
                                {searchQuery ? `No results for "${searchQuery}" in this category.` : `You have no parcels with status "${parcelFilterStatus}".`}
                              </p>
                            </CardContent>
                          </Card>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Desktop View - Table Layout */}
                    <Card className="shadow-lg border-0 overflow-hidden hidden md:block">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-600">
                          <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                            <tr>
                              <th scope="col" className="px-6 py-3">Tracking ID</th>
                              <th scope="col" className="px-6 py-3">Store</th>
                              <th scope="col" className="px-6 py-3">Origin</th>
                              <th scope="col" className="px-6 py-3">Destination</th>
                              <th scope="col" className="px-6 py-3">Est. Delivery</th>
                              <th scope="col" className="px-6 py-3">Value</th>
                              <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <AnimatePresence mode="wait">
                              {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                  <tr key={i}>
                                    <td colSpan={7} className="px-6 py-4">
                                      <Skeleton className="h-4 w-full" />
                                    </td>
                                  </tr>
                                ))
                              ) : filteredParcels.length > 0 ? (
                                filteredParcels.map((parcel) => (
                                  <tr key={parcel.id} className="hover:bg-slate-50/50 border-b border-slate-200">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-900">
                                      {parcel.tracking_number}
                                    </td>
                                    <td className="px-6 py-4">
                                      {parcel.store_name || 'Unknown Store'}
                                    </td>
                                    <td className="px-6 py-4">
                                      {parcel.origin_address || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                      {parcel.destination_address || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                      {parcel.estimated_delivery ? new Date(parcel.estimated_delivery).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                      {parcel.total_value ? `$${parcel.total_value.toFixed(2)}` : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                      <Badge className={`${statusColors[parcel.status]} border font-medium`}>
                                        {parcel.status.replace('_', ' ')}
                                      </Badge>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={7} className="text-center h-48">
                                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <h3 className="font-medium text-slate-900">No Parcels Found</h3>
                                    <p className="text-sm text-slate-500">
                                      {searchQuery ? `No results for "${searchQuery}" in this category.` : `You have no parcels with status "${parcelFilterStatus}".`}
                                    </p>
                                  </td>
                                </tr>
                              )}
                            </AnimatePresence>
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="rates">
                  <TariffPlans />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <CreateParcelModal
        isOpen={isCreateParcelModalOpen}
        onClose={() => setIsCreateParcelModalOpen(false)}
        onParcelCreated={loadParcels}
      />
    </>
  );
}
