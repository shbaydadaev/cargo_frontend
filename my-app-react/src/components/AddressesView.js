import {Icon} from './helpers';
const AddressesView = () => (
    <main className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Addresses</h1>
            <button className="mt-4 sm:mt-0 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Icon path="M12 6v6m0 0v6m0-6h6m-6 0H6" className="w-4 h-4 mr-2" />
                Add New Address
            </button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-slate-800">Primary Address</h3>
                        <p className="text-sm text-slate-500">Alex Johnson</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Default</span>
                </div>
                <div className="mt-4 text-sm text-slate-600 space-y-1">
                    <p>123 Maple Street</p>
                    <p>Springfield, IL, 62704</p>
                    <p>United States</p>
                    <p>+1 (555) 123-4567</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                 <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-slate-800">Office Address</h3>
                        <p className="text-sm text-slate-500">Alex Johnson</p>
                    </div>
                </div>
                <div className="mt-4 text-sm text-slate-600 space-y-1">
                    <p>456 Oak Avenue, Suite 200</p>
                    <p>Metropolis, NY, 10001</p>
                    <p>United States</p>
                    <p>+1 (555) 987-6543</p>
                </div>
            </div>
        </div>
    </main>
);

export default AddressesView;
