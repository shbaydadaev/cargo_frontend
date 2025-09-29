import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoreGrid({ stores, isLoading, searchQuery }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {Array(12).fill(0).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-20 sm:h-24 md:h-32 w-full" />
            <CardContent className="p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2">
              <Skeleton className="h-3 sm:h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <Store className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
          No Stores Found
        </h3>
        <p className="text-slate-500 text-sm sm:text-base px-4">
          {searchQuery 
            ? `Try adjusting your search for "${searchQuery}"` 
            : 'No stores available in this category.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
      <AnimatePresence mode="popLayout">
        {stores.map((store, index) => (
          <motion.div
            key={store.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
          >
            <a href={store.website_url} target="_blank" rel="noopener noreferrer">
              <Card className="overflow-hidden hover:shadow-lg sm:hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 bg-white group h-full">
                <div className="relative aspect-[16/10] bg-white p-2 sm:p-3 md:p-4 flex items-center justify-center">
                  {store.logo_url ? (
                    <img
                      src={store.logo_url}
                      alt={`${store.name} logo`}
                      className="max-w-full max-h-12 sm:max-h-16 md:max-h-20 object-contain"
                    />
                  ) : (
                    <Store className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-slate-400" />
                  )}
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 p-1 sm:p-2 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                  </div>
                </div>

                <CardContent className="p-2 sm:p-3 md:p-4 border-t bg-slate-50/50 min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4.5rem] flex items-center justify-center">
                  <h3 className="font-semibold text-slate-900 text-center text-xs sm:text-sm md:text-sm leading-tight line-clamp-2">
                    {store.name}
                  </h3>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}