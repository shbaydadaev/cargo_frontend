import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Package, 
  LayoutDashboard, 
  MapPin, 
  CreditCard, 
  User, 
  HelpCircle,
  Store,
  Wallet
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { User as UserEntity } from "@/entities/User";
import { LanguageProvider, useLanguage } from "./components/i18n/languageProvider";
import AddFundsModal from "./components/billing/AddFundsModal";
import LanguageSwitcher from "./components/LanguageSwitcher";

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navigationItems = [
    { title: t("sidebar.dashboard"), url: createPageUrl("Dashboard"), icon: LayoutDashboard },
    { title: t("sidebar.my_parcels"), url: createPageUrl("Parcels"), icon: Package },
    { title: t("sidebar.online_store"), url: createPageUrl("Store"), icon: Store },
    { title: t("sidebar.addresses"), url: createPageUrl("Addresses"), icon: MapPin },
    { title: t("sidebar.billing"), url: createPageUrl("Billing"), icon: CreditCard },
    { title: t("sidebar.account"), url: createPageUrl("Account"), icon: User },
    { title: t("sidebar.support"), url: createPageUrl("Support"), icon: HelpCircle }
  ];

  return (
    <SidebarMenu>
      {navigationItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            asChild 
            className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-2 ${
              location.pathname === item.url ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white shadow-lg' : ''
            }`}
          >
            <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

const LayoutComponent = ({ children }) => {
  const { t } = useLanguage();
  const [user, setUser] = React.useState(null);
  const [balance, setBalance] = React.useState(0);
  const [isAddFundsOpen, setIsAddFundsOpen] = React.useState(false);

  const loadUser = React.useCallback(async () => {
    try {
      const userData = await UserEntity.me();
      setUser(userData);
      setBalance(userData.balance || 0);
    } catch (error) {
      console.log("User not authenticated");
    }
  }, []);

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleFundsAdded = () => {
    setIsAddFundsOpen(false);
    loadUser(); // Refresh user data to show new balance
  };

  return (
    <>
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
        <Sidebar className="border-r border-slate-200 bg-white/95 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-slate-900">Active Cargo</h2>
                <p className="text-xs text-slate-500">Global Logistics Platform</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <Navigation />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            <div className="mb-4">
              <LanguageSwitcher />
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">{t('sidebar.balance')}</h4>
                <Wallet className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-3">${balance.toFixed(2)}</p>
              <Button 
                size="sm" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={() => setIsAddFundsOpen(true)}
              >
                {t('sidebar.add_funds')}
              </Button>
            </div>
            
            {user && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                  <span className="text-slate-600 font-medium text-sm">
                    {user.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm truncate">
                    {user.full_name || 'User'}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4 md:hidden sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-slate-900">Active Cargo</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
    <AddFundsModal isOpen={isAddFundsOpen} onClose={() => setIsAddFundsOpen(false)} onSuccess={handleFundsAdded} />
    </>
  );
};

export default function Layout({ children }) {
  return (
    <LanguageProvider>
      <LayoutComponent>{children}</LayoutComponent>
    </LanguageProvider>
  );
}