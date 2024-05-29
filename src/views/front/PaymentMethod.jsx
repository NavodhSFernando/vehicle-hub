import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51PKzzr2NtGTfzr39JL9elmrssZNbhuSPuz0NBmql7gZntZqk8O1pRKaNqkjd6mPskyRk1Fgavgp8ATRM7BZWEcdK00qJ7Rx4UR");

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setCardholderName(e.target.value);
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5062/api/Payments/create-payment-intent", {
        amount: 200000,
        currency: "lkr"
      });

      const clientSecret = response.data.clientSecret;
      console.log(response.data)

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName
          }
        }
      });

      if (error) {
        console.error("Payment failed:", error);
        setMessage("Your payment was not successful, please try again.");
      } else if (paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded!");
        
      } else {
        setMessage("Your payment is processing.");
      }
    } catch (error) {
      console.error("Error handling payment:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mb-1 p-10">
      <h2 className="text-2xl font-semibold text-gray-950 mb-4">Payment Method</h2>
      <p className="text-sm font-light text-gray-600 mb-6">Please enter your payment method</p>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
        <input
          type="text"
          value={cardholderName}
          onChange={handleInputChange}
          placeholder="John Doe"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Card Details</label>
        <div className="border border-gray-300 rounded-md p-2">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4"
                  }
                },
                invalid: {
                  color: "#9e2146"
                }
              }
            }}
          />
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Pay
      </button>

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentMethod;
