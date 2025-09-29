import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Zap, 
  Crown, 
  Clock, 
  Shield, 
  Package,
  Plane,
  CheckCircle,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

const tariffPlans = {
  standard: {
    name: "Standard",
    icon: Truck,
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    delivery: "20-30 business days",
    price_per_kg: 8,
    description: "Economical shipping for non-urgent items",
    features: [
      "Free packaging",
      "Basic tracking",
      "Insurance up to $100",
      "Consolidation available",
      "SMS notifications"
    ],
    pricing: [
      { weight: "First 0.5kg", price: 8 },
      { weight: "Each additional 0.5kg", price: 4 },
      { weight: "1kg", price: 12 },
      { weight: "2kg", price: 20 },
      { weight: "3kg", price: 28 },
      { weight: "5kg", price: 44 },
      { weight: "10kg", price: 84 }
    ]
  },
  express: {
    name: "Express",
    icon: Zap,
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
    delivery: "10-15 business days",
    price_per_kg: 12,
    description: "Faster delivery with priority handling",
    features: [
      "Premium packaging",
      "Real-time tracking",
      "Insurance up to $500",
      "Priority consolidation",
      "SMS + Email notifications",
      "Priority customs clearance"
    ],
    pricing: [
      { weight: "First 0.5kg", price: 12 },
      { weight: "Each additional 0.5kg", price: 6 },
      { weight: "1kg", price: 18 },
      { weight: "2kg", price: 30 },
      { weight: "3kg", price: 42 },
      { weight: "5kg", price: 66 },
      { weight: "10kg", price: 126 }
    ]
  },
  premium: {
    name: "Premium VIP",
    icon: Crown,
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    delivery: "5-10 business days",
    price_per_kg: 18,
    description: "Fastest delivery with white-glove service",
    features: [
      "Luxury packaging",
      "Real-time GPS tracking",
      "Full insurance coverage",
      "Same-day consolidation",
      "SMS + Email notifications",
      "Priority customs clearance",
      "Dedicated support",
      "Door-to-door delivery"
    ],
    pricing: [
      { weight: "First 0.5kg", price: 18 },
      { weight: "Each additional 0.5kg", price: 9 },
      { weight: "1kg", price: 27 },
      { weight: "2kg", price: 45 },
      { weight: "3kg", price: 63 },
      { weight: "5kg", price: 99 },
      { weight: "10kg", price: 189 }
    ]
  }
};

const additionalServices = [
  { name: "Photo Report", description: "Photos of your package before shipping", price: 5 },
  { name: "Fragile Handling", description: "Extra care for delicate items", price: 10 },
  { name: "Express Consolidation", description: "Rush consolidation service (24h)", price: 20 },
  { name: "Additional Insurance", description: "Extra coverage per $100 value", price: 3 },
  { name: "Storage Extension", description: "Extended warehouse storage per week", price: 8 },
  { name: "Repackaging", description: "Professional repackaging service", price: 12 },
  { name: "Document Translation", description: "Invoice translation to Uzbek/Russian", price: 15 }
];

const shippingInfo = [
  {
    title: "Delivery Timeline",
    items: [
      "Processing time: 1-3 business days",
      "Transit time varies by service level",
      "Customs clearance: 2-5 business days",
      "Local delivery: 1-2 business days"
    ]
  },
  {
    title: "Customs & Duties", 
    items: [
      "Duty-free allowance: $200 per month",
      "VAT: 12% on goods over $200",
      "Customs duty: varies by product category",
      "We handle all customs paperwork"
    ]
  },
  {
    title: "Restricted Items",
    items: [
      "Liquids and aerosols",
      "Batteries (lithium-ion)",
      "Food and perishables", 
      "Medications and supplements"
    ]
  }
];

export default function TariffPlans() {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Shipping Rates: Korea → Uzbekistan
        </h2>
        <div className="flex items-center justify-center gap-4 text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇰🇷</span>
            <span className="font-medium">Korea</span>
          </div>
          <Plane className="w-6 h-6 text-blue-600" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇺🇿</span>
            <span className="font-medium">Uzbekistan</span>
          </div>
        </div>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Choose the perfect shipping plan for your needs. All prices are in USD and include customs clearance support.
        </p>
      </div>

      {/* Tariff Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {Object.entries(tariffPlans).map(([key, plan], index) => {
          const Icon = plan.icon;
          const isPopular = key === "express";
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full shadow-xl border-0 ${isPopular ? 'ring-2 ring-orange-300 scale-[1.02]' : ''} hover:shadow-2xl transition-all duration-300`}>
                <CardHeader className="text-center pb-6">
                  <div className={`mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="flex items-center justify-center gap-2 text-lg text-slate-600 mb-3">
                    <Clock className="w-5 h-5" />
                    {plan.delivery}
                  </div>
                  <p className="text-slate-500">{plan.description}</p>
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <span className="text-3xl font-bold text-slate-900">${plan.price_per_kg}</span>
                    <span className="text-slate-600 ml-2">/kg starting rate</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Pricing Table */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900">Pricing Structure:</h4>
                    <div className="space-y-2">
                      {plan.pricing.map((tier, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-700 font-medium">{tier.weight}</span>
                          <span className="font-bold text-slate-900">${tier.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-bold text-slate-900">Included Services:</h4>
                    <div className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      className={`w-full h-12 text-lg font-semibold ${
                        selectedPlan === key 
                          ? `bg-gradient-to-r ${plan.gradient} text-white` 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      onClick={() => setSelectedPlan(key)}
                    >
                      {selectedPlan === key ? 'Selected Plan' : 'Select Plan'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Services */}
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Package className="w-7 h-7 text-blue-600" />
            Additional Services
          </CardTitle>
          <p className="text-slate-500 text-lg">Optional add-ons to enhance your shipping experience</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl hover:shadow-md transition-shadow"
              >
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{service.name}</h4>
                  <p className="text-slate-600">{service.description}</p>
                </div>
                <div className="text-right ml-4">
                  <span className="text-2xl font-bold text-blue-600">${service.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shippingInfo.map((section, index) => (
          <Card key={section.title} className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important Notes */}
      <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-8">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-blue-900 text-xl mb-4">Important Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-blue-700">
                  <li>• Free consolidation for multiple purchases</li>
                  <li>• Maximum package size: 80cm x 60cm x 50cm</li>
                  <li>• Maximum weight per package: 30kg</li>
                  <li>• Warehouse storage: 30 days free</li>
                </ul>
                <ul className="space-y-2 text-blue-700">
                  <li>• Delivery times exclude weekends and holidays</li>
                  <li>• Additional fees may apply for remote areas</li>
                  <li>• Insurance coverage included in all plans</li>
                  <li>• 24/7 customer support available</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}