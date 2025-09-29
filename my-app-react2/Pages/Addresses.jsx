
import React, { useState, useEffect } from "react";
import { Address } from "@/entities/all";
import { User } from "@/entities/User"; // Added import for User entity
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plus, Home, Briefcase, Trash2, Edit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import AddressForm from "../components/addresses/AddressForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      const user = await User.me(); // Fetch the current user
      // Filter addresses by the user's email as created_by
      const data = await Address.filter({ created_by: user.email }, "-is_default");
      setAddresses(data);
    } catch (error) {
      console.error("Error loading addresses:", error);
      setAddresses([]); // Clear addresses on error
    }
    setIsLoading(false);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
    loadAddresses();
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleDelete = async (addressId) => {
    try {
      await Address.delete(addressId);
      loadAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <>
      <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Addresses</h1>
              <p className="text-slate-600 mt-1">Manage your shipping destinations.</p>
            </div>
            <Button onClick={() => { setEditingAddress(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          </motion.div>

          {/* Addresses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="shadow-lg border-0">
                    <CardHeader>
                      <Skeleton className="h-5 w-24" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              ) : addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <motion.div
                    key={address.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="shadow-lg border-0 h-full flex flex-col">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="flex items-center gap-2">
                          {address.label?.toLowerCase() === 'home' ? <Home className="w-5 h-5 text-blue-600" /> : <Briefcase className="w-5 h-5 text-blue-600" />}
                          {address.label}
                        </CardTitle>
                        {address.is_default && <div className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Default</div>}
                      </CardHeader>
                      <CardContent className="space-y-1 text-slate-600 flex-grow">
                        <p className="font-semibold text-slate-800">{address.recipient_name}</p>
                        <p>{address.address_line1}</p>
                        {address.address_line2 && <p>{address.address_line2}</p>}
                        <p>{address.city}, {address.state} {address.postal_code}</p>
                        <p>{address.country}</p>
                        <p>{address.phone}</p>
                      </CardContent>
                      <div className="p-4 border-t flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(address)}>
                          <Edit className="w-4 h-4 mr-2"/> Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                              <Trash2 className="w-4 h-4 mr-2"/> Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this address.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(address.id)} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-medium text-slate-900">No addresses saved</h3>
                  <p className="text-sm text-slate-500">Add an address to get started with your shipments.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AddressForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        address={editingAddress}
      />
    </>
  );
}
