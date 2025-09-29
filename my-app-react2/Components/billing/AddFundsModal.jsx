import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, CreditCard } from 'lucide-react';
import { Payment, User } from '@/entities/all';
import { Badge } from "@/components/ui/badge";

const amounts = [20, 50, 100, 200];

const paymentMethods = [
  { name: 'visa', label: 'Visa', color: 'bg-blue-100 text-blue-800' },
  { name: 'mastercard', label: 'MasterCard', color: 'bg-red-100 text-red-800' },
  { name: 'paypal', label: 'PayPal', color: 'bg-blue-100 text-blue-600' },
  { name: 'kakaopay', label: '카카오페이', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'naver_pay', label: '네이버페이', color: 'bg-green-100 text-green-800' },
];

export default function AddFundsModal({ isOpen, onClose, onSuccess }) {
  const [amount, setAmount] = useState(50);
  const [selectedMethod, setSelectedMethod] = useState('visa');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const currentUser = await User.me();
      const newBalance = (currentUser.balance || 0) + amount;
      
      await User.updateMyUserData({ balance: newBalance });
      
      await Payment.create({
        amount: amount,
        payment_method: selectedMethod,
        status: 'completed',
        reference_type: 'balance_topup',
        description: 'Account balance top-up',
        transaction_id: `TXN-FUNDS-${Date.now()}`
      });
      onSuccess();
    } catch (error) {
      console.error("Error adding funds:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-600" />
            Add Funds to Balance
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div>
            <Label>Select Amount (USD)</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {amounts.map(a => (
                <Button 
                  key={a} 
                  variant={amount === a ? 'default' : 'outline'} 
                  onClick={() => setAmount(a)}
                >
                  ${a}
                </Button>
              ))}
            </div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-2"
              placeholder="Or enter custom amount"
            />
          </div>
          
          <div>
            <Label>Payment Method</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {paymentMethods.map(method => (
                <Button
                  key={method.name}
                  variant={selectedMethod === method.name ? 'default' : 'outline'}
                  onClick={() => setSelectedMethod(method.name)}
                  className="justify-start h-12"
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  <div className="flex items-center justify-between w-full">
                    <span>{method.label}</span>
                    {selectedMethod === method.name && (
                      <Badge className={method.color}>Selected</Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || amount <= 0} 
              className="w-full"
            >
              {isSubmitting ? 'Processing...' : `Add $${amount.toFixed(2)} to Balance`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}