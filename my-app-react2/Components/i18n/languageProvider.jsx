
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const translations = {
  en: {
    "sidebar": {
      "dashboard": "Dashboard",
      "my_parcels": "My Parcels",
      "online_store": "Online Store",
      "addresses": "Addresses",
      "billing": "Billing",
      "account": "Account",
      "support": "Support",
      "balance": "Account Balance",
      "add_funds": "Add Funds"
    },
    "dashboard": {
      "welcome": "Welcome back",
      "overview": "Here's an overview of your shipments and orders"
    },
    "store": {
      "title": "Shop The Best of Korea",
      "subtitle": "Browse popular Korean stores and our curated selection of trending K-products.",
      "search_placeholder": "Search for stores, products, or brands...",
      "secure_payment": "Secure Payment",
      "fast_shipping": "Fast Shipping",
      "trusted_service": "Trusted Service",
      "request_purchase_title": "Can't find what you're looking for?",
      "request_purchase_subtitle": "Send us any product link from any Korean store, and we'll purchase it for you.",
      "request_purchase_button": "Request a Purchase",
      "tab_marketplaces": "Korean Stores",
      "tab_products": "Active Store", // Changed from "Active Cargo Products"
      "tab_featured": "Featured",
      "marketplaces_title": "Popular Korean Marketplaces",
      "marketplaces_subtitle": "Shop directly from Korea's top online retailers",
      "products_title": "Active Store Products", // Changed from "Active Cargo Curated Products"
      "products_subtitle": "Handpicked popular items ready to ship",
      "featured_collection_title": "Featured Collection",
      "featured_collection_subtitle": "Top stores and trending products",
      "top_stores_heading": "Top Korean Stores",
      "trending_products_heading": "Trending K-Products"
    },
    "order_modal": {
      "title": "Let Us Order For You",
      "subtitle": "Fill out the form below and we'll purchase the items on your behalf.",
      "submit_button": "Send Purchase Request",
      "submitting_button": "Sending Request...",
      "success_title": "Request Sent!",
      "success_message": "Our team will review your request and send a confirmation with the final quote to your email for approval. You can track the status in the 'Recent Orders' section on your dashboard.",
      "close_button": "Close"
    }
  },
  ru: {
    "sidebar": {
      "dashboard": "Панель управления",
      "my_parcels": "Мои посылки",
      "online_store": "Интернет-магазин",
      "addresses": "Адреса",
      "billing": "Оплата",
      "account": "Аккаунт",
      "support": "Поддержка",
      "balance": "Баланс счета",
      "add_funds": "Пополнить"
    },
    "dashboard": {
      "welcome": "С возвращением",
      "overview": "Вот обзор ваших отправлений и заказов"
    },
    "store": {
      "title": "Покупайте лучшее из Кореи",
      "subtitle": "Просмотрите популярные корейские магазины и наш выбор трендовых K-продуктов.",
      "search_placeholder": "Искать магазины, товары или бренды...",
      "secure_payment": "Безопасная оплата",
      "fast_shipping": "Быстрая доставка",
      "trusted_service": "Надежный сервис",
      "request_purchase_title": "Не можете найти то, что ищете?",
      "request_purchase_subtitle": "Отправьте нам ссылку на любой товар из любого корейского магазина, и мы купим его для вас.",
      "request_purchase_button": "Запросить покупку",
      "tab_marketplaces": "Корейские магазины",
      "tab_products": "Active Store", // Changed from "Продукты Active Cargo"
      "tab_featured": "Рекомендуемые",
      "marketplaces_title": "Популярные корейские маркетплейсы",
      "marketplaces_subtitle": "Покупайте напрямую в лучших онлайн-магазинах Кореи",
      "products_title": "Продукты Active Store", // Changed from "Отобранные продукты Active Cargo"
      "products_subtitle": "Популярные товары, готовые к отправке",
      "featured_collection_title": "Избранная коллекция",
      "featured_collection_subtitle": "Топ магазины и популярные продукты",
      "top_stores_heading": "Топ корейские магазины",
      "trending_products_heading": "Популярные K-продукты"
    },
    "order_modal": {
      "title": "Позвольте нам заказать для вас",
      "subtitle": "Заполните форму ниже, и мы приобретем товары от вашего имени.",
      "submit_button": "Отправить запрос на покупку",
      "submitting_button": "Отправка запроса...",
      "success_title": "Запрос отправлен!",
      "success_message": "Наша команда рассмотрит ваш запрос и отправит подтверждение с окончательной стоимостью на вашу электронную почту для утверждения. Вы можете отслеживать статус в разделе «Последние заказы» на вашей панели управления.",
      "close_button": "Закрыть"
    }
  },
  uz: {
    "sidebar": {
      "dashboard": "Boshqaruv paneli",
      "my_parcels": "Mening jo'natmalarim",
      "online_store": "Onlayn-do'kon",
      "addresses": "Manzillar",
      "billing": "To'lov",
      "account": "Hisob",
      "support": "Qo'llab-quvvatlash",
      "balance": "Hisob balansi",
      "add_funds": "To'ldirish"
    },
    "dashboard": {
      "welcome": "Xush kelibsiz",
      "overview": "Bu yerda sizning jo'natmalaringiz va buyurtmalaringiz haqida umumiy ma'lumot"
    },
    "store": {
      "title": "Koreyadan eng yaxshilarini xarid qiling",
      "subtitle": "Mashhur Koreya do'konlarini va bizning tanlangan K-mahsulotlarimizni ko'rib chiqing.",
      "search_placeholder": "Do'konlar, mahsulotlar yoki brendlarni qidirish...",
      "secure_payment": "Xavfsiz to'lov",
      "fast_shipping": "Tez yetkazib berish",
      "trusted_service": "Ishonchli xizmat",
      "request_purchase_title": "Qidirayotganingizni topa olmayapsizmi?",
      "request_purchase_subtitle": "Bizga istalgan Koreya do'konidan mahsulot havolasini yuboring va biz uni siz uchun sotib olamiz.",
      "request_purchase_button": "Xarid so'rovini yuborish",
      "tab_marketplaces": "Koreya do'konlari",
      "tab_products": "Active Store", // Changed from "Active Cargo mahsulotlari"
      "tab_featured": "Tavsiya etilgan",
      "marketplaces_title": "Mashhur Koreya marketpleyslar",
      "marketplaces_subtitle": "Koreyaning eng yaxshi onlayn-do'konlaridan to'g'ridan-to'g'ri xarid qiling",
      "products_title": "Active Store mahsulotlari", // Changed from "Active Cargo tanlangan mahsulotlar"
      "products_subtitle": "Jo'natishga tayyor mashhur mahsulotlar",
      "featured_collection_title": "Maxsus to'plam",
      "featured_collection_subtitle": "Top do'konlar va mashhur mahsulotlar",
      "top_stores_heading": "Top Koreya do'konlari",
      "trending_products_heading": "Mashhur K-mahsulotlar"
    },
    "order_modal": {
      "title": "Siz uchun biz buyurtma beramiz",
      "subtitle": "Quyidagi shaklni to'ldiring va biz sizning nomingizdan mahsulotlarni sotib olamiz.",
      "submit_button": "Xarid so'rovini yuborish",
      "submitting_button": "So'rov yuborilmoqda...",
      "success_title": "So'rov yuborildi!",
      "success_message": "Jamoamiz sizning so'rovingizni ko'rib chiqadi va tasdiqlash uchun yakuniy narx bilan elektron pochtangizga tasdiqnoma yuboradi. Statusni boshqaruv panelidagi 'So'nggi buyurtmalar' bo'limida kuzatib borishingiz mumkin.",
      "close_button": "Yopish"
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('active_cargo_language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Fall back to browser language
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        setLanguage(browserLang);
        localStorage.setItem('active_cargo_language', browserLang);
      }
    }
  }, []);

  const changeLanguage = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('active_cargo_language', newLanguage);
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (!result) {
        // Fallback to English if translation is missing
        let fallbackResult = translations.en;
        for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
        }
        return fallbackResult || key;
      }
    }
    return result || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, availableLanguages: Object.keys(translations) }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
