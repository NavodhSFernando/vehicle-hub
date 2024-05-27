import React, { useState } from 'react'

export default function Faq() {
    // initializes a state variable accordions using the useState hook.
    // The state variable holds an array of FAQ items
    const [accordions, setAccordions] = useState([
        {
            key: 1,
            title: 'How do I make a reservation?',
            data: "Making a reservation is easy! Simply navigate to our reservation page,select your desired pickup and drop-off dates, choose the vehicle you'd like to rent, and proceed with the booking process.",
            isOpen: false
        },
        {
            key: 2,
            title: 'What types of vehicles do you offer for rental?',
            data: 'We offer a wide range of vehicles to suit your needs, including sedans, SUVs, trucks, vans, and more. You can browse our vehicle inventory to find the perfect option for your next rental.',
            isOpen: false
        },
        {
            key: 3,
            title: 'What payment methods do you accept?',
            data: 'We accept various payment methods, including credit/debit cards and online payment gateways. Rest assured that all transactions are secure and encrypted for your protection.',
            isOpen: false
        },
        {
            key: 4,
            title: 'Do I need to create an account to make a reservation?',
            data: 'Yes, creating an account is required as it can streamline the reservation process and allow you to access additional features such as managing your bookings and preferences.',
            isOpen: false
        },
        {
            key: 5,
            title: 'Is there a minimum age requirement for renting a vehicle?',
            data: 'Yes, renters must typically be at least 21 years old, although this may vary depending on the location and type of vehicle. Additional age restrictions and surcharges may apply for drivers under 25.',
            isOpen: false
        },
        {
            key: 6,
            title: 'What documents do I need to provide when picking up my rental?',
            data: "You'll typically need to present a valid driver's license, a major credit card in your name, and proof of insurance when picking up your rental vehicle. Additional documentation may be required depending on the rental location and specific requirements.",
            isOpen: false
        }
    ])
    // function toggles the isOpen property of the FAQ item identified by the accordionKey.
    const toggleAccordion = (accordionKey) => {
        const updatedAccordions = accordions.map((accord) => {
            if (accord.key === accordionKey) {
                return { ...accord, isOpen: !accord.isOpen }
            } else {
                return { ...accord, isOpen: false }
            }
        })

        setAccordions(updatedAccordions)
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center p-[30px] bg-gradient-to-b from-blue-500 to-white">
                <div className="text-[40px] font-[700]">Frequently Asked Questions</div>
                <div className="w-[1000px] text-center mt-[30px] text-black">
                    Welcome to our FAQ page, where we've compiled answers to commonly asked questions to provide you
                    with quick and helpful information. Whether you're curious about our reservation process, payment
                    methods, or rental policies, you'll find all the answers you need right here. If you can't find what
                    you're looking for, feel free to reach out to our friendly customer support team for assistance.
                </div>
                <div className="mt-[30px] flex flex-col gap-[20px] ">
                    {/* maps over the accordions array and renders each FAQ item as a div. */}
                    {accordions.map((faq, index) => (
                        <div key={index} className="mb-1 border-b border-black">
                            <button
                                className="w-[800px] p-4 text-left transition duration-800 font-[500]"
                                onClick={() => toggleAccordion(faq.key)}
                            >
                                {faq.title}
                                <span
                                    className={`float-right transform ${faq.isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-1000`}
                                >
                                    &#9660;
                                </span>
                            </button>
                            {faq.isOpen && <div className="p-4  w-[700px] font-[400]">{faq.data}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
