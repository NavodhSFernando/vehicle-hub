import React, { useEffect, useState } from 'react'
import BookNowCard from '../../components/front/BookNowCard'
import BookingStrip2 from '../../components/front/BookingStrip/BookingStrip2'
import SearchStrip from '../../components/front/BookingStrip/SearchStrip'
import FilterCard from '../../components/front/Filtercard'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const VehicleFleet = () => {
    const location = useLocation()
    const { startDate, startTime, endDate, endTime } = location.state || {}

    const [vehicleData, setVehicleData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [allVehicle, setAllVehicle] = useState([])
    const [filters, setFilters] = useState({
        vehicleType: 'all',
        vehicleMake: 'all',
        vehicleCapacity: 'all',
        maxPrice: 0
    })

    const [dateFilter, setDateFilter] = useState({
        startDate: startDate || '',
        startTime: startTime || '',
        endDate: endDate || '',
        endTime: endTime || ''
    })

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5062/api/FrontVehicleService/Details')
            setVehicleData(response.data)
            setAllVehicle(response.data)
            setFilteredData(response.data)
            handleDateFilter({ startDate, startTime, endDate, endTime })
        } catch (error) {
            console.error('Failed to fetch vehicle data:', error)
        }
    }

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters })
    }

    const handleSearch = async (searchQuery) => {
        const updatedFilteredData = allVehicle.filter(
            (vehicle) =>
                (vehicle.name && vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (vehicle.type && vehicle.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (vehicle.transmission && vehicle.transmission.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        setFilteredData(updatedFilteredData)
    }

    const handleDateFilter = async ({ startDate, startTime, endDate, endTime }) => {
        setDateFilter({ startDate, startTime, endDate, endTime })
        try {
            const response = await axios.get('http://localhost:5062/api/VehicleFilter/available', {
                params: { startDate, startTime, endDate, endTime }
            })
            setAllVehicle(response.data)
            setFilteredData(response.data)
        } catch (error) {
            console.error('Error fetching vehicles:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (startDate && startTime && endDate && endTime) {
            handleDateFilter({ startDate, startTime, endDate, endTime })
        }
    }, [startDate, startTime, endDate, endTime])

    useEffect(() => {
        const updatedFilteredData = allVehicle.filter((vehicle) => {
            if (filters.vehicleType !== 'all' && vehicle.type !== filters.vehicleType) return false
            if (filters.vehicleMake !== 'all' && vehicle.make !== filters.vehicleMake) return false
            if (filters.vehicleCapacity !== 'all' && vehicle.seatingCapacity != filters.vehicleCapacity) return false
            if (parseInt(filters.maxPrice) > 0 && parseInt(vehicle.costPerDay) > parseInt(filters.maxPrice))
                return false
            return true
        })

        setFilteredData(updatedFilteredData)
    }, [filters, vehicleData])

    const resetFilters = () => {
        setFilters({
            vehicleType: 'all',
            vehicleMake: 'all',
            vehicleCapacity: 'all',
            maxPrice: 0
        })
        setFilteredData(allVehicle)
    }

    const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'
    const baseUrlLogo = 'https://vehiclehubimages.blob.core.windows.net/logos/'

    return (
        <div>
            <div className="flex flex-row justify-center gap-[30px]">
                <div>
                    <FilterCard onFilterChange={handleFilterChange} />
                </div>
                <div className="flex-col">
                    <div className="flex flex-col-reverse sm:flex-row gap-[10px]">
                        <SearchStrip onSearch={handleSearch} />
                        <button
                            className="flex justify-center items-center gap-[8px] w-full sm:w-[124px] h-[43px]  bg-[#283280] hover:bg-[#283299]  text-[#FBDAC6] rounded-[64px]"
                            onClick={resetFilters}
                        >
                            All Vehicles
                        </button>
                    </div>
                    <div className="mt-[20px]">
                        <BookingStrip2
                            onDateFilter={handleDateFilter}
                            initialStartDate={dateFilter.startDate}
                            initialStartTime={dateFilter.startTime}
                            initialEndDate={dateFilter.endDate}
                            initialEndTime={dateFilter.endTime}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3  gap-7 mt-10">
                        {filteredData.length === 0 ? (
                            <div className="w-full text-center text-black text-[25px]">No vehicles found.</div>
                        ) : (
                            filteredData.map((vehicle) => (
                                <BookNowCard
                                    key={vehicle.vehicleId}
                                    id={vehicle.vehicleId}
                                    name={vehicle.name}
                                    make={vehicle.logo}
                                    type={vehicle.type}
                                    imageSrc={`${baseUrl}${vehicle.thumbnail}`}
                                    //imageAlt={vehicle.imageAlt}
                                    year={vehicle.year}
                                    transmission={vehicle.transmission}
                                    capacity={vehicle.seatingCapacity}
                                    price={vehicle.costPerDay}
                                    logo={`${baseUrlLogo}${vehicle.logo}`}
                                    startDate={new Date(dateFilter.startDate)}
                                    startTime={dateFilter.startTime}
                                    endDate={new Date(dateFilter.endDate)}
                                    endTime={dateFilter.endTime}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleFleet
