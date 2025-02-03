import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Logo from "../assets/logo.jpg";
import Sign from "../assets/sign.jpg";
import Paid from "../assets/paid.jpeg";
import Qr from "../assets/qrcode.png";

function BillTemplate({ data }) {
    const billRef = useRef();

    const calculateBalanceDue = () => {
        const total = data.items.reduce((sum, item) => sum + parseFloat(item.total), 0);
        const balanceDue = total - parseFloat(data.discount || 0) - parseFloat(data.advance || 0);
        return balanceDue.toFixed(2);
    };

    const cleanFileName = (name) => {
        return name.replace(/\s+/g, '_').replace(/[^\w_-]+/g, '');
    };

    const handlePrint = useReactToPrint({
        content: () => billRef.current,
        documentTitle: `bill-${cleanFileName(data.clientName)}-${cleanFileName(data.billNumber)}`
    });

    return (
        <div>
            <style>
                {`
                    @media print {
                        .page-break {
                            page-break-before: always;
                        }
                        .bill-container {
                            width: 100%;
                            max-width: 210mm; /* A4 paper width */
                            margin: auto;
                        }
                        .no-break-inside {
                            page-break-inside: avoid;
                        }
                    }
                `}
            </style>
            <div ref={billRef} className="max-w-4xl p-6 mx-auto bg-white rounded-lg bill-container">
                <div className="flex items-center justify-between">
                    <img src={Logo} alt="Logo" className="h-32" />
                    <div>
                        <p className="text-lg">BILL NO: #{data.billNumber}</p>
                        <p className="text-gray-700">Date: {data.date}</p>
                    </div>
                </div>
                <div className="pb-4 mb-4 text-center border-b">
                    <div className="text-3xl font-bold" style={{ fontFamily: 'Roboto Slab, serif' }}>Sweet Slices</div>
                    <div className="mt-2 text-lg">Backed With Love </div>
                </div>
                <div className="flex justify-between mb-6">
                    <div className="flex items-start justify-start">
                        <div>
                            <h3 className="text-lg font-bold">Customer Details</h3>
                            <p className="mt-5 text-gray-700">Client Name<span className="ml-2">:</span> {data.clientName}</p>
                            <p className="text-gray-700">Contact No<span className="ml-3.5">:</span> {data.clientContact}</p>
                        </div>
                    </div>
                </div>
                <table className="w-full mb-6 border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left bg-gray-200 border">No</th>
                            <th className="px-6 py-2 text-left bg-gray-200 border">Service</th>
                            <th className="px-6 py-2 text-left bg-gray-200 border">Description</th>
                            <th className="px-2 py-2 text-right bg-gray-200 border">Amount ({data.currency})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, index) => (
                            <tr key={index}>
                                <td className="px-2 py-2 border">{(index + 1).toString().padStart(2, '0')}</td>
                                <td className="px-6 py-2 border">{item.service}</td>
                                <td className="px-6 py-2 border">{item.description}</td>
                                <td className="px-2 py-2 text-right border">{item.total} {data.currency}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" className="px-4 py-2 font-semibold text-right">Total</td>
                            <td className="px-4 py-2 text-right">{data.totalAmount || 0} {data.currency}</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="px-4 py-2 font-semibold text-right">Advance</td>
                            <td className="px-4 py-2 text-right">{data.advance || 0} {data.currency}</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="px-4 py-2 font-semibold text-right">Discount</td>
                            <td className="px-4 py-2 text-right">{data.discount || 0} %</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="px-4 py-2 font-bold text-right border">Full Amount</td>
                            <td className="px-4 py-2 font-bold text-right border">{data.totalDue || 0} {data.currency}</td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-red-500">{data.redNote}</p>

                <div className="no-break-inside">
                    <div className="flex justify-between">

                    <div>
                    <img src={Paid} alt="Paid" className="h-60" />
                        </div>
                    <div >
                            <img src={Sign} alt="Sign" className="h-40" />
                            <p>''''''''''''''''''''''''''''''''''''''</p>
                            <h3 className="text-lg font-bold">Authorised Sign</h3>
                            <p className="text-gray-700">Ayesha Hasini</p>
                        </div>

                    </div>
                

                <div className="flex items-center justify-between mt-2 border-t">
                    <img src={Qr} alt="Qr" className="h-16" />
                    <div>
                        <p className="mt-5 text-gray-700"><b>Thank You For Choosing Us</b></p>
                    </div>
                    <div>
                        <p className="mt-5 text-gray-700"><b>Contact</b><span className="ml-2">: +94 75 717 5663</span></p>
                        <p className="text-gray-700"><b>Email</b><span className="ml-6">: ayeshaweerathunga76@gmil.com</span></p>
                    </div>
                </div>
                </div>
            </div>
            <button onClick={handlePrint} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded">Download Bill</button>
        </div>
    );
}

export default BillTemplate;
