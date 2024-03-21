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
        <div className="relative bg-[#F6F7F9] rounded-lg p-6 max-w-md mx-auto shadow">
            {/* Vehicle Type Dropdown */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Vehicle Type
                    <select
                        value={vehicleType}
                        onChange={handleTypeChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {vehicleTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Vehicle Make Dropdown */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Vehicle Make
                    <select
                        value={vehicleMake}
                        onChange={handleMakeChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {vehicleMakes.map((make) => (
                            <option key={make.id} value={make.id}>
                                {make.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Vehicle Capacity Dropdown */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Vehicle Capacity
                    <select
                        value={vehicleCapacity}
                        onChange={handleCapacityChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {vehicleCapacities.map((capacity) => (
                            <option key={capacity.id} value={capacity.id}>
                                {capacity.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Price Slider */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Price
                    <div className="mt-1 flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={maxPrice}
                            onChange={handlePriceChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-2 text-sm text-gray-500">Max. Rs {maxPrice}.00/day</span>
                    </div>
                </label>
            </div>
        </div>
    )
}

export default FilterCard
