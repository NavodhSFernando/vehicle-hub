import React, { useState } from 'react'

const vehicleTypes = [
    { id: 'all', name: 'All Vehicle Types' },
    { id: 'Sedan', name: 'Sedan' },
    { id: 'SUV', name: 'SUV' }
    // ...more types
]

const vehicleMakes = [
    { id: 'all', name: 'All Vehicle Makes' },
    { id: 'Toyota', name: 'Toyota' },
    { id: 'Nizan', name: 'Nizan' },
    { id: 'Honda', name: 'Honda' },
    { id: 'Mazda', name: 'Mazda' },
    { id: 'BMW', name: 'BMW' },
    { id: 'Audi', name: 'Audi' }
    // ...more makes
]

const vehicleCapacities = [
    { id: 'all', name: 'All Vehicle Capacities' },
    { id: '3 Persons', name: '3 Persons' },
    { id: '4 Persons', name: '4 Persons' },
    { id: '6 Persons', name: '6 Persons' }
    // ...more capacities
]

const FilterCard = ({ onFilterChange }) => {
    const [vehicleType, setVehicleType] = useState('all')
    const [vehicleMake, setVehicleMake] = useState('all')
    const [vehicleCapacity, setVehicleCapacity] = useState('all')
    const [maxPrice, setMaxPrice] = useState(0)

    const handleTypeChange = (event) => {
        setVehicleType(event.target.value)
        onFilterChange({ vehicleType: event.target.value })
    }

    const handleMakeChange = (event) => {
        setVehicleMake(event.target.value)
        onFilterChange({ vehicleMake: event.target.value })
    }

    const handleCapacityChange = (event) => {
        setVehicleCapacity(event.target.value)
        onFilterChange({ vehicleCapacity: event.target.value })
    }

    const handlePriceChange = (event) => {
        setMaxPrice(event.target.value)
        onFilterChange({ maxPrice: event.target.value })
    }

    return (
        <div
            className="flex flex-col items-start p-8 gap-10 bg-white border-r border-gray-300 rounded-lg shadow"
            style={{ width: '357px', height: '489px' }}
        >
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

            <div className="mb-4 flex flex-col items-start gap-3">
                <label className="block w-full">
                    <p
                        className="text-sm font-semibold tracking-widest text-gray-400 uppercase"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Price
                    </p>
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
