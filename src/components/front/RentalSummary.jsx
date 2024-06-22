import React from 'react'
import { Button } from '../ui/button'
import { FaStar } from 'react-icons/fa6'

function RentalSummary({
    make,
    modelName,
    deposit,
    extraKMCost,
    penalty,
    rentalCost,
    amount,
    thumbnail,
    rating,
    type
}) {
    const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'
    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mb-1 ">
            <div className="my-10 lg:px-10">
                <h3 className="pb-1 text-lg text-gray-950 font-bold">Rental Summary</h3>
                <p className="pb-10 text-sm font-light">
                    Prices may change depending on the length of the rental and the price of your rental car.
                </p>
                <div className="pb-8 flex items-center">
                    <img src={`${baseUrl}${thumbnail}`} alt="car" className="w-28 mr-4" />
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold text-gray-950 mb-1">
                            {make} {modelName}
                        </h1>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, starIndex) => (
                                <FaStar key={starIndex} color={starIndex < rating ? 'yellow' : 'grey'} />
                            ))}
                            <p className="text-gray-500 text-xs">10+ Reviewer</p>
                        </div>
                    </div>
                </div>
                <hr className="pb-3 border-t-2 border-stone-200" />

                <div className="pt-8 pb-3 flex justify-between">
                    <p className="text-gray-500">Deposit Amount</p>
                    <p className="font-semibold">{deposit}</p>
                </div>
                {type === 'Final' && (
                    <>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Extra Mileage Charge(per km)</p>
                            <p className="font-semibold">{extraKMCost}</p>
                        </div>
                        <div className="pt-3 flex justify-between">
                            <p className="text-gray-500">Penalty</p>
                            <p className="font-semibold">{penalty}</p>
                        </div>
                        <div className="pt-3 flex justify-between pb-8">
                            <p className="text-gray-500">Rental Charge</p>
                            <p className="font-semibold">{rentalCost}</p>
                        </div>
                    </>
                )}
                <hr className="pb-3 border-t-2 border-stone-200" />

                <div className="pt-3 flex justify-between">
                    <p className="text-gray-950 font-bold text-xl">Total Amount</p>
                    <p className="font-semibold text-3xl">{amount}</p>
                </div>
                <div className="text-gray-500 text-xs">
                    <p>Overall price including additions </p>
                    <p>and deductions.</p>
                </div>
                {/* <Button className="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-full rounded-lg text-sm mt-20">
                    Make Payment
                </Button> */}
            </div>
        </div>
    )
}

export default RentalSummary
