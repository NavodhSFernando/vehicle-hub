import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { columns } from './Columns';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

export default function ViewBillingDetails() {
    const customerId = useOutletContext();
    const [data, setData] = useState([]);
    const [paymentStatuses, setPaymentStatuses] = useState({});

    useEffect(() => {
        const fetchDecryptedIdAndBillingDetails = async () => {
            try {
                const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${customerId}`);
                const decryptedId = decryptResponse.data.decryptedUserId;

                const billingDetailsResponse = await axios.get(
                    `http://localhost:5062/BillingDetails/ByCustomer/${decryptedId}`
                );
                const invoices = billingDetailsResponse.data;
                setData(invoices);

                // Fetch payment status for each invoice
                const paymentStatusPromises = invoices.map(async (invoice) => {
                    try {
                        const response = await axios.get(`http://localhost:5062/CheckPayment/CheckPayment/${invoice.id}`);
                        if (response.data.paymentExists) {
                            return { [invoice.id]: response.data };
                        } else {
                            return { [invoice.id]: { paymentExists: false } };
                        }
                    } catch (error) {
                        console.error(`Error fetching payment status for invoice ${invoice.id}:`, error);
                        return { [invoice.id]: { paymentExists: false } };
                    }
                });

                const paymentStatusesArray = await Promise.all(paymentStatusPromises);
                const paymentStatusesObject = paymentStatusesArray.reduce((acc, status) => ({ ...acc, ...status }), {});
                setPaymentStatuses(paymentStatusesObject);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (customerId) {
            fetchDecryptedIdAndBillingDetails();
        }
    }, [customerId]);

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg">
            <DataTable columns={columns(paymentStatuses)} data={data} />
        </div>
    );
}
