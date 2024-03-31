import React, { useState } from 'react'

const faqs = [
    {
        question: 'How do I make a reservation?',
        answer: "Making a reservation is easy! Simply navigate to our reservation page,select your desired pickup and drop-off dates, choose the vehicle you'd like to rent, and proceed with the booking process."
    },
    {
        question: 'What types of vehicles do you offer for rental?',
        answer: 'We offer a wide range of vehicles to suit your needs, including sedans, SUVs, trucks, vans, and more. You can browse our vehicle inventory to find the perfect option for your next rental.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods, including credit/debit cards and online payment gateways. Rest assured that all transactions are secure and encrypted for your protection.'
    },
    {
        question: 'Do I need to create an account to make a reservation?',
        answer: 'While creating an account is not required, it can streamline the reservation process and allow you to access additional features such as managing your bookings and preferences.'
    },
    {
        question: 'Is there a minimum age requirement for renting a vehicle?',
        answer: 'Yes, renters must typically be at least 21 years old, although this may vary depending on the location and type of vehicle. Additional age restrictions and surcharges may apply for drivers under 25.'
    }
]

export function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null)

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className="py-16 min-h-screen bg-white">
            <div className="container mx-auto sm:w-3/4 md:w-2/3 lg:w-1/2">
                <h2 className="text-center text-3xl mb-10 font-bold">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded-lg ${
                                index === activeIndex ? 'border-blue-500' : 'border-gray-300'
                            }`}
                        >
                            <h3
                                className={`text-lg font-medium ${
                                    index === activeIndex ? 'text-blue-500' : 'text-gray-700'
                                }`}
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span className="float-right">{index === activeIndex ? '-' : '+'}</span>
                            </h3>
                            <div className={`${index === activeIndex ? 'block' : 'hidden'} mt-2 text-gray-600`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default FAQ
