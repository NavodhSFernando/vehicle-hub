import React, { useEffect, useState } from 'react'
import BookNowCard from '../../components/front/BookNowCard'
import BookingStrip2 from '../../components/front/BookingStrip/BookingStrip2'
import SearchStrip from '../../components/front/BookingStrip/SearchStrip'
import Aqua from '../../assets/vehicles/aqua.png'
import FilterCard from '../../components/front/Filtercard'
import axios from 'axios'

const VehicleFleet = () => {
    const [vehicleData, setVehicleData] = useState([])

    const fetchData = async () => {
        try {
            // Update the URL to your specific API endpoint for fetching vehicles
            const response = await axios.get('http://localhost:5062/api/FrontVehicleService/Details')
            setVehicleData(response.data) // Assume the response data is the array of vehicles
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch vehicle data:', error)
        }
    }

    const [filters, setFilters] = useState({
        vehicleType: 'all',
        vehicleMake: 'all',
        vehicleCapacity: 'all',
        maxPrice: 0
    })

    const [keyword, setKeyword] = useState('')

    const [filteredData, setFilteredData] = useState([])

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters })
    }

    const handleSearch = (searchQuery) => {
        setKeyword(searchQuery)
        console.log(searchQuery)
        const updatedFilteredData = vehicleData.filter((vehicle) =>
            vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredData(updatedFilteredData)
    }

    useEffect(() => {
        fetchData()
        const updatedFilteredData = vehicleData.filter((vehicle) => {
            console.log('Vehicle:', vehicle)
            console.log('Filters:', filters)

            if (filters.vehicleType !== 'all' && vehicle.type !== filters.vehicleType) {
                console.log('Filtered out due to vehicle type')
                return false
            }

            if (filters.vehicleMake !== 'all' && vehicle.make !== filters.vehicleMake) {
                console.log('Filtered out due to vehicle make')
                return false
            }

            if (
                parseInt(filters.vehicleCapacity) !== 'all' &&
                parseInt(vehicle.seatingCapacity) !== parseInt(filters.vehicleCapacity)
            ) {
                console.log('Filtered out due to vehicle capacity')
                return false
            }

            if (parseInt(filters.maxPrice) > 0 && parseInt(vehicle.costPerDay) > parseInt(filters.maxPrice)) {
                console.log('Filtered out due to price')
                return false
            }

            return true
        })
        setFilteredData(updatedFilteredData)
    }, [filters])

    const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'
    const baseUrlLogo = 'https://vehiclehubimages.blob.core.windows.net/logos/'

    return (
        <div>
            <div className="flex flex-row justify-center gap-[30px]">
                <div>
                    <FilterCard onFilterChange={handleFilterChange} />
                </div>
                <div className="flex-col">
                    <SearchStrip onSearch={handleSearch} />
                    <div className="mt-[20px]">
                        <BookingStrip2 />
                    </div>
                    <div className="flex flex-row flex-wrap mt-10 gap-7">
                        {filteredData.map((vehicle) => (
                            <BookNowCard
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
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleFleet
