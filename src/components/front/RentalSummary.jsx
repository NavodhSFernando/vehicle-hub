import React from 'react'
import { useState } from 'react'
import aqua from '../../assets/vehicles/aqua.png'
import { Button } from '../ui/button'

function RentalSummary() {
    const [rating, setRating] = useState(0)

    const handleStarClick = (value) => {
        setRating(value)
    }
    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mb-1 ">
            <div className="my-10 lg:px-10">
                <h3 className="pb-1 text-lg text-gray-950 font-bold">Rental Summary</h3>
                <p className="pb-10 text-sm font-light">
                    Prices may change depending on the length of the rental and the price of your rental car.
                </p>
                <div className="pb-8 flex items-center">
                    <img src={aqua} alt="car" className="w-32 h-18 rounded-full shadow-lg mr-12" />
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold text-gray-950 mb-1">Toyota Aqua</h1>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 border-gray-700 rounded-full fill-current ${index < rating ? 'text-yellow-400' : 'text-gray-100'}`}
                                    viewBox="0 0 24 24"
                                    onClick={() => handleStarClick(index + 1)}
                                >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    <path d="M0 0h24v24H0z" fill="none" />
                                </svg>
                            ))}
                            <p className="text-gray-500 text-xs">10+ Reviewer</p>
                        </div>
                    </div>
                </div>
                <hr className="pb-3 border-t-2 border-stone-200" />

                <div className="pt-8 flex justify-between">
                    <p className="text-gray-500">Deposit Amount</p>
                    <p className="font-semibold"> -Rs 5000.00</p>
                </div>
                <div className="pt-3 flex justify-between">
                    <p className="text-gray-500">Extra Mileage Charge(per km)</p>
                    <p className="font-semibold"> Rs 960.00</p>
                </div>
                <div className="pt-3 flex justify-between">
                    <p className="text-gray-500">Damage Fees</p>
                    <p className="font-semibold">Rs 0.00</p>
                </div>
                <div className="pt-3 flex justify-between pb-8">
                    <p className="text-gray-500">Rental Charge</p>
                    <p className="font-semibold">Rs 10,000.00</p>
                </div>

                <hr className="pb-3 border-t-2 border-stone-200" />

                <div className="pt-3 flex justify-between">
                    <p className="text-gray-950 font-bold text-xl">Total Amount</p>
                    <p className="font-semibold text-3xl">LKR 5960.00</p>
                </div>
                <div className="text-gray-500 text-xs">
                    <p>Overall price including additions </p>
                    <p>and deductions.</p>
                </div>
                <Button className="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-full rounded-lg text-sm mt-20">
                    Make Payment
                </Button>
            </div>
        </div>
    )
}

export default RentalSummary
