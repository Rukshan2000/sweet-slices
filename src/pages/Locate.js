import React from 'react';

const GenerateBillButton = () => {
    const handleGenerateBill = () => {
        window.location.href = '/billpage';
    };

    return (
        <button 
            onClick={handleGenerateBill} 
            className="px-6 py-3 text-white transition-all duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Generate Bill
        </button>
    );
};

const GenerateInvoiceButton = () => {
    const handleGenerateInvoice = () => {
        window.location.href = '/invoicepage';
    };

    return (
        <button 
            onClick={handleGenerateInvoice} 
            className="px-6 py-3 text-white transition-all duration-300 bg-yellow-800 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Generate Invoice
        </button>
    );
};

const ButtonContainer = () => {
    return (
        <div className="space-y-4">
            <div className="flex justify-center space-x-6">
                <GenerateInvoiceButton />
            </div>
            <div className="flex justify-center space-x-6">
                <GenerateBillButton />
            </div>
        </div>
    );
};

const Locate = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <h1 className="mb-8 text-4xl font-extrabold text-white">Select an Action</h1>
            <ButtonContainer />
        </div>
    );
};

export default Locate;
