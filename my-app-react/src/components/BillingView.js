const BillingView = () => (
    <main className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Billing</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Payment Methods</h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Add Card</button>
                    </div>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <img src="https://placehold.co/40x24/2563eb/ffffff?text=VISA" alt="Visa" className="h-6"/>
                                <div>
                                    <p className="font-medium">Visa ending in 1234</p>
                                    <p className="text-sm text-slate-500">Expires 06/2028</p>
                                </div>
                            </div>
                            <button className="text-sm text-red-500 hover:text-red-700">Remove</button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <img src="https://placehold.co/40x24/1f2937/ffffff?text=MC" alt="Mastercard" className="h-6"/>
                                <div>
                                    <p className="font-medium">Mastercard ending in 5678</p>
                                    <p className="text-sm text-slate-500">Expires 08/2026</p>
                                </div>
                            </div>
                            <button className="text-sm text-red-500 hover:text-red-700">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold">Transaction History</h3>
                    <ul className="mt-4 space-y-4">
                        <li className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Parcel Fee - CF-84610357</p>
                                <p className="text-sm text-slate-500">Aug 12, 2025</p>
                            </div>
                            <p className="font-medium text-green-600">-$25.00</p>
                        </li>
                        <li className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Funds Added</p>
                                <p className="text-sm text-slate-500">Aug 10, 2025</p>
                            </div>
                            <p className="font-medium text-slate-800">+$100.00</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
);

export default BillingView;
