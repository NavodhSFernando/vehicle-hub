import React, { useState } from 'react'
//Arrays for vehicleTypes, vehicleMakes, and vehicleCapacities
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
    const [vehicleType, setVehicleType] = useState('all')
    const [vehicleMake, setVehicleMake] = useState('all')
    const [vehicleCapacity, setVehicleCapacity] = useState('all')
    const [maxPrice, setMaxPrice] = useState(10000)

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
            className="relative flex flex-col items-start p-8 gap-10 bg-white border-r border-gray-300 rounded-lg shadow"
            style={{ width: '357px', height: '489px', top: '158px', left: '250px' }}
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
                    <div className="relative w-full h-3 bg-pink-200 rounded-full" style={{ width: '300px' }}>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={maxPrice}
                            onChange={handlePriceChange}
                            className="absolute w-full h-3 bg-transparent appearance-none cursor-pointer"
                        />
                        {/* Slider Thumb */}
                        <div className="absolute w-5 h-5 bg-blue-800 rounded-full left-[calc((maxPrice / 10000 * 100) - 0.625rem)] top-[-0.375rem] border-4 border-white"></div>
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
