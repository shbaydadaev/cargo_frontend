import { useState } from 'react';
import { Icon } from './helpers';
const DashboardView = ({ onOpenParcelModal, onOpenOrderModal, onOpenSmartStatusModal }) => {
    const [activeTab, setActiveTab] = useState('all');
    const tabs = ['all', 'warehouse', 'sent', 'delivered'];

    return (
         <main className="main-view p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Welcome back, Yusuf!</h1>
                    <p className="mt-1 text-slate-500">Here's a list of your parcels for tracking.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                     <button onClick={onOpenOrderModal} className="bg-white border border-slate-300 text-slate-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors flex items-center">
                        <Icon path="M12 6v6m0 0v6m0-6h6m-6 0H6" className="w-4 h-4 mr-2" />
                        Create Order
                    </button>
                    <button onClick={onOpenParcelModal} className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        <Icon path="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" className="w-4 h-4 mr-2" />
                        Create Parcel
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative flex-1">
                        <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-5 h-5 text-slate-400 absolute top-1/2 -translate-y-1/2 left-3" />
                        <input type="text" placeholder="Search by tracking number, name, or destination..." className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                    </div>
                    <div className="flex border border-slate-200 bg-white p-1 rounded-lg">
                        {tabs.map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 capitalize ${activeTab === tab ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                {tab === 'warehouse' ? 'In Warehouse' : tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-white border border-slate-200 rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">Tracking ID</th>
                            <th scope="col" className="px-6 py-3">Parcel's name</th>
                            <th scope="col" className="px-6 py-3">From</th>
                            <th scope="col" className="px-6 py-3">To</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            {id: 'CF-84610357', parcelname: 'Electronics', from: 'Seoul, KR', to: 'Tashkent, Uzb', date: 'Aug 12, 2025', status: 'Delivered', statusColor: 'green'},
                            {id: 'CF-19374628', parcelname: 'Clothes', from: 'Beijing, China', to: 'Tashkent, Uzb', date: 'Aug 10, 2025', status: 'Sent', statusColor: 'blue'},
                            {id: 'CF-55820194', parcelname: 'Books', from: 'Istanbul, Turkey', to: 'Tashkent, Uzb', date: 'Aug 08, 2025', status: 'In Warehouse', statusColor: 'orange'}
                        ].map(parcel => (
                            <tr key={parcel.id} className="bg-white border-b border-slate-200 hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-900">{parcel.id}</td>
                                <td className="px-6 py-4">{parcel.parcelname}</td>
                                <td className="px-6 py-4">{parcel.from}</td>
                                <td className="px-6 py-4">{parcel.to}</td>
                                <td className="px-6 py-4">{parcel.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${parcel.statusColor}-100 text-${parcel.statusColor}-800`}>{parcel.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => onOpenSmartStatusModal(parcel)} className="text-slate-500 hover:text-blue-600" aria-label={`Get Smart Status for ${parcel.id}`}>
                                        <Icon path="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" className="w-5 h-5"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};
export default DashboardView;
