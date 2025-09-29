import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Laptop,
  Book,
  Utensils
} from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "general", label: "General", icon: ShoppingBag },
  { id: "fashion", label: "Fashion", icon: ShoppingBag },
  { id: "beauty", label: "Beauty", icon: Heart },
  { id: "electronics", label: "Electronics", icon: Laptop },
  { id: "books", label: "Books", icon: Book },
  { id: "food", label: "Food", icon: Utensils },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange, compact = false }) {
  if (compact) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'hover:bg-blue-50 hover:border-blue-200 bg-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Browse by Category</h3>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'hover:bg-blue-50 hover:border-blue-200 bg-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
}