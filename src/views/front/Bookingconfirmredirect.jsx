import RentalSummary from '../../components/front/RentalSummary'
import BookingForm from '../../components/front/VehicleFleetSingle/BookingForm'
import PaymentMethod from './PaymentMethod'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Bookingconfirmredirect() {
    const customerReservationId = useParams()
    const [rentalData, setRentalData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching rentals
                const response = await axios.get(`http://localhost:5062/api/FrontReservationService/view-booking`)
                setRentalData(response.data) // Assume the response data is the array of rentals
                console.log('Fetched Ongoing Rentals:', response.data)
            } catch (error) {
                console.error('Failed to fetch Ongoing Rentals:', error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="flex gap-5">
            <div className="flex flex-col w-3/5">
                <BookingForm
                    startDate={rentalData.startDate}
                    startTime={rentalData.startTime}
                    endDate={rentalData.endDate}
                    endTime={rentalData.endTime}
                />
                <div className="mt-5">
                    <PaymentMethod />
                </div>
            </div>
            <div className="flex flex-col w-2/5">
                <RentalSummary
                    make={rentalData.make}
                    modelName={rentalData.modelName}
                    deposit={rentalData.deposit}
                    extraKMCost={rentalData.extraKMCost}
                    penalty={rentalData.penalty}
                    rentalCost={rentalData.rentalCost}
                    amount={rentalData.amount}
                />
            </div>
        </div>
    )
}
