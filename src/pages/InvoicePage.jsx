import React, { useState } from 'react';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceTemplate from '../components/InvoiceTemplate';

function InvoicePage() {
    const [invoiceData, setInvoiceData] = useState(null);

    const handleGenerateInvoice = (data) => {
        setInvoiceData(data);
    };

    return (
        <div className="min-h-screen py-10 bg-white">
            <div className="container mx-auto">
                {!invoiceData ? (
                    <InvoiceForm onGenerateInvoice={handleGenerateInvoice} />
                ) : (
                    <InvoiceTemplate data={invoiceData} />
                )}
            </div>
        </div>
    );
}

export default InvoicePage;

