import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart, Heart, Plus, Minus, Truck, Shield, RotateCcw } from "lucide-react";
import { Order, Address } from "@/entities/all";

export default function ProductModal({ isOpen, onClose, product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
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

  const handleOrder = async () => {
    if (!product || !selectedAddress) return;
    
    setIsOrdering(true);
    try {
      const totalAmount = product.price * quantity;
      const serviceFee = totalAmount * 0.1;

      await Order.create({
        order_number: `ORD-AC-${Date.now()}`,
        store_url: product.store_url || 'Active Cargo Store',
        total_amount: totalAmount,
        service_fee: serviceFee,
        shipping_address: selectedAddress,
        status: 'confirmed',
        payment_status: 'pending',
        items: [{
          product_name: product.name,
          product_link: product.product_url || '',
          price: product.price,
          quantity: quantity,
          color: selectedColor,
          size: selectedSize
        }],
        special_instructions: `Active Cargo Store product - ${product.name}`
      });
      
      onClose();
      // Reset form
      setQuantity(1);
      setSelectedSize('');
      setSelectedColor('');
    } catch (error) {
      console.error("Error creating order:", error);
    }
    setIsOrdering(false);
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
              {product.image_urls?.[0] ? (
                <img
                  src={product.image_urls[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="w-16 h-16 text-slate-400" />
                </div>
              )}
            </div>
            
            {product.image_urls && product.image_urls.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.image_urls.slice(1, 5).map((url, index) => (
                  <div key={index} className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                    <img src={url} alt={`${product.name} ${index + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              {product.brand && (
                <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
              )}
              <h1 className="text-2xl font-bold text-slate-900 mt-1">{product.name}</h1>
              
              {product.rating > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">{product.rating}</span>
                  {product.reviews_count && (
                    <span className="text-sm text-slate-400">({product.reviews_count} reviews)</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <>
                  <span className="text-xl text-slate-500 line-through">
                    ${product.original_price.toFixed(2)}
                  </span>
                  <Badge className="bg-red-500 text-white">
                    -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {product.description && (
              <p className="text-slate-600">{product.description}</p>
            )}

            {/* Product Options */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">Small</SelectItem>
                      <SelectItem value="m">Medium</SelectItem>
                      <SelectItem value="l">Large</SelectItem>
                      <SelectItem value="xl">X-Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Color</Label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Quantity</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {addresses.length > 0 && (
                <div>
                  <Label>Shipping Address</Label>
                  <Select value={selectedAddress} onValueChange={setSelectedAddress}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping address" />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map(address => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.label} - {address.recipient_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal:</span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Service Fee (10%):</span>
                <span>${(product.price * quantity * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${(product.price * quantity * 1.1).toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleOrder} 
                disabled={isOrdering || !selectedAddress}
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isOrdering ? 'Processing...' : 'Order Now'}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Compare
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-slate-600">Fast Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-slate-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-xs text-slate-600">30-Day Return</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}