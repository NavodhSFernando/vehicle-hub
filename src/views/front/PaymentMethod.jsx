import React, { useState } from 'react';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';

const PaymentMethod = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mb-1 p-10">
      <h2 className="text-2xl font-semibold text-gray-950 mb-4">Payment Method</h2>
      <p className="text-sm font-light text-gray-600 mb-6">Please enter your payment method</p>
      
      <div className="flex items-center mb-4">
        <input
          type="radio"
          checked
          readOnly
          className="form-radio text-indigo-600"
        />
        <span className="ml-2 text-lg">Credit Card</span>
        <div className="ml-auto flex space-x-2">
          <FaCcVisa className="h-8 w-8 text-blue-600" />
          <FaCcMastercard className="h-8 w-8 text-red-600" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleInputChange}
            placeholder="8016 2345 6790 1234"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
          <input
            type="text"
            name="expirationDate"
            value={cardDetails.expirationDate}
            onChange={handleInputChange}
            placeholder="12/26"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleInputChange}
            placeholder="512"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
