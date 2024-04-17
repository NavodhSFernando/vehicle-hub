import React from 'react'

export default function ContactUs() {
    return (
        <>
            <div className="flex flex-col justify-center items-center p-[30px] bg-gradient-to-b from-blue-900 to-white">
                <div className="text-[50px] font-[700]">Contact Us</div>
                <div className="w-[1000px] text-center mt-[30px]">
                    We'd love to hear from you! Whether you have a question about our services, need assistance, or
                    you're in the area and want to check out our headquarters, feel free to drop us a line. We aim to
                    reply to all messages within two business days. Vehicle Hub (Pvt.) Ltd. No 58 Pamankada Road,
                    Colombo 06, Sri Lanka.
                </div>
                <div className="mt-[30px] flex flex-col gap-[20px]">
                    <div className="flex justify-center items-center gap-[10px]">
                        <div>Phone Number : </div>
                        <div>+94 112 224 445</div>
                    </div>
                    <div className="flex justify-center items-center gap-[10px]">
                        <div>Email : </div>
                        <div>test123@gmail.com</div>
                    </div>
                </div>
            </div>
        </>
    )
}
