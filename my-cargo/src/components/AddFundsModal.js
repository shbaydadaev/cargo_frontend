import {Modal, Icon} from './helpers';
const AddFundsModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Add Funds to Balance</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close modal">
                    <Icon path="M6 18L18 6M6 6l12 12" className="w-6 h-6" />
                </button>
            </div>
            <form className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Amount</label>
                    <input type="number" placeholder="Enter amount" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Payment Method</label>
                    <select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm">
                        <option>Visa ending in 1234</option>
                        <option>Mastercard ending in 5678</option>
                    </select>
                </div>
            </form>
             <div className="mt-6 flex justify-end">
                <button type="button" className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700">Add to Balance</button>
            </div>
        </Modal>
    );
};

export default AddFundsModal;
