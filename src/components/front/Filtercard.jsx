import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '../../components/ui/button';

const FilterCard = ({ onFilterChange }) => {
    const [allVehicleTypes, setAllVehicleTypes] = useState([])
    const [allVehicleMakes, setAllVehicleMakes] = useState([])
    const [allVehicleCapacities, setAllVehicleCapacities] = useState([])

    const [vehicleType, setVehicleType] = useState('all')
    const [vehicleMake, setVehicleMake] = useState('all')
    const [vehicleCapacity, setVehicleCapacity] = useState('all')
    const [maxPrice, setMaxPrice] = useState(5000)

    const fetchVehicleTypes = async () => {
        try {
            const response = await axios.get('http://localhost:5062/api/VehicleType')
            const typesSet = new Set()
            const vehicleTypes = response.data
            .map((type) => ({
                id: `${type.name}`,
                name: `${type.name}`
            }))
            .filter((type) => {
                if(typesSet.has(type.id)){
                    return false
                }else {
                    typesSet.add(type.id)
                    return true
                }
            })
            setAllVehicleTypes([{ id: 'all', name: 'All Vehicle Types' }, ...vehicleTypes])
        } catch (error) {
            console.error('Error fetching vehicle types:', error)
        }
    }

    const fetchVehicleMakes = async () => {
        try {
            const response = await axios.get('http://localhost:5062/api/VehicleMake')
            const makesSet = new Set()
            const vehicleMakes = response.data
                .map((make) => ({
                    id: `${make.name}`,
                    name: `${make.name}`
                }))
                .filter((make) => {
                    if (makesSet.has(make.id)) {
                        return false
                    } else {
                        makesSet.add(make.id)
                        return true
                    }
                })
            setAllVehicleMakes([{ id: 'all', name: 'All Vehicle Makes' }, ...vehicleMakes])
        } catch (error) {
            console.error('Error fetching vehicle makes:', error)
        }
    }

    const fetchVehicleModels = async () => {
        try {
            const response = await axios.get('http://localhost:5062/api/VehicleModel')
            const capacitiesSet = new Set()
            const vehicleCapacities = response.data
                .map((capacity) => ({
                    id: `${capacity.seatingCapacity}`,
                    name: `${capacity.seatingCapacity} Persons`
                }))
                .filter((capacity) => {
                    if (capacitiesSet.has(capacity.id)) {
                        return false
                    } else {
                        capacitiesSet.add(capacity.id)
                        return true
                    }
                })
            setAllVehicleCapacities([{ id: 'all', name: 'All Vehicle Capacities' }, ...vehicleCapacities])
        } catch (error) {
            console.error('Error fetching vehicle models:', error)
        }
    }

    useEffect(() => {
        fetchVehicleTypes()
        fetchVehicleMakes()
        fetchVehicleModels()
    }, [])

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

    const handleClearFilters = () => {
        setVehicleType('all')
        setVehicleMake('all')
        setVehicleCapacity('all')
        setMaxPrice(0)
        onFilterChange({
            vehicleType: 'all',
            vehicleMake: 'all',
            vehicleCapacity: 'all',
            maxPrice: 0
        })
    }

    return (
        <div
            className="flex flex-col items-start p-8 gap-10 bg-white border-r border-gray-300 rounded-lg shadow h-auto w-[330px]">
            <div className='w-full flex justify-center'>
                <Button
                    onClick={handleClearFilters}
                    className="bg-blue-900 w-full hover:bg-blue-800 text-amber-100 font-semibold rounded px-10 transition-colors duration-300"
                >
                        Clear Filters
                </Button>        
            </div>
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
                        style={{ width: '260px' }}
                    >
                        <select
                            value={vehicleType}
                            onChange={handleTypeChange}
                            className="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {allVehicleTypes.map((type) => (
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
                        style={{ width: '260px' }}
                    >
                        <select
                            value={vehicleMake}
                            onChange={handleMakeChange}
                            className="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {allVehicleMakes.map((make) => (
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
                        style={{ width: '260px' }}
                    >
                        <select
                            value={vehicleCapacity}
                            onChange={handleCapacityChange}
                            className="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {allVehicleCapacities.map((capacity) => (
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
                    <div className="relative w-full h-3 bg-[#FBDAC6] rounded-full" style={{ width: '260px' }}>
                        <input
                            type="range"
                            min="5000"
                            max="20000"
                            value={maxPrice}
                            onChange={handlePriceChange}
                            className="absolute w-full h-3 bg-transparent appearance-none cursor-pointer"
                            style={{ zIndex: maxPrice > 0 ? 1 : 0 }}
                        />
                        <div
                            className="absolute h-3 bg-[#283280] rounded-full"
                            style={{ width: `${((maxPrice-5000) / 15000) * 100}%` }}
                        ></div>
                    </div>
                    <p
                        className="text-lg font-semibold text-right text-gray-500"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Max. Rs {(maxPrice)}.00/day
                    </p>
                </label>
            </div>
        </div>
    )
}

export default FilterCard
