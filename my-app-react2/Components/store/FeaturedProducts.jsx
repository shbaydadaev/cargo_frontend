import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturedProducts({ products, isLoading, onProductClick, searchQuery, compact = false }) {
  if (isLoading) {
    return (
      <div className={`grid ${compact ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
        {Array(compact ? 4 : 8).fill(0).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          No Products Found
        </h3>
        <p className="text-slate-500">
          {searchQuery 
            ? `Try adjusting your search for "${searchQuery}"` 
            : 'No products available in this category.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${compact ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className="overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-0 bg-white group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-square bg-slate-100">
                {product.image_urls?.[0] ? (
                  <img
                    src={product.image_urls[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingCart className="w-12 h-12 text-slate-400" />
                  </div>
                )}
                
                {product.is_featured && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    Featured
                  </Badge>
                )}
                
                {product.original_price && product.original_price > product.price && (
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                  </Badge>
                )}

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <div className="p-2 bg-white rounded-full shadow-lg">
                        <ShoppingCart className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="p-2 bg-white rounded-full shadow-lg">
                        <Heart className="w-5 h-5 text-red-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {product.brand && (
                    <p className="text-sm text-slate-500">{product.brand}</p>
                  )}

                  <div className="flex items-center gap-2">
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-slate-600">{product.rating}</span>
                        {product.reviews_count && (
                          <span className="text-sm text-slate-400">({product.reviews_count})</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-sm text-slate-500 line-through">
                          ${product.original_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <Badge variant={product.availability === 'in_stock' ? 'default' : 'secondary'}>
                      {product.availability === 'in_stock' ? 'In Stock' : 
                       product.availability === 'limited' ? 'Limited' : 'Out of Stock'}
                    </Badge>
                  </div>

                  {product.shipping_info && (
                    <p className="text-xs text-green-600 font-medium">
                      {product.shipping_info}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}