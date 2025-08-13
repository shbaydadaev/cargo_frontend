import React, { useState, useEffect } from 'react';
import { Icon, Modal, callGemini, Loader } from './helpers';

const OrderModal = ({ isOpen, onClose }) => {
    const [items, setItems] = useState([{ id: 1, link: '', name: '', price: '', quantity: 1, color: '', size: '', category: 'Category 1*' }]);
    const [total, setTotal] = useState(0);
    const [loadingStates, setLoadingStates] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    
    const steps = ["Purchase", "Declaration", "Payment"];

    useEffect(() => {
        const newTotal = items.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return sum + (price * quantity);
        }, 0);
        setTotal(newTotal);
    }, [items]);

    const handleItemChange = (id, field, value) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const addItem = () => {
        setItems(prevItems => [...prevItems, { id: Date.now(), link: '', name: '', price: '', quantity: 1, color: '', size: '', category: 'Category 1*' }]);
    };

    const removeItem = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleFetchDetails = async (id, link) => {
        if (!link) {
            alert('Please enter a product link first.');
            return;
        }
        setLoadingStates(prev => ({ ...prev, [id]: true }));
        
        const prompt = `Based on this product URL, generate a JSON object with dummy data for the following fields: productName (string), price (number, between 10-200), color (string), size (string, e.g., "Medium", "L", "10"). URL: ${link}. Respond with only the raw JSON object.`;
        const generationConfig = { responseMimeType: "application/json" };

        try {
            const responseText = await callGemini(prompt, generationConfig);
            const productData = JSON.parse(responseText);
            setItems(prevItems => prevItems.map(item => 
                item.id === id ? { ...item, name: productData.productName || '', price: productData.price || '', color: productData.color || '', size: productData.size || '' } : item
            ));
        } catch (error) {
            console.error('Error fetching product details:', error);
            alert('Sorry, we could not fetch the product details. Please fill them in manually.');
        } finally {
            setLoadingStates(prev => ({ ...prev, [id]: false }));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Add order for redemption</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close modal">
                    <Icon path="M6 18L18 6M6 6l12 12" className="w-6 h-6" />
                </button>
            </div>

            <div className="my-6">
                <div className="flex items-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={step}>
                            <div className={`flex items-center relative ${currentStep >= index + 1 ? 'text-blue-600' : 'text-slate-500'}`}>
                                <div className={`rounded-full h-8 w-8 flex items-center justify-center font-bold ${currentStep >= index + 1 ? 'bg-blue-600 text-white' : 'bg-white border-2 border-slate-200'}`}>
                                    {index + 1}
                                </div>
                                <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium uppercase">{step}</div>
                            </div>
                            {index < steps.length - 1 && <div className={`flex-auto border-t-2 ${currentStep > index + 1 ? 'border-blue-600' : 'border-slate-200'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="mt-4 space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                <p className="text-sm text-slate-600">Please let us know what products you would like us to purchase. Orders are processed within 1-2 days.</p>
                {items.map((item) => (
                    <div key={item.id} className="order-item p-4 border border-slate-200 rounded-lg space-y-4 relative">
                        {items.length > 1 && (
                            <button onClick={() => removeItem(item.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center hover:bg-red-600 z-10">&times;</button>
                        )}
                        <div className="flex items-end gap-2">
                            <div className="flex-grow">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Link to the product*</label>
                                <input type="text" placeholder="https://" value={item.link} onChange={e => handleItemChange(item.id, 'link', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" />
                            </div>
                            <button onClick={() => handleFetchDetails(item.id, item.link)} disabled={loadingStates[item.id]} className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                {loadingStates[item.id] ? <Loader size="w-4 h-4" /> : '✨ Fetch Details'}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Product Name*" value={item.name} onChange={e => handleItemChange(item.id, 'name', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" />
                            <input type="number" placeholder="Price per one*" value={item.price} onChange={e => handleItemChange(item.id, 'price', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" />
                            <input type="number" placeholder="Quantity*" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" />
                            <input type="text" placeholder="Color" value={item.color} onChange={e => handleItemChange(item.id, 'color', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" />
                            <input type="text" placeholder="Size" value={item.size} onChange={e => handleItemChange(item.id, 'size', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" />
                            <select value={item.category} onChange={e => handleItemChange(item.id, 'category', e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option>Category 1*</option>
                                <option>Category 2</option>
                                <option>Category 3</option>
                            </select>
                        </div>
                    </div>
                ))}
                <button onClick={addItem} className="w-full mt-2 bg-slate-100 text-blue-600 text-sm font-medium py-2 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center">
                    <Icon path="M12 6v6m0 0v6m0-6h6m-6 0H6" className="w-4 h-4 mr-2" />
                    Add another item
                </button>
                <div className="text-right font-bold text-slate-800" id="orderTotal">Total: ${total.toFixed(2)}</div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
                <button type="button" className="bg-white border border-slate-300 text-slate-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-50" onClick={onClose}>Cancel</button>
                <button type="button" className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700">Continue</button>
            </div>
        </Modal>
    );
};

export default OrderModal;
