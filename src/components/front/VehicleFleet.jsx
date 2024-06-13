import React, { useEffect, useState } from 'react'
import BookNowCard from './BookNowCard'
import BookingStrip from './BookingStrip/BookingStrip2'
import SearchStrip from './BookingStrip/SearchStrip'
import Aqua from '../../assets/vehicles/aqua.png'
import FilterCard from './Filtercard'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const VehicleFleet = () => {
    const location = useLocation();
    const { startDate, startTime, endDate, endTime } = location.state || {};

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
        const updatedFilteredData = allVehicle.filter(vehicle => vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()))
        setFilteredData(updatedFilteredData)
    }

    const handleDateFilter = async ({ startDate, startTime, endDate, endTime }) => {
        try {
            console.log("start date", startDate)
            console.log("start time", startTime)
            console.log("end date", endDate)
            console.log("end date", endTime)
            const response = await axios.get('http://localhost:47367/api/VehicleFilter/available', {
                params: { startDate, startTime, endDate, endTime }
            });
            const newVehicleData = response.data.map((item, index) => ({
                key: `new-${index}`,
                name: `${item.vehicleMake.name} ${item.vehicleModel.name}`,
                type:  `${item.vehicleType.name}`,
                imageSrc: Aqua,
                imageAlt: `${item.vehicleMake.name} ${item.vehicleModel.name}`,
                year: item.vehicleModel.year,
                make: item.vehicleMake.name,
                transmission: item.vehicle.transmission,
                capacity: `${item.vehicleModel.seatingCapacity} Persons`,
                price: item.vehicle.costPerDay.toString()
            }))

            setAllVehicle(newVehicleData);
            setFilteredData(newVehicleData);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    }

    const fetchAllVehicles = async () => {
        try {
            const response = await axios.get(`http://localhost:47367/api/Vehicle/alldata`);
            const newVehicleData = response.data.map((item, index) => ({
                key: `new-${index}`,
                name: `${item.vehicleMake.name} ${item.vehicleModel.name}`,
                type:  `${item.vehicleType.name}`,
                imageSrc: item.vehiclePhotos && item.vehiclePhotos.length > 0 && item.vehiclePhotos[0].imageData ? item.vehiclePhotos[0].imageData : Aqua,
                imageAlt: `${item.vehicleMake.name} ${item.vehicleModel.name}`,
                year: item.vehicleModel.year,
                make: item.vehicleMake.name,
                transmission: item.vehicle.transmission,
                capacity: `${item.vehicleModel.seatingCapacity} Persons`,
                price: item.vehicle.costPerDay.toString()
            }))
            setAllVehicle(newVehicleData);
            setFilteredData(newVehicleData);
        } catch (error) {
            console.error('Error fetching vehicle data:', error);
        }
    }

    useEffect(() => {
        fetchAllVehicles()
        if (startDate && startTime && endDate && endTime) {
            handleDateFilter({ startDate, startTime, endDate, endTime });
        }
    }, [])

    // useEffect(() => {
    //     if (startDate && startTime && endDate && endTime) {
    //         handleDateFilter({ startDate, startTime, endDate, endTime });
    //     }
    // }, [startDate, startTime, endDate, endTime]);

    useEffect(() => {
        const updatedFilteredData = allVehicle.filter(vehicle => {
            if (filters.vehicleType !== 'all' && vehicle.type !== filters.vehicleType) return false;
            if (filters.vehicleMake !== 'all' && vehicle.make !== filters.vehicleMake) return false;
            if (filters.vehicleCapacity !== 'all' && vehicle.capacity !== filters.vehicleCapacity) return false;
            if (parseInt(filters.maxPrice) > 0 && parseInt(vehicle.price) > parseInt(filters.maxPrice)) return false;
            return true;
        })

        setFilteredData(updatedFilteredData);
    }, [filters, allVehicle]);

    return (
        <div>
            <div className="flex flex-row justify-center gap-[30px]">
                <div>
                    <FilterCard onFilterChange={handleFilterChange} />
                </div>
                <div className="flex-col">
                    <SearchStrip onSearch={handleSearch}/>
                    <div className="mt-[20px]">
                        <BookingStrip onDateFilter={handleDateFilter} />
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
