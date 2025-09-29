import React, { useState, useEffect } from "react";
import { OnlineStore, Product } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Truck, Shield, Star } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useLanguage } from "../components/i18n/languageProvider";

import StoreGrid from "../components/store/StoreGrid";
import OrderModal from "../components/store/OrderModal";
import CategoryFilter from "../components/store/CategoryFilter";
import FeaturedProducts from "../components/store/FeaturedProducts";
import ProductModal from "../components/store/ProductModal";

export default function Store() {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("marketplaces");
  const { t } = useLanguage();

  useEffect(() => {
    loadData();
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'order') {
        setShowOrderModal(true);
    }
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [storesData, productsData] = await Promise.all([
        OnlineStore.list("name"),
        Product.list("-created_date")
      ]);
      setStores(storesData);
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section - Fully Mobile Responsive */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
                {t('store.title')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 text-blue-100 max-w-2xl mx-auto px-2">
                {t('store.subtitle')}
              </p>
              
              <div className="max-w-2xl mx-auto relative mb-6 sm:mb-8 px-2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder={t('store.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 py-3 sm:py-4 text-base sm:text-lg bg-white/95 backdrop-blur-sm border-0 shadow-lg"
                />
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-blue-100 px-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" /> 
                  {t('store.secure_payment')}
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5" /> 
                  {t('store.fast_shipping')}
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5" /> 
                  {t('store.trusted_service')}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          {/* Quick Order Section - Fully Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8 md:mb-12"
          >
            <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-colors">
              <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-2 px-2">
                  {t('store.request_purchase_title')}
                </h3>
                <p className="text-slate-600 mb-3 sm:mb-4 md:mb-6 text-sm md:text-base px-2">
                  {t('store.request_purchase_subtitle')}
                </p>
                <Button 
                  onClick={() => setShowOrderModal(true)}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base"
                >
                  {t('store.request_purchase_button')}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs - Fully Mobile Responsive */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 gap-3 sm:gap-4">
              <TabsList className="grid w-full lg:w-auto grid-cols-3 h-auto sm:h-10">
                <TabsTrigger value="marketplaces" className="text-xs sm:text-sm px-1 sm:px-2 py-1.5 sm:py-0">
                  <span className="truncate">{t('store.tab_marketplaces')}</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="text-xs sm:text-sm px-1 sm:px-2 py-1.5 sm:py-0">
                  <span className="truncate">{t('store.tab_products')}</span>
                </TabsTrigger>
                <TabsTrigger value="featured" className="text-xs sm:text-sm px-1 sm:px-2 py-1.5 sm:py-0">
                  {t('store.tab_featured')}
                </TabsTrigger>
              </TabsList>
              
              <div className="w-full lg:w-auto overflow-x-auto">
                <CategoryFilter 
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  className="min-w-max"
                />
              </div>
            </div>

            {/* Korean Stores Tab */}
            <TabsContent value="marketplaces" className="space-y-4 sm:space-y-6 md:space-y-8">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {t('store.marketplaces_title')}
                </h2>
                <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  {t('store.marketplaces_subtitle')}
                </p>
              </div>
              
              <StoreGrid
                stores={filteredStores}
                isLoading={isLoading}
                searchQuery={searchQuery}
              />
            </TabsContent>

            {/* Active Store Products Tab */}
            <TabsContent value="products" className="space-y-4 sm:space-y-6 md:space-y-8">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {t('store.products_title')}
                </h2>
                <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  {t('store.products_subtitle')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
                {/* Product cards will be rendered here */}
                {filteredProducts.map((product) => (
                  <div key={product.id} onClick={() => openProductModal(product)}>
                    {/* Product card implementation */}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Featured Tab */}
            <TabsContent value="featured" className="space-y-4 sm:space-y-6 md:space-y-8">
              <FeaturedProducts
                stores={filteredStores.slice(0, 6)}
                products={filteredProducts.slice(0, 12)}
                isLoading={isLoading}
                onProductClick={openProductModal}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}