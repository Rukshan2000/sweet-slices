import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import Logo from "../assets/logo.jpg";
import Sign from "../assets/sign.jpg";
import Qr from "../assets/qrcode.png";

function InvoiceTemplate({ data }) {
    const invoiceRef = useRef();

    const calculateBalanceDue = () => {
        const total = data.items.reduce((sum, item) => sum + parseFloat(item.total), 0);
        const balanceDue = total - parseFloat(data.discount || 0) - parseFloat(data.advance || 0);
        return balanceDue.toFixed(2);
    };

    const cleanFileName = (name) => {
        return name.replace(/\s+/g, '_').replace(/[^\w_-]+/g, '');
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const invoiceElement = invoiceRef.current;

        doc.html(invoiceElement, {
            callback: function (doc) {
                doc.save(`invoice-${cleanFileName(data.clientName)}-${cleanFileName(data.invoiceNumber)}.pdf`);
            },
            x: 10,
            y: 10,
            width: 190, // Maximum width of the content
            windowWidth: 720 // Window width for rendering the HTML content
        });
    };

    return (
        <div>
            <style>
                {`
                    @media print {
                        .invoice-container {
                            width: 100%;
                            max-width: 210mm; /* A4 paper width */
                            margin: auto;
                            padding: 10px;
                            font-size: 16px; /* Increase overall font size */
                        }
                        .invoice-title {
                            font-size: 24px; /* Larger title */
                        }
                        .customer-details, .total-due, .bank-details, .signature-section {
                            font-size: 18px; /* Larger customer details, totals, etc. */
                        }
                        .table-header, .table-data {
                            font-size: 16px; /* Larger table content */
                        }
                        .no-break-inside {
                            page-break-inside: avoid;
                        }
                        .no-break-row {
                            page-break-inside: avoid;
                        }
                    }
                `}
            </style>
            <div ref={invoiceRef} className="max-w-4xl p-4 mx-auto bg-white rounded-lg invoice-container">
                <div className="flex items-center justify-between mb-2">
                    <img src={Logo} alt="Logo" className="h-20" />
                    <div>
                        <p className="text-sm">INVOICE NO: #{data.invoiceNumber}</p>
                        <p className="text-sm text-gray-700">Date: {data.date}</p>
                    </div>
                </div>
                <div className="pb-2 mb-2 text-center border-b">
                    <div className="text-xl font-bold invoice-title" style={{ fontFamily: 'Roboto Slab, serif' }}>Sweet Slices</div>
                    <div className="mt-1 text-sm">Backed With Love</div>
                </div>
                <div className="mb-4 customer-details">
                    <h3 className="text-sm font-bold">Customer Details</h3>
                    <p className="mt-1 text-sm text-gray-700">Client Name: {data.clientName}</p>
                    <p className="text-sm text-gray-700">Contact No: {data.clientContact}</p>
                </div>
                <table className="w-full mb-4 border-collapse">
                    <thead>
                        <tr className="table-header">
                            <th className="px-1 py-1 text-left bg-gray-200 border">No</th>
                            <th className="px-2 py-1 text-left bg-gray-200 border">Service</th>
                            <th className="px-2 py-1 text-left bg-gray-200 border">Description</th>
                            <th className="px-1 py-1 text-right bg-gray-200 border">Amount ({data.currency})</th>
                        </tr>
                    </thead>
                    <tbody className="table-data">
                        {data.items.map((item, index) => (
                            <tr key={index} className="no-break-row">
                                <td className="px-1 py-1 border">{index + 1}</td>
                                <td className="px-2 py-1 border">{item.service}</td>
                                <td className="px-2 py-1 border">{item.description}</td>
                                <td className="px-1 py-1 text-right border">{item.total} {data.currency}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" className="px-2 py-1 font-semibold text-right">Total</td>
                            <td className="px-2 py-1 text-right">{data.totalAmount || 0} {data.currency}</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="px-2 py-1 font-semibold text-right">Advance</td>
                            <td className="px-2 py-1 text-right">{data.advance || 0} {data.currency}</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="px-2 py-1 font-semibold text-right">Discount</td>
                            <td className="px-2 py-1 text-right">{data.discount || 0} %</td>
                        </tr>
                        <tr className="total-due">
                            <td colSpan="3" className="px-2 py-1 font-bold text-right">Total Due</td>
                            <td className="px-2 py-1 font-bold text-right">{calculateBalanceDue()} {data.currency}</td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-sm text-red-500">{data.redNote}</p>

                <div className="flex justify-between mt-40 bank-details">
                    <div>
                        <p className="text-sm font-semibold">
                            Please Kindly Deposit / Transfer Your Payment Into The <br />
                            Following Bank Account
                        </p>
                        <p className="mt-2 text-sm"><b>Bank</b>: Hatton national bank</p>
                        <p className="text-sm"><b>Name</b>: Ayesha Hasini</p>
                        <p className="text-sm"><b>Acc No</b>: 055020320139</p>
                        <p className="text-sm"><b>Branch</b>: Borella</p>
                    </div>
                    <div className="signature-section">
                        <img src={Sign} alt="Sign" className="h-12" />
                        <p>''''''''''''''''''''''''''''''''''''''</p>
                        <h3 className="text-sm font-bold">Authorised Sign</h3>
                        <p className="text-sm text-gray-700">Ayesha Hasini</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-10 border-t">
                    <img src={Qr} alt="Qr" className="h-10" />
                    <div>
                        <p className="text-sm text-gray-700"><b>Contact</b>: +94 75 717 5663</p>
                        <p className="text-sm text-gray-700"><b>Email</b>: ayeshaweerathunga76@gmil.com</p>
                    </div>
                </div>
            </div>
            <button onClick={handleDownloadPDF} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded">Download Invoice</button>
        </div>
    );
}

export default InvoiceTemplate;
