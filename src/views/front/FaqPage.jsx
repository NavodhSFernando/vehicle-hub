import React from 'react'

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

export default function Faq() {
    return (
        <>
            <div className="flex flex-col justify-center items-center p-[30px] bg-gradient-to-b from-blue-900 to-white">
                <div className="text-[50px] font-[700]">Frequently Asked Questions</div>
                <div className="w-[1000px] text-center mt-[30px] text-white">
                    Welcome to our FAQ page, where we've compiled answers to commonly asked questions to provide you
                    with quick and helpful information. Whether you're curious about our reservation process, payment
                    methods, or rental policies, you'll find all the answers you need right here. If you can't find what
                    you're looking for, feel free to reach out to our friendly customer support team for assistance.
                </div>
                <div className="mt-[30px] flex flex-col gap-[20px]">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-4 rounded-md shadow-md">
                            <div className="font-semibold">{faq.question}</div>
                            <div>{faq.answer}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
