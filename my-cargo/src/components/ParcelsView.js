import { useState } from 'react';
import { Icon } from './helpers';
const ParcelsView = ({ onOpenOrderModal }) => {
    const [activeTab, setActiveTab] = useState('parcels');

    return (
        <main className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Parcels</h1>
                    <p className="mt-1 text-sm text-slate-500">Home / <span className="text-blue-600">Parcels</span></p>
                </div>
                <div className="mt-4 sm:mt-0">
                     <button onClick={onOpenOrderModal} className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        <Icon path="M12 6v6m0 0v6m0-6h6m-6 0H6" className="w-4 h-4 mr-2" />
                        New Order
                    </button>
                </div>
            </div>

            <div className="mt-8 border-b border-slate-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('parcels')}} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'parcels' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Parcels</a>
                    <a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('orderByCargo')}} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'orderByCargo' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Order by Active Cargo</a>
                    <a href="#" onClick={(e) => {e.preventDefault(); setActiveTab('declaration')}} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'declaration' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Fill out the declaration</a>
                </nav>
            </div>

            <div className="mt-6 flex items-center gap-2 flex-wrap">
                <button className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50">Process <span className="ml-1.5 bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">0</span></button>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50">Bought <span className="ml-1.5 bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">0</span></button>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50">Verified <span className="ml-1.5 bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">0</span></button>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50">Accepted <span className="ml-1.5 bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">0</span></button>
            </div>

            <div className="mt-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    <Icon path="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-slate-900">Not found order</h3>
                <p className="mt-1 text-sm text-slate-500">You have no orders with this status.</p>
            </div>
        </main>
    );
};
export default ParcelsView;
