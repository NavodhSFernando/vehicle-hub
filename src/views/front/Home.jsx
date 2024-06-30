import React from 'react'
import Image from '../../assets/images/index-image-backup.png'
import BookingStrip from '../../components/front/BookingStrip/BookingStrip'

export default function Home() {
    return (
        <div>
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${Image})` }}></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center top-1/2 transform -translate-y-1/2 px-4 sm:px-6 lg:px-8">
                    <div className="text-center m-20">
                        <h1
                            className="text-6xl font-extrabold text-white"
                            style={{ textShadow: '4px 4px 12px rgba(0, 0, 0, 0.8)', WebkitTextStroke: '2px black' }}
                        >
                            Welcome to VehicleHub
                        </h1>
                        <p
                            className="text-3xl font-bold text-white mt-4"
                            style={{ textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8)', WebkitTextStroke: '1px black' }}
                        >
                            Book a vehicle for your next adventure
                        </p>
                    </div>
                    <BookingStrip />
                </div>
            </div>
        </div>
    )
}
