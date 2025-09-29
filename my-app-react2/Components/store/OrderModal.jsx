
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ShoppingCart, CheckCircle } from "lucide-react";
import { Order } from "@/entities/Order";
import { Address } from "@/entities/Address";
import { useLanguage } from "../i18n/languageProvider"; // Changed import path from "../../i18n" to "../i18n"

export default function OrderModal({ isOpen, onClose }) {
  const [orderData, setOrderData] = useState({
    store_url: '',
    items: [{ product_link: '', product_name: '', price: 0, quantity: 1 }],
    special_instructions: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', 'error'
  const { t } = useLanguage();

  React.useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setSubmissionStatus(null);
      setOrderData({
        store_url: '',
        items: [{ product_link: '', product_name: '', price: 0, quantity: 1 }],
        special_instructions: ''
      });
      loadAddresses();
    }
  }, [isOpen]);

  const loadAddresses = async () => {
    try {
      const addressData = await Address.list();
      setAddresses(addressData);
      const defaultAddr = addressData.find(a => a.is_default);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr.id);
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  const addItem = () => {
    setOrderData(prev => ({
      ...prev,
      items: [...prev.items, { product_link: '', product_name: '', price: 0, quantity: 1 }]
    }));
  };

  const removeItem = (index) => {
    if (orderData.items.length > 1) {
      setOrderData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const updateItem = (index, field, value) => {
    setOrderData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleClose = () => {
    setSubmissionStatus(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const totalAmount = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const serviceeFee = totalAmount * 0.1; // 10% service fee

      const orderPayload = {
        order_number: `ORD-${Date.now()}`,
        store_url: orderData.store_url,
        total_amount: totalAmount,
        service_fee: serviceeFee,
        shipping_address: selectedAddress,
        status: 'pending',
        items: orderData.items,
        special_instructions: orderData.special_instructions
      };

      await Order.create(orderPayload);
      setSubmissionStatus('success');
    } catch (error) {
      console.error("Error creating order:", error);
      setSubmissionStatus('error');
    }
    setIsSubmitting(false);
  };

  const totalAmount = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = totalAmount * 0.1;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            {t('order_modal.title')}
          </DialogTitle>
        </DialogHeader>

        {submissionStatus === 'success' ? (
          <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-2xl font-bold text-slate-900">{t('order_modal.success_title')}</h3>
            <p className="text-slate-600">{t('order_modal.success_message')}</p>
            <Button onClick={handleClose} className="mt-4">{t('order_modal.close_button')}</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-sm text-slate-600">{t('order_modal.subtitle')}</p>
            <div>
              <Label htmlFor="store_url">Store Website (optional)</Label>
              <Input
                id="store_url"
                placeholder="e.g., coupang.com, gmarket.co.kr"
                value={orderData.store_url}
                onChange={(e) => setOrderData(prev => ({ ...prev, store_url: e.target.value }))}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Products to Order</Label>
                <Button type="button" onClick={addItem} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>

              {orderData.items.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    {orderData.items.length > 1 && (
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
                    <div className="md:col-span-2">
                      <Label>Product Link *</Label>
                      <Input
                        placeholder="https://www.coupang.com/vp/products/..."
                        value={item.product_link}
                        onChange={(e) => updateItem(index, 'product_link', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label>Product Name *</Label>
                      <Input
                        placeholder="e.g., Samsung Galaxy Phone"
                        value={item.product_name}
                        onChange={(e) => updateItem(index, 'product_name', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label>Price (USD) *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                        required
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
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Any specific requirements, color preferences, size, etc."
                value={orderData.special_instructions}
                onChange={(e) => setOrderData(prev => ({ ...prev, special_instructions: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium">Order Summary</h4>
              <div className="flex justify-between text-sm">
                <span>Products Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Fee (10%):</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2 font-medium">
                <span>Total Amount:</span>
                <span>${(totalAmount + serviceFee).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('order_modal.submitting_button') : t('order_modal.submit_button')}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
