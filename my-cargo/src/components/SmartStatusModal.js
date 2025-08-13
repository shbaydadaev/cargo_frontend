import { useState, useCallback, useEffect } from "react";
import { Icon, Modal, callGemini, Loader } from './helpers';

const SmartStatusModal = ({ isOpen, onClose, parcelData }) => {
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSmartStatus = useCallback(async () => {
        if (!parcelData) return;
        setIsLoading(true);
        setError(null);
        setStatus('');
        const prompt = `Generate a friendly, one-sentence status update for a parcel with the following details: Tracking ID: ${parcelData.id}, From: ${parcelData.from}, To: ${parcelData.to}, Current Status: "${parcelData.status}". Make it sound like a helpful assistant providing a more detailed, imaginative update.`;
        try {
            const smartUpdateText = await callGemini(prompt);
            setStatus(smartUpdateText);
        } catch (err) {
            setError('Sorry, we could not fetch the smart status. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [parcelData]);

    useEffect(() => {
        if (isOpen) {
            fetchSmartStatus();
        }
    }, [isOpen, fetchSmartStatus]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
             <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">✨ Smart Status Update</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close modal">
                    <Icon path="M6 18L18 6M6 6l12 12" className="w-6 h-6" />
                </button>
            </div>
            <div className="mt-4 text-slate-600 min-h-[6rem] flex items-center justify-center">
                {isLoading && <Loader />}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!isLoading && !error && <p>{status}</p>}
            </div>
            <div className="mt-6 flex justify-end">
                <button type="button" className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700" onClick={onClose}>Close</button>
            </div>
        </Modal>
    );
};
export default SmartStatusModal;
