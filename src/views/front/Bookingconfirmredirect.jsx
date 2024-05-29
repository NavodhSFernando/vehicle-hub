import RentalSummary from '../../components/front/RentalSummary'
import BookingForm from '../../components/front/VehicleFleetSingle/BookingForm'
import PaymentMethod from './PaymentMethod'
import React from 'react'

export default function Bookingconfirmredirect() {
    return (
        <div className="flex gap-5">
            <div className="flex flex-col w-3/5">
            <BookingForm />
                <div className="my-8"></div> {/* Line break/space after BookingForm */}
            <PaymentMethod />
            </div>
            <div className="flex flex-col w-2/5">
                <RentalSummary />
            </div>
        </div>
    )
}
