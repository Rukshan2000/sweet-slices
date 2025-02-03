import React, { useState } from 'react';
import BillForm from '../components/BillForm'; // Import BillForm instead of InvoiceForm
import BillTemplate from '../components/BillTemplate'; // Import BillTemplate instead of InvoiceTemplate

function BillPage() { // Change the component name to BillPage
    const [billData, setBillData] = useState(null); // Change variable name from invoiceData to billData

    const handleGenerateBill = (data) => { // Change function name from handleGenerateInvoice to handleGenerateBill
        setBillData(data); // Change variable name from invoiceData to billData
    };

    return (
        <div className="min-h-screen py-10 bg-white">
            <div className="container mx-auto">
                {!billData ? ( // Change variable name from invoiceData to billData
                    <BillForm onGenerateBill={handleGenerateBill} /> // Change component name from InvoiceForm to BillForm, function name from handleGenerateInvoice to handleGenerateBill
                ) : (
                    <BillTemplate data={billData} /> // Change component name from InvoiceTemplate to BillTemplate, variable name from invoiceData to billData
                )}
            </div>
        </div>
    );
}

export default BillPage;
