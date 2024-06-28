import React from 'react'
import Image from '../../assets/images/index-image.png'
import BookingStrip from '../../components/front/BookingStrip/BookingStrip'

export default function Home() {
    return (
        <div>
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${Image})` }}></div>
                <div className="absolute inset-0 flex justify-center items-center top-1/2 transform -translate-y-1/2 px-4 sm:px-6 lg:px-8">
                    <BookingStrip />
                </div>
            </div>
        </div>
    )
}
