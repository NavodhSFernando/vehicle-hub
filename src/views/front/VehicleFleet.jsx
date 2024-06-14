import React, { useEffect, useState } from 'react'
import BookNowCard from '../../components/front/BookNowCard'
import BookingStrip2 from '../../components/front/BookingStrip/BookingStrip2'
import SearchStrip from '../../components/front/BookingStrip/SearchStrip'
import Aqua from '../../assets/vehicles/aqua.png'
import FilterCard from '../../components/front/Filtercard'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const VehicleFleet = () => {
    const [vehicleData, setVehicleData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [allVehicle, setAllVehicle] = useState([])
    const [filters, setFilters] = useState({
        vehicleType: 'all',
        vehicleMake: 'all',
        vehicleCapacity: 'all',
        maxPrice: 0
    })

    const location = useLocation();
    const { startDate, startTime, endDate, endTime } = location.state || {};

    const fetchData = async () => {
        try {
            // Update the URL to your specific API endpoint for fetching vehicles
            const response = await axios.get('http://localhost:5062/api/FrontVehicleService/Details')
            setVehicleData(response.data) 
            setAllVehicle(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch vehicle data:', error)
        }
    }

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters })
    }

    const handleSearch = async (searchQuery) => {
        const updatedFilteredData = allVehicle.filter(vehicle => vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()))
        setFilteredData(updatedFilteredData)
    }

    const handleDateFilter = async ({ startDate, startTime, endDate, endTime }) => {
        try {
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
    }, [])

    useEffect(() => {
        if (startDate && startTime && endDate && endTime) {
            handleDateFilter({ startDate, startTime, endDate, endTime });
        }
    }, [startDate, startTime, endDate, endTime]);

    useEffect(() => {
        const updatedFilteredData = allVehicle.filter(vehicle => {
            if (filters.vehicleType !== 'all' && vehicle.type !== filters.vehicleType) return false;
            if (filters.vehicleMake !== 'all' && vehicle.make !== filters.vehicleMake) return false;
            if (filters.vehicleCapacity !== 'all' && vehicle.capacity !== filters.vehicleCapacity) return false;
            if (parseInt(filters.maxPrice) > 0 && parseInt(vehicle.price) > parseInt(filters.maxPrice)) return false;
            return true;
        })

        setFilteredData(updatedFilteredData);
    }, [filters, vehicleData])

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
                    <BookingStrip2 onDateFilter={handleDateFilter} />
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
