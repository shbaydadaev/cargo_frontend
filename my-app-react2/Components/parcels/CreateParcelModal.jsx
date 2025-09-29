import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Parcel } from "@/entities/Parcel";
import { motion } from "framer-motion";

export default function CreateParcelModal({ isOpen, onClose, onParcelCreated }) {
  const [parcelData, setParcelData] = useState({
    tracking_number: '',
    store_name: '',
    origin_address: '',
    destination_address: '',
    recipient_name: '',
    recipient_phone: '',
    estimated_delivery: '',
    items: [{ 
      product_name: '', 
      category: '', 
      quantity: 1, 
      price: 0,
      weight: 0,
      dimensions: ''
    }],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = () => {
    setParcelData(prev => ({
      ...prev,
      items: [...prev.items, { 
        product_name: '', 
        category: '', 
        quantity: 1, 
        price: 0,
        weight: 0,
        dimensions: ''
      }]
    }));
  };

  const removeItem = (index) => {
    if (parcelData.items.length > 1) {
      setParcelData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const updateItem = (index, field, value) => {
    setParcelData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Calculate total value and weight
      const total_value = parcelData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const total_weight = parcelData.items.reduce((sum, item) => sum + (item.weight * item.quantity), 0);

      const parcelPayload = {
        ...parcelData,
        total_value,
        total_weight,
        status: 'pending'
      };

      await Parcel.create(parcelPayload);
      onParcelCreated();
      onClose();
      
      // Reset form
      setParcelData({
        tracking_number: '',
        store_name: '',
        origin_address: '',
        destination_address: '',
        recipient_name: '',
        recipient_phone: '',
        estimated_delivery: '',
        items: [{ 
          product_name: '', 
          category: '', 
          quantity: 1, 
          price: 0,
          weight: 0,
          dimensions: ''
        }],
        notes: ''
      });
    } catch (error) {
      console.error("Error creating parcel:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Parcel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tracking_number">Tracking Number *</Label>
              <Input
                id="tracking_number"
                value={parcelData.tracking_number}
                onChange={(e) => setParcelData({...parcelData, tracking_number: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="store_name">Store Name</Label>
              <Input
                id="store_name"
                value={parcelData.store_name}
                onChange={(e) => setParcelData({...parcelData, store_name: e.target.value})}
              />
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin_address">Origin Address</Label>
              <Input
                id="origin_address"
                value={parcelData.origin_address}
                onChange={(e) => setParcelData({...parcelData, origin_address: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="destination_address">Destination Address</Label>
              <Input
                id="destination_address"
                value={parcelData.destination_address}
                onChange={(e) => setParcelData({...parcelData, destination_address: e.target.value})}
              />
            </div>
          </div>

          {/* Recipient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recipient_name">Recipient Name</Label>
              <Input
                id="recipient_name"
                value={parcelData.recipient_name}
                onChange={(e) => setParcelData({...parcelData, recipient_name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="recipient_phone">Recipient Phone</Label>
              <Input
                id="recipient_phone"
                value={parcelData.recipient_phone}
                onChange={(e) => setParcelData({...parcelData, recipient_phone: e.target.value})}
              />
            </div>
          </div>

          {/* Estimated Delivery */}
          <div>
            <Label htmlFor="estimated_delivery">Estimated Delivery</Label>
            <Input
              id="estimated_delivery"
              type="date"
              value={parcelData.estimated_delivery}
              onChange={(e) => setParcelData({...parcelData, estimated_delivery: e.target.value})}
            />
          </div>

          {/* Items */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Items</Label>
              <Button type="button" onClick={addItem} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </div>

            {parcelData.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg space-y-3 bg-slate-50"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  {parcelData.items.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeItem(index)}
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Product Name *</Label>
                    <Input
                      value={item.product_name}
                      onChange={(e) => updateItem(index, 'product_name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={item.category}
                      onChange={(e) => updateItem(index, 'category', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Quantity *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Price (USD) *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div>
                    <Label>Weight (kg)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.weight}
                      onChange={(e) => updateItem(index, 'weight', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label>Dimensions</Label>
                    <Input
                      placeholder="L x W x H (cm)"
                      value={item.dimensions}
                      onChange={(e) => updateItem(index, 'dimensions', e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={parcelData.notes}
              onChange={(e) => setParcelData({...parcelData, notes: e.target.value})}
              rows={3}
            />
          </div>

          {/* Total Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Summary</h4>
            <div className="flex justify-between text-sm">
              <span>Total Value:</span>
              <span>${parcelData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Weight:</span>
              <span>{parcelData.items.reduce((sum, item) => sum + (item.weight * item.quantity), 0).toFixed(2)} kg</span>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Parcel'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}