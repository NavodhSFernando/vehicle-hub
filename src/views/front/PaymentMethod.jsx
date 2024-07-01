import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import axios from 'axios'
import { useToast } from '../../components/ui/use-toast'

// Load Stripe
const stripePromise = loadStripe(
    'pk_test_51PKzzr2NtGTfzr39JL9elmrssZNbhuSPuz0NBmql7gZntZqk8O1pRKaNqkjd6mPskyRk1Fgavgp8ATRM7BZWEcdK00qJ7Rx4UR'
)

// Combined Payment Method component
const PaymentMethod = ({ invoiceId, amount, invoiceType }) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm invoiceId={invoiceId} amount={amount} invoiceType={invoiceType} />
        </Elements>
    )
}

// Payment Form component
const PaymentForm = ({ invoiceId, amount, invoiceType }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardholderName, setCardholderName] = useState('')
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const { toast } = useToast()

    const handleInputChange = (e) => {
        setCardholderName(e.target.value)
    }

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:5062/api/Payments/create-payment-intent', {
                amount: amount * 100, // Assuming amount is in dollars and needs to be in cents for Stripe
                currency: 'lkr',
                invoiceType // Send invoiceType if needed in backend
            })

            const clientSecret = response.data.clientSecret

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: cardholderName
                    }
                }
            })

            if (error) {
                console.error('Payment failed:', error)
                toast({
                    variant: 'destructive_border',
                    description: 'Payment was not successful!'
                })
                setIsSuccess(false)
            } else if (paymentIntent.status === 'succeeded') {
                toast({
                    variant: 'success',
                    description: 'Payment was successful!'
                })
                setIsSuccess(true)

                // Prepare payment data excluding id
                const paymentData = {
                    paymentStatus: invoiceType,
                    paymentMethod: 'Card',
                    paymentDate: new Date().toISOString(),
                    paymentTime: new Date().toISOString(),
                    invoiceId: invoiceId
                }

                // Send POST request to save payment data
                await axios.post(`http://localhost:5062/api/Payment`, paymentData, {
                    headers: {
                        accept: 'text/plain',
                        'Content-Type': 'application/json'
                    }
                })

                // Determine reservation status based on invoice type
                const newStatus = invoiceType === 'Deposit' ? 'Confirmed' : 'Completed'

                // Prepare data for updating reservation status
                const reservationStatusData = {
                    invoiceId: invoiceId,
                    newStatus: newStatus
                }

                // Send PUT request to update reservation status
                await axios.put(`http://localhost:5062/api/Payment/UpdateReservationStatus`, reservationStatusData, {
                    headers: {
                        accept: '*/*',
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                setMessage('Your payment is processing.')
                setIsSuccess(false)
            }
        } catch (error) {
            console.error('Error handling payment:', error)
            setMessage('Something went wrong.')
            setIsSuccess(false)
        }
    }

    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mb-1 p-10 relative">
            <div className="absolute top-4 right-4 flex items-center space-x-2">
                <FaCcVisa className="text-3xl text-blue-600" />
                <FaCcMastercard className="text-3xl text-red-600" />
            </div>
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
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4'
                                    }
                                },
                                invalid: {
                                    color: '#9e2146'
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

            {message && <p className={`mt-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        </div>
    )
}

export default PaymentMethod
