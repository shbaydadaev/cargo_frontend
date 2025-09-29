import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";
import AddCardModal from "./AddCardModal";

const mockCards = [
  { id: 1, type: 'visa', last4: '4242', expiry: '08/25', isDefault: true, holderName: 'John Doe' },
  { id: 2, type: 'mastercard', last4: '5555', expiry: '11/24', isDefault: false, holderName: 'John Doe' },
];

const getCardIcon = (type) => {
  return <CreditCard className="w-8 h-8 text-blue-600" />;
};

export default function PaymentMethods() {
  const [cards, setCards] = useState(mockCards);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  const handleCardAdded = () => {
    setIsAddCardModalOpen(false);
    // In real implementation, reload cards from server
    console.log('Card added successfully');
  };

  const setDefaultCard = (cardId) => {
    setCards(prev => prev.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  return (
    <>
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600"/>
            Payment Methods
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsAddCardModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2"/>
            Add Card
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {cards.map(card => (
            <div key={card.id} className={`p-4 rounded-lg border flex items-center justify-between ${card.isDefault ? 'bg-blue-50 border-blue-200' : ''}`}>
              <div className="flex items-center gap-4">
                {getCardIcon(card.type)}
                <div>
                  <p className="font-semibold text-slate-800">
                    {card.type.charAt(0).toUpperCase() + card.type.slice(1)} ending in {card.last4}
                  </p>
                  <p className="text-sm text-slate-500">Expires {card.expiry} • {card.holderName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {card.isDefault ? (
                  <div className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Default</div>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setDefaultCard(card.id)}>
                    Set as default
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {cards.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">No payment methods added yet</p>
              <Button onClick={() => setIsAddCardModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Card
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onSuccess={handleCardAdded}
      />
    </>
  );
}