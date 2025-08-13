import { useState } from 'react';
import {Icon} from './helpers';

const SupportView = () => {
    const FAQItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <details className="group" open={isOpen} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-slate-900">
                    {question}
                    <Icon path="M19 9l-7 7-7-7" className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </summary>
                <p className="mt-2 text-sm text-slate-600">{answer}</p>
            </details>
        )
    }

    return (
        <main className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Support</h1>
             <div className="mt-8 grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold">Contact Us</h3>
                        <p className="text-sm text-slate-500 mt-1">Our team will get back to you within 24 hours.</p>
                        <form className="mt-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Subject</label>
                                <input type="text" placeholder="e.g., Issue with parcel CF-12345" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Message</label>
                                <textarea rows="5" placeholder="Please describe your issue in detail..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                            </div>
                            <div className="pt-2">
                                <button type="submit" className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
                        <div className="mt-4 space-y-3">
                            <FAQItem 
                                question="How do I track my parcel?"
                                answer="You can track your parcel from the main Dashboard or the 'My Parcels' section using the provided tracking ID."
                            />
                            <FAQItem 
                                question="What are the shipping costs?"
                                answer="Shipping costs are calculated based on weight, dimensions, and destination. You will see the final cost at checkout."
                            />
                        </div>
                    </div>
                </div>
             </div>
        </main>
    )
};
export default SupportView;
