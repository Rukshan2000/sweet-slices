import React, { useState } from 'react';

function InvoiceForm({ onGenerateInvoice }) {
    const [formState, setFormState] = useState({
        invoiceNumber: '',
        clientName: '',
        clientContact: '',
        date: '',
        currency: 'LKR',
        items: [{ service: '', description: '', amount: '', total: '' }],
        discount: '',
        advance: '',
        redNote: '',
        signatureImage: null,
    });

    const [lightMode, setLightMode] = useState(false); // State to manage light mode

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormState({ ...formState, [name]: files[0] });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...formState.items];
        items[index] = { ...items[index], [name]: value };

        const amount = parseFloat(items[index].amount || 0);

        if (!isNaN(amount)) {
            items[index].total = amount.toFixed(2);
        } else {
            items[index].total = '';
        }

        setFormState({ ...formState, items });
    };

    const addItem = () => {
        setFormState({
            ...formState,
            items: [...formState.items, { service: '', description: '', amount: '', total: '' }]
        });
    };

    const removeItem = (index) => {
        const items = [...formState.items];
        items.splice(index, 1);
        setFormState({ ...formState, items });
    };

    const calculateTotal = () => {
        const subTotal = formState.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        return subTotal.toFixed(2);
    };

    const calculateDiscountedTotal = () => {
        const subTotal = calculateTotal();
        const discountAmount = (subTotal * parseFloat(formState.discount || 0)) / 100;
        return (subTotal - discountAmount).toFixed(2);
    };

    const calculateTotalDue = () => {
        const discountedTotal = calculateDiscountedTotal();
        const advance = parseFloat(formState.advance || 0);
        return (discountedTotal - advance).toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const totalAmount = calculateTotal();
        const discountedTotal = calculateDiscountedTotal();
        const totalDue = calculateTotalDue();
        onGenerateInvoice({ ...formState, totalAmount, discountedTotal, totalDue });
    };

    // Function to toggle light mode
    const toggleLightMode = () => {
        setLightMode(!lightMode);
    };

    return (
        <form className={`p-6 ${lightMode ? 'bg-white text-gray-800' : 'text-white bg-gray-800'} rounded shadow-md`} onSubmit={handleSubmit} style={{ boxShadow: '0 4px 6px -1px rgba(255, 215, 0, 0.5), 0 2px 4px -1px rgba(255, 215, 0, 0.06)' }}>
            <h2 className="mb-4 text-2xl font-bold">Invoice Form</h2>
            <div className="grid gap-4 mb-4 sm:grid-cols-1 lg:grid-cols-2">
                <div>
                    <label className="block mb-2 font-bold">Invoice Number</label>
                    <input type="text" name="invoiceNumber" value={formState.invoiceNumber} onChange={handleChange}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Client Name</label>
                    <input type="text" name="clientName" value={formState.clientName} onChange={handleChange}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Client Contact</label>
                    <input type="text" name="clientContact" value={formState.clientContact} onChange={handleChange}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Date</label>
                    <input type="date" name="date" value={formState.date} onChange={handleChange}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Currency</label>
                    <select name="currency" value={formState.currency} onChange={handleChange}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}>
                        <option value="LKR">LKR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="AUD">AUD</option>
                        <option value="CAD">CAD</option>
                        <option value="CHF">CHF</option>
                        <option value="CNY">CNY</option>
                        <option value="INR">INR</option>
                        <option value="RUB">RUB</option>
                    </select>
                </div>
            </div>
            <h3 className="mb-2 text-xl font-bold">Items</h3>
            {formState.items.map((item, index) => (
                <div key={index} className="grid gap-4 mb-4 sm:grid-cols-1 lg:grid-cols-5">
                    <input type="text" name="service" placeholder="Service" value={item.service} onChange={(e) => handleItemChange(index, e)}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                    <input type="text" name="description" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, e)}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                    <input type="number" name="amount" placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, e)}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                    <input type="number" name="total" placeholder="Total" value={item.total} readOnly
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                    <button type="button" onClick={() => removeItem(index)} className="px-4 py-2 text-white bg-red-500 rounded">Remove</button>
                </div>
            ))}
            <button type="button" onClick={addItem} className="px-4 py-2 mb-4 text-white bg-blue-500 rounded">Add New Service</button>
            <div className="grid gap-4 mb-4 sm:grid-cols-1 lg:grid-cols-2">
                <div>
                    <label className="block mb-2 font-bold">Discount percentage (%)</label>
                    <input type="number" name="discount" value={formState.discount} onChange={handleChange}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Advance</label>
                    <input type="number" name="advance" value={formState.advance} onChange={handleChange}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                </div>
                <div className="lg:col-span-2">
                    <label className="block mb-2 font-bold">Red Note</label>
                    <input type="text" placeholder='optional' name="redNote" value={formState.redNote} onChange={handleChange}
                        className={`w-full p-2 ${lightMode ? 'text-black bg-gray-100 border-gray-400' : 'text-white bg-gray-700 border-gray-600'} border`}
                    />
                </div>
            </div>
            {/* Light mode switch */}
            <div className="flex justify-end mb-4">
                <label htmlFor="lightModeToggle" className="flex items-center cursor-pointer">
                    <span className="mr-2">Light Mode</span>
                    <input type="checkbox" id="lightModeToggle" checked={lightMode} onChange={toggleLightMode} className="w-5 h-5 text-blue-600 form-checkbox" />
                </label>
            </div>
            <button type="submit" className="px-4 py-2 mb-4 text-white bg-green-500 rounded">Generate Invoice</button>
        </form>
    );
}

export default InvoiceForm;
