import { useState} from 'react';
import {Modal, Icon} from './helpers';

const ParcelModal = ({ isOpen, onClose }) => {
    const [items, setItems] = useState([{ id: 1, name: '', category: 'Electronics', quantity: 1, price: '' }]);

    const handleItemChange = (id, field, value) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const addItem = () => {
        setItems(prevItems => [...prevItems, { id: Date.now(), name: '', category: 'Electronics', quantity: 1, price: '' }]);
    };

    const removeItem = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Create New Parcel</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close modal">
                    <Icon path="M6 18L18 6M6 6l12 12" className="w-6 h-6" />
                </button>
            </div>
            <form className="mt-4 space-y-4">
                <div>
                    <label htmlFor="trackingNumber" className="block text-sm font-medium text-slate-700">Tracking Number</label>
                    <input type="text" id="trackingNumber" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter tracking number" />
                </div>
                <div>
                    <label htmlFor="storeName" className="block text-sm font-medium text-slate-700">Shop / Store Name</label>
                    <input type="text" id="storeName" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Amazon, eBay" />
                </div>
                
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                    {items.map((item, index) => (
                        <div key={item.id} className="p-4 border border-slate-200 rounded-lg space-y-4 relative">
                            {items.length > 1 && (
                                <button type="button" onClick={() => removeItem(item.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center hover:bg-red-600 z-10">&times;</button>
                            )}
                            <p className="font-medium text-sm text-slate-600">Item {index + 1}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={`productName-${item.id}`} className="block text-sm font-medium text-slate-700">Product Name</label>
                                    <input type="text" id={`productName-${item.id}`} value={item.name} onChange={e => handleItemChange(item.id, 'name', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" placeholder="e.g., T-shirt" />
                                </div>
                                <div>
                                    <label htmlFor={`category-${item.id}`} className="block text-sm font-medium text-slate-700">Category</label>
                                    <select id={`category-${item.id}`} value={item.category} onChange={e => handleItemChange(item.id, 'category', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm">
                                        <option>Electronics</option>
                                        <option>Clothing</option>
                                        <option>Books</option>
                                        <option>Home Goods</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor={`quantity-${item.id}`} className="block text-sm font-medium text-slate-700">Quantity</label>
                                    <input type="number" id={`quantity-${item.id}`} value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" />
                                </div>
                                <div>
                                    <label htmlFor={`price-${item.id}`} className="block text-sm font-medium text-slate-700">Price (USD)</label>
                                    <input type="number" id={`price-${item.id}`} value={item.price} onChange={e => handleItemChange(item.id, 'price', e.target.value)} placeholder="e.g., 25.99" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <button type="button" onClick={addItem} className="w-full mt-2 bg-slate-100 text-blue-600 text-sm font-medium py-2 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                    <Icon path="M12 6v6m0 0v6m0-6h6m-6 0H6" className="w-4 h-4 mr-2" />
                    Add another item
                </button>

                <div>
                    <label htmlFor="parcelDescription" className="block text-sm font-medium text-slate-700">Description (Optional)</label>
                    <textarea id="parcelDescription" rows="3" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Briefly describe all contents"></textarea>
                </div>
            </form>
             <div className="mt-6 flex justify-end space-x-3">
                <button type="button" className="bg-white border border-slate-300 text-slate-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-50" onClick={onClose}>Cancel</button>
                <button type="button" className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700">Add Parcel</button>
            </div>
        </Modal>
    );
};
export default ParcelModal;