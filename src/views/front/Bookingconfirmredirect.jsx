// Bookingconfirmredirect.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RentalSummary from '../../components/front/RentalSummary'
import BookingForm from '../../components/front/VehicleFleetSingle/BookingForm'
import PaymentMethod from './PaymentMethod'
import PageNotFound from '../../components/front/PageNotFound'
import apiclient from '../../axiosConfig'

export default function Bookingconfirmredirect() {
    const { invoiceId } = useParams()
    const [rentalData, setRentalData] = useState({})
    const [decryptedId, setDecryptedId] = useState()

    useEffect(() => {
        const fetchDecrypedIdAndData = async () => {
            try {
                const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${invoiceId}`)
                const decryptedId = decryptResponse.data.decryptedUserId

                const response = await axios.get(
                    `http://localhost:5062/api/FrontReservationService/view-booking-confirmation/${decryptedId}`
                )
                setDecryptedId(decryptedId)
                setRentalData(response.data)
                console.log('Fetched Booking Confirmation:', response.data)
            } catch (error) {
                console.error('Failed to fetch Booking Confirmation:', error)
            }
        }
        fetchDecrypedIdAndData()
    }, [invoiceId])

    console.log('Rental Data:', rentalData)
    if (!rentalData.startTime) {
        console.log('No rental data')
        return <PageNotFound />
    }
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
                        customerReservationId={rentalData.customerReservationId}
                        invoiceId={decryptedId}
                        amount={rentalData.amount}
                        invoiceType={rentalData.invoiceType}
                    />
                </div>
            </div>
            <div className="flex flex-col w-2/5">
                <RentalSummary
                    id={rentalData.vehicleId}
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
