import React, { useEffect, useState } from 'react'
import BookNowCard from './BookNowCard'
import BookingStrip2 from './BookingStrip/BookingStrip2'
import SearchStrip from './BookingStrip/SearchStrip'
import Aqua from '../../assets/vehicles/aqua.png'
import FilterCard from './Filtercard'
import axios from 'axios'
// const data = [
//     {
//         key: '001',
//         name: 'Toyota aqua',
//         type: 'SUV',
//         imageSrc: Aqua,
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Nizan',
//         transmission: 'Manual',
//         capacity: '4 Persons',
//         price: '15000'
//     },
//     {
//         key: '002',
//         name: 'Toyota prius',
//         type: 'Sedan',
//         imageSrc: Aqua,
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '6 Persons',
//         price: '15000'
//     },
//     {
//         key: '003',
//         name: 'Toyota prius',
//         type: 'SUV',
//         imageSrc: Aqua,
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '3 Persons',
//         price: '15000'
//     },
//     {
//         key: '004',
//         name: 'Toyota prius',
//         type: 'Sedan',
//         imageSrc: Aqua,
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '6 Persons',
//         price: '15000'
//     },
//     {
//         key: '005',
//         name: 'Toyota prius',
//         type: 'Sedan',
//         imageSrc: Aqua,
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '4 Persons',
//         price: '9000'
//     },
//     {
//         key: '006',
//         name: 'Toyota prius',
//         type: 'Sedan',
//         imageSrc: Aqua,
//         imageAlt: 'Toyota Aqua',
//         year: '2017',
//         make: 'Toyota',
//         transmission: 'Manual',
//         capacity: '4 Persons',
//         price: '6000'
//     }
// ]

const VehicleFleet = () => {
    const [filters, setFilters] = useState({
        vehicleType: 'all',
        vehicleMake: 'all',
        vehicleCapacity: 'all',
        maxPrice: 0
    })

    const [filteredData, setFilteredData] = useState([])

    const [allVehicle, setAllVehicle] = useState([])

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters })
    }

    const handleSearch = async (searchQuery) => {
        const updatedFilteredData = allVehicle.filter((vehicle) =>
            vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredData(updatedFilteredData)
    }

    const fetchAllVehicles = async () => {
        try {
            const response = await axios.get(`http://localhost:47367/api/Vehicle/alldata`)
            const newVehicleData = response.data.map((item, index) => ({
                key: `new-${index}`,
                name: `${item.vehicleMake.name} ${item.vehicleModel.name}`,
                imageSrc: Aqua,
                imageAlt: `${item.vehicleMake.name} ${item.vehicleModel.name}`,
                year: item.vehicleModel.year,
                make: item.vehicleMake.name,
                transmission: item.vehicle.transmission,
                capacity: `${item.vehicleModel.seatingCapacity} Persons`,
                price: item.vehicle.costPerDay.toString()
            }))

            setAllVehicle(newVehicleData)
            setFilteredData(newVehicleData)
        } catch (error) {
            console.error('Error fetching vehicle data:', error)
        }
    }

    useEffect(() => {
        fetchAllVehicles()
    }, [])

    useEffect(() => {
        const updatedFilteredData = allVehicle.filter((vehicle) => {
            if (filters.vehicleType !== 'all' && vehicle.type !== filters.vehicleType) return false
            if (filters.vehicleMake !== 'all' && vehicle.make !== filters.vehicleMake) return false
            if (filters.vehicleCapacity !== 'all' && vehicle.capacity !== filters.vehicleCapacity) return false
            if (parseInt(filters.maxPrice) > 0 && parseInt(vehicle.price) > parseInt(filters.maxPrice)) return false
            return true
        })

        setFilteredData(updatedFilteredData)
    }, [filters, allVehicle])

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
