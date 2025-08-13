// --- Main Application Components ---
import {Icon} from './helpers';
const Sidebar = ({ activeView, setActiveView, onOpenAddFunds }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { id: 'parcels', label: 'My Parcels', icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4", badge: 12 },
        { id: 'addresses', label: 'Addresses', icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
        { id: 'billing', label: 'Billing', icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
        { id: 'account', label: 'Account', icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
        { id: 'support', label: 'Support', icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden lg:flex">
            <div className="p-6 text-2xl font-bold text-blue-600">ActiveCargo</div>
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map(item => (
                    <a
                        key={item.id}
                        href="#"
                        onClick={(e) => { e.preventDefault(); setActiveView(item.id); }}
                        className={`sidebar-link flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                            activeView === item.id
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        <Icon path={item.icon} className="w-5 h-5 mr-3" />
                        {item.label}
                        {item.badge && <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">{item.badge}</span>}
                    </a>
                ))}
            </nav>
            <div className="p-4 mt-auto">
                <div className="p-4 bg-slate-100 rounded-lg text-center">
                    <h4 className="font-semibold text-slate-800">Balance</h4>
                    <p className="text-2xl font-bold text-blue-600 mt-1">$256.32</p>
                    <button 
                        onClick={onOpenAddFunds}
                        className="w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add Funds
                    </button>
                </div>
            </div>
        </aside>
    );
};
export default Sidebar;
