import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Address } from "@/entities/Address";
import { MapPin } from 'lucide-react';

export default function AddressForm({ isOpen, onClose, onSuccess, address }) {
  const [formData, setFormData] = useState({
    label: '', recipient_name: '', phone: '', address_line1: '', address_line2: '',
    city: '', state: '', postal_code: '', country: 'South Korea', is_default: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (address) {
      setFormData(address);
    } else {
      resetForm();
    }
  }, [address, isOpen]);

  const resetForm = () => {
    setFormData({
      label: '', recipient_name: '', phone: '', address_line1: '', address_line2: '',
      city: '', state: '', postal_code: '', country: 'South Korea', is_default: false
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({ ...prev, is_default: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (address) {
        await Address.update(address.id, formData);
      } else {
        await Address.create(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving address:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600"/>
            {address ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="label">Label</Label><Input name="label" value={formData.label} onChange={handleChange} placeholder="e.g., Home, Work" required/></div>
            <div><Label htmlFor="recipient_name">Recipient Name</Label><Input name="recipient_name" value={formData.recipient_name} onChange={handleChange} required/></div>
          </div>
          <div><Label htmlFor="address_line1">Address Line 1</Label><Input name="address_line1" value={formData.address_line1} onChange={handleChange} required/></div>
          <div><Label htmlFor="address_line2">Address Line 2 (Optional)</Label><Input name="address_line2" value={formData.address_line2} onChange={handleChange}/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="city">City</Label><Input name="city" value={formData.city} onChange={handleChange} required/></div>
            <div><Label htmlFor="state">State/Province</Label><Input name="state" value={formData.state} onChange={handleChange} required/></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="postal_code">Postal Code</Label><Input name="postal_code" value={formData.postal_code} onChange={handleChange} required/></div>
            <div><Label htmlFor="country">Country</Label><Input name="country" value={formData.country} onChange={handleChange} required/></div>
          </div>
          <div><Label htmlFor="phone">Phone Number</Label><Input name="phone" type="tel" value={formData.phone} onChange={handleChange} required/></div>
          <div className="flex items-center space-x-2">
            <Checkbox id="is_default" checked={formData.is_default} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="is_default">Set as default address</Label>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Address"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}