import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";
import { motion } from "framer-motion";

export default function SmartStatusModal({ isOpen, onClose, parcel }) {
  const [smartStatus, setSmartStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSmartStatus = useCallback(async () => {
    if (!parcel) return;
    setIsLoading(true);
    setSmartStatus("");
    try {
      const prompt = `Provide a concise, user-friendly status update for a parcel with the following details. Be creative and reassuring.
      - Tracking ID: ${parcel.tracking_number}
      - Current Status: ${parcel.status}
      - From: ${parcel.origin_address}
      - To: ${parcel.destination_address}
      - Estimated Delivery: ${parcel.estimated_delivery}
      - Items: ${parcel.items?.map(i => i.product_name).join(', ')}
      
      Start with a friendly greeting and provide an easy-to-understand summary.`;
      
      const response = await InvokeLLM({ prompt });
      setSmartStatus(response);
    } catch (error)
      {
      console.error("Error fetching smart status:", error);
      setSmartStatus("Sorry, I couldn't get the smart status right now. Please check the standard status for details.");
    }
    setIsLoading(false);
  }, [parcel]);

  useEffect(() => {
    if (isOpen && parcel) {
      fetchSmartStatus();
    }
  }, [isOpen, parcel, fetchSmartStatus]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Smart Status Update
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-slate-600 min-h-[120px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-pre-wrap">
              {smartStatus}
            </motion.p>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}