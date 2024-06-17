// Bookingconfirmredirect.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RentalSummary from '../../components/front/RentalSummary'
import BookingForm from '../../components/front/VehicleFleetSingle/BookingForm'
import PaymentMethod from './PaymentMethod'

export default function Bookingconfirmredirect() {
    const { invoiceId } = useParams()
    const [rentalData, setRentalData] = useState({})

    useEffect(() => {
        const fetchDecrypedIdAndData = async () => {
            try {
                const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${invoiceId}`)
                const decryptedId = decryptResponse.data.decryptedUserId

                const response = await axios.get(
                    `http://localhost:5062/api/FrontReservationService/view-booking-confirmation/${decryptedId}`
                )
                setRentalData(response.data)
                console.log('Fetched Booking Confirmation:', response.data)
            } catch (error) {
                console.error('Failed to fetch Booking Confirmation:', error)
            }
        }
        fetchDecrypedIdAndData()
    }, [invoiceId])

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
                    <PaymentMethod
                        invoiceId={invoiceId}
                        amount={rentalData.amount}
                        invoiceType={rentalData.invoiceType}
                    />
                </div>
            </div>
            <div className="flex flex-col w-2/5">
                <RentalSummary
                    make={rentalData.make}
                    modelName={rentalData.modelName}
                    thumbnail={rentalData.thumbnail}
                    deposit={rentalData.deposit}
                    extraKMCost={rentalData.extraKMCost}
                    penalty={rentalData.penalty}
                    rentalCost={rentalData.rentalCost}
                    amount={rentalData.amount}
                    type={rentalData.invoiceType}
                />
            </div>
        </div>
    )
}
