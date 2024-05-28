import React, { useEffect, useState } from 'react'
import BookNowCard from './BookNowCard'
import BookingStrip2 from './BookingStrip/BookingStrip2'
import SearchStrip from './BookingStrip/SearchStrip'
import Aqua from '../../assets/vehicles/aqua.png'
import FilterCard from './Filtercard'

const data = [
    {
        key: '001',
        name: 'Toyota aqua',
        type: 'SUV',
        imageSrc: Aqua,
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Nizan',
        transmission: 'Manual',
        capacity: '4 Persons',
        price: '15000'
    },
    {
        key: '002',
        name: 'Toyota prius',
        type: 'Sedan',
        imageSrc: Aqua,
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '6 Persons',
        price: '15000'
    },
    {
        key: '003',
        name: 'Toyota prius',
        type: 'SUV',
        imageSrc: Aqua,
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '3 Persons',
        price: '15000'
    },
    {
        key: '004',
        name: 'Toyota prius',
        type: 'Sedan',
        imageSrc: Aqua,
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '6 Persons',
        price: '15000'
    },
    {
        key: '005',
        name: 'Toyota prius',
        type: 'Sedan',
        imageSrc: Aqua,
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '4 Persons',
        price: '9000'
    },
    {
        key: '006',
        name: 'Toyota prius',
        type: 'Sedan',
        imageSrc: Aqua,
        imageAlt: 'Toyota Aqua',
        year: '2017',
        make: 'Toyota',
        transmission: 'Manual',
        capacity: '4 Persons',
        price: '6000'
    }
]

const VehicleFleet = () => {
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
        const updatedFilteredData = data.filter((vehicle) =>
            vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredData(updatedFilteredData)
    }

    useEffect(() => {
        const updatedFilteredData = data.filter((vehicle) => {
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

            if (filters.vehicleCapacity !== 'all' && vehicle.capacity !== filters.vehicleCapacity) {
                console.log('Filtered out due to vehicle capacity')
                return false
            }

            if (parseInt(filters.maxPrice) > 0 && parseInt(vehicle.price) > parseInt(filters.maxPrice)) {
                console.log('Filtered out due to price')
                return false
            }

            return true
        })

        setFilteredData(updatedFilteredData)
    }, [filters])

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
                    <div className="flex flex-row flex-wrap justify-between mt-10 gap-5">
                        {filteredData.map((vehicle) => (
                            <BookNowCard
                                key={vehicle.key}
                                name={vehicle.name}
                                type={vehicle.type}
                                imageSrc={vehicle.imageSrc}
                                imageAlt={vehicle.imageAlt}
                                year={vehicle.year}
                                transmission={vehicle.transmission}
                                capacity={vehicle.capacity}
                                price={vehicle.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleFleet
