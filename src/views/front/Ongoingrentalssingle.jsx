import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from '../../components/ui/button'
import { FaStar } from 'react-icons/fa6'

export default function Ongoingrentalssingle() {
    const { customerReservationId } = useParams()
    const [rating, setRating] = useState(0) // State for tracking the star rating
    const [status, setStatus] = useState('') // State for tracking the reservation status
    const [decrypt, setDecrypt] = useState('') // State for tracking the decrypted reservation ID
    const [rentalData, setRentalData] = useState({}) // State for tracking rental data

    const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'

    // Function to handle star click and update the rating state
    const handleStarClick = (value) => {
        setRating(value)
    }

    const handleCancel = async () => {
        try {
            const response = await axios.post()
            console.log('Reservation Cancelled:', response.data)
        } catch (error) {
            console.error('Failed to cancel reservation:', error)
        }
    }

    useEffect(() => {
        const decryptId = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5062/api/Encryption/decrypt/${customerReservationId}`
                )
                setDecrypt(response.data.decryptedUserId)
            } catch (error) {
                console.error('Failed to decrypt reservation ID:', error)
            }
        }
        decryptId()
    }, [customerReservationId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5062/api/FrontReservationService/ongoing-rental-single/${decrypt}`
                )
                setRentalData(response.data) // Assume the response data is the rental data
                setStatus(response.data.status)
            } catch (error) {
                console.error('Failed to fetch Ongoing Rentals:', error)
            }
        }
        if (decrypt) {
            fetchData()
        }
    }, [decrypt])

    const getStatusColor = (status) => {
        switch (status) {
            case 'Waiting':
                return 'bg-yellow-500'
            case 'Pending':
                return 'bg-blue-500'
            case 'Confirmed':
                return 'bg-green-500'
            case 'Ongoing':
                return 'bg-purple-500'
            case 'Ended':
                return 'bg-orange-500'
            case 'Completed':
                return 'bg-green-700'
            case 'Cancelled':
                return 'bg-red-500'
            default:
                return 'bg-gray-500'
        }
    }

    return (
        <>
            <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mb-1">
                <div className="my-16 lg:mx-36">
                    <h3 className="pb-6 text-l text-gray-950 font-semibold">Rental Summary</h3>
                    <div className="flex items-center">
                        <img
                            src={rentalData.thumbnail ? `${baseUrl}${rentalData.thumbnail}` : null}
                            alt="car"
                            className="w-40 mr-12"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold text-gray-950 mb-1">
                                {rentalData.make} {rentalData.modelName}
                            </h1>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, starIndex) => (
                                    <FaStar key={starIndex} color={starIndex < rating ? 'yellow' : 'grey'} />
                                ))}
                                <p className="text-gray-500 text-xs">10+ Reviewer</p>
                            </div>
                        </div>
                    </div>
                    <hr className="pb-3 border-t-2 border-stone-200 mx-5" />
                    <div className="pt-8 flex justify-between">
                        <p className="text-gray-500">Reservation ID</p>
                        <p className="font-semibold">{rentalData.customerReservationId}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Pick-Up Date</p>
                        <p className="font-semibold">{rentalData.startDate}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Pick-Up Time</p>
                        <p className="font-semibold">{rentalData.startTime}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Drop-Off Date</p>
                        <p className="font-semibold">{rentalData.endDate}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Drop-Off Time</p>
                        <p className="font-semibold">{rentalData.endTime}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Reservation Status</p>
                        <button
                            className={`${getStatusColor(status)} rounded-xl font-semibold text-gray-50 text-xs pt-1 pb-1 pr-2 pl-2`}
                        >
                            {rentalData.status}
                        </button>
                    </div>
                </div>
            </div>
            {(rentalData.status == 'Waiting' || rentalData.status == 'Pending' || rentalData.status == 'Confirmed') && (
                <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mt-3 mb-8">
                    <div className="mr-20 ml-20 my-10 lg:mx-36">
                        <p className="text-xs text-gray-500 flex items-start pb-3">
                            Please refer to the Reservation Policy for further details
                        </p>
                        <p className="text-s text-gray-500 flex items-start font-semibold pb-3">
                            *Reservation Cancellation made three(3) days or less prior to arrival date are
                            non-refundable
                        </p>
                        <hr className="pb-3" />
                        <Button variant="destructive" onclick={() => handleCancel()}>
                            Cancel Reservation
                        </Button>
                        <div className="flex items-start">
                            <div className="mt-6 text-s text-gray-500 flex items-start font-semibold mr-1">
                                Feel free to contact
                            </div>
                            <div className="mt-6 text-s text-indigo-800 flex items-start font-semibold mr-1">
                                vehiclehub@example.com
                            </div>
                            <div className="mt-6 text-s text-gray-500 flex items-start font-semibold">
                                with any questions.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
