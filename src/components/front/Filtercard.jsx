import React, { useState } from 'react'
// Predefined arrays containing options for vehicle types, makes, and capacities.

const vehicleTypes = [
    { id: 'all', name: 'All Vehicle Types' },
    { id: 'sedan', name: 'Sedan' },
    { id: 'suv', name: 'SUV' }
    // ...more types
]

const vehicleMakes = [
    { id: 'all', name: 'All Vehicle Makes' },
    { id: 'toyota', name: 'Toyota' },
    { id: 'nizan', name: 'Nizan' },
    { id: 'honda', name: 'Honda' },
    { id: 'mazda', name: 'mazda' },
    { id: 'bmw', name: 'BMW' },
    { id: 'audi', name: 'Audi' }
    // ...more makes
]

const vehicleCapacities = [
    { id: 'all', name: 'All Vehicle Makes' },
    { id: '3', name: '3 Person' },
    { id: '4', name: '4 Person' },
    { id: '6', name: '6 Person' }
    // ...more capacities
]

const FilterCard = () => {
    // State hooks for each filter category and max price, initialized with default values.
    //  State is used here to keep track of the user's selections and to react to changes.
    const [vehicleType, setVehicleType] = useState('all')
    const [vehicleMake, setVehicleMake] = useState('all')
    const [vehicleCapacity, setVehicleCapacity] = useState('all')
    const [maxPrice, setMaxPrice] = useState(0)

    // Event handlers for each filter category. These update the state when the user selects a new option.
    // The 'event' object provides access to the new value of the input element.
    const handleTypeChange = (event) => {
        setVehicleType(event.target.value)
    }

    const handleMakeChange = (event) => {
        setVehicleMake(event.target.value)
    }

    const handleCapacityChange = (event) => {
        setVehicleCapacity(event.target.value)
    }

    const handlePriceChange = (event) => {
        setMaxPrice(event.target.value)
    }

    return (
        <div
            className="flex flex-col items-start p-8 gap-10 bg-white border-r border-gray-300 rounded-lg shadow"
            style={{ width: '357px', height: '489px' }}
        >
            {/* Vehicle Type Dropdown */}
            <div className="mb-4 flex flex-col items-start gap-7">
                <label className="block w-full">
                    <p
                        className="text-sm font-semibold tracking-widest text-gray-400 uppercase"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Vehicle Type
                    </p>
                    <div
                        className="flex flex-row items-start justify-between w-full px-3 py-3 border rounded-md border-gray-300 bg-white"
                        style={{ width: '300px' }}
                    >
                        <select
                            value={vehicleType}
                            onChange={handleTypeChange}
                            className="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {vehicleTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>
            </div>

            {/* Vehicle Make Dropdown */}
            <div className="mb-4 flex flex-col items-start gap-7">
                <label className="block w-full">
                    <p
                        className="text-sm font-semibold tracking-widest text-gray-400 uppercase"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Vehicle Make
                    </p>
                    <div
                        className="flex flex-row items-start justify-between w-full px-3 py-3 border rounded-md border-gray-300 bg-white"
                        style={{ width: '300px' }}
                    >
                        <select
                            value={vehicleMake}
                            onChange={handleMakeChange}
                            className="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {vehicleMakes.map((make) => (
                                <option key={make.id} value={make.id}>
                                    {make.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>
            </div>

            {/* Vehicle Capacity Dropdown */}
            <div className="mb-4 flex flex-col items-start gap-7">
                <label className="block w-full">
                    <p
                        className="text-sm font-semibold tracking-widest text-gray-400 uppercase"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Vehicle Capacity
                    </p>
                    <div
                        className="flex flex-row items-start justify-between w-full px-3 py-3 border rounded-md border-gray-300 bg-white"
                        style={{ width: '300px' }}
                    >
                        <select
                            value={vehicleCapacity}
                            onChange={handleCapacityChange}
                            className="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {vehicleCapacities.map((capacity) => (
                                <option key={capacity.id} value={capacity.id}>
                                    {capacity.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>
            </div>

            {/* Price Slider */}
            <div className="mb-4 flex flex-col items-start gap-3">
                <label className="block w-full">
                    <p
                        className="text-sm font-semibold tracking-widest text-gray-400 uppercase"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Price
                    </p>
                    {/* Increase width of the slider container */}
                    <div className="relative w-full h-3 bg-[#FBDAC6] rounded-full" style={{ width: '300px' }}>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={maxPrice}
                            onChange={handlePriceChange}
                            className="absolute w-full h-3 bg-transparent appearance-none cursor-pointer"
                            style={{ zIndex: maxPrice > 0 ? 1 : 0 }}
                        />
                        <div
                            className="absolute h-3 bg-[#283280] rounded-full"
                            style={{ width: `${(maxPrice / 10000) * 100}%` }}
                        ></div>
                        <style jsx>{`
                            input[type='range']::-webkit-slider-thumb {
                                -webkit-appearance: none;
                                appearance: none;
                                width: 20px;
                                height: 20px;
                                background-color: #283280;
                                border-radius: 50%;
                                border: 4px solid #ffffff;
                                cursor: pointer;
                            }
                        `}</style>
                    </div>
                    <p
                        className="text-lg font-semibold text-right text-gray-500"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Max. Rs {maxPrice}.00/day
                    </p>
                </label>
            </div>
        </div>
    )
}

export default FilterCard
