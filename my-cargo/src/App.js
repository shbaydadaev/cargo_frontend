import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ParcelsView from './components/ParcelsView';
import AddressesView from './components/AddressesView';
import BillingView from './components/BillingView';
import AccountView from './components/AccountView';
import SupportView from './components/SupportView';
import ParcelModal from './components/ParcelModal';
import OrderModal from './components/OrderModal';
import AddFundsModal from './components/AddFundsModal';
import SmartStatusModal from './components/SmartStatusModal';

export default function App() {
    const [activeView, setActiveView] = useState('dashboard');
    const [isParcelModalOpen, setParcelModalOpen] = useState(false);
    const [isOrderModalOpen, setOrderModalOpen] = useState(false);
    const [isAddFundsModalOpen, setAddFundsModalOpen] = useState(false);
    const [isSmartStatusModalOpen, setSmartStatusModalOpen] = useState(false);
    const [activeParcelData, setActiveParcelData] = useState(null);

    const handleOpenSmartStatusModal = (parcel) => {
        setActiveParcelData(parcel);
        setSmartStatusModalOpen(true);
    };

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardView 
                            onOpenParcelModal={() => setParcelModalOpen(true)}
                            onOpenOrderModal={() => setOrderModalOpen(true)}
                            onOpenSmartStatusModal={handleOpenSmartStatusModal}
                        />;
            case 'parcels': 
                return <ParcelsView onOpenOrderModal={() => setOrderModalOpen(true)} />;
            case 'addresses': return <AddressesView />;
            case 'billing': return <BillingView />;
            case 'account': return <AccountView />;
            case 'support': return <SupportView />;
            default: return <DashboardView 
                                onOpenParcelModal={() => setParcelModalOpen(true)}
                                onOpenOrderModal={() => setOrderModalOpen(true)}
                                onOpenSmartStatusModal={handleOpenSmartStatusModal}
                            />;
        }
    };

    return (
        <div className="bg-slate-50 text-slate-800 font-sans">
            <div className="flex min-h-screen">
                <Sidebar 
                    activeView={activeView} 
                    setActiveView={setActiveView}
                    onOpenAddFunds={() => setAddFundsModalOpen(true)}
                />
                <div className="flex-1 overflow-y-auto">
                    {renderView()}
                </div>
            </div>

            <ParcelModal isOpen={isParcelModalOpen} onClose={() => setParcelModalOpen(false)} />
            <OrderModal isOpen={isOrderModalOpen} onClose={() => setOrderModalOpen(false)} />
            <AddFundsModal isOpen={isAddFundsModalOpen} onClose={() => setAddFundsModalOpen(false)} />
            <SmartStatusModal 
                isOpen={isSmartStatusModalOpen} 
                onClose={() => setSmartStatusModalOpen(false)}
                parcelData={activeParcelData}
            />
        </div>
    );
}
