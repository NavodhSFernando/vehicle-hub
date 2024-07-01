import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaStar } from 'react-icons/fa6'
import apiclient from '../../axiosConfig'

function Ongoingrentalssingle() {
    const { customerReservationId } = useParams()
    const [rating, setRating] = useState(0) // State for tracking the star rating
    const [status, setStatus] = useState('') // State for tracking the reservation status
    const [decrypt, setDecrypt] = useState('') // State for tracking the decrypted reservation ID
    const [rentalData, setRentalData] = useState({})
    const [totalFeedbacks, setTotalFeedbacks] = useState(0)
    const [averageRating, setAverageRating] = useState(0)

    const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'

    // Function to handle star click and update the rating state
    const handleStarClick = (value) => {
        setRating(value)
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
        const fetchDataAndFeedback = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching rentals
                const response = await apiclient.get(`/FrontReservationService/rental-history-single/${decrypt}`)
                setRentalData(response.data) // Assume the response data is the array of rentals
                setStatus(response.data.status)
                console.log('Fetched Rental History:', response.data)

                const response2 = await axios.get(
                    `http://localhost:5062/api/Feedback/vehicle/${response.data.vehicleId}`
                )
                const feedbacks = response2.data
                console.log('Fetched Feedbacks:', feedbacks)

                const totalFeedbacks = feedbacks.length
                const sumOfRatings = feedbacks.reduce((sum, feedback) => sum + feedback.feedback.ratingNo, 0)
                const averageRating = totalFeedbacks > 0 ? parseInt(sumOfRatings / totalFeedbacks) : 0

                setTotalFeedbacks(totalFeedbacks)
                setAverageRating(averageRating)
            } catch (error) {
                console.error('Failed to fetch Rental History:', error)
            }
        }
        if (decrypt) {
            fetchDataAndFeedback()
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

    const convertTo12HourFormat = (time) => {
        if (!time) return 'N/A' // Return 'N/A' or any appropriate default value if time is undefined or null

        let [hours, minutes] = time.split(':')
        hours = parseInt(hours, 10)
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12
        return `${hours}:${minutes} ${ampm}`
    }
    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mb-1 ">
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
                                <FaStar key={starIndex} color={starIndex < averageRating ? 'yellow' : 'grey'} />
                            ))}
                            {totalFeedbacks > 10 && <p className="text-gray-500 text-xs">10+ Reviews</p>}
                            {totalFeedbacks <= 10 && <p className="text-gray-500 text-xs">{totalFeedbacks} Reviews</p>}
                        </div>
                    </div>
                </div>
                <hr className="pb-3 border-t-2 border-stone-200" />

                <div className="pt-8 flex justify-between">
                    <p className="text-gray-500">Reservation ID </p>
                    <p className="font-semibold">{rentalData.customerReservationId}</p>
                </div>
                <div className="pt-3 flex justify-between">
                    <p className="text-gray-500">Pick-Up Date </p>
                    <p className="font-semibold">{rentalData.startDate}</p>
                </div>
                <div className="pt-3 flex justify-between">
                    <p className="text-gray-500">Pick-Up Time</p>
                    <p className="font-semibold">
                        {rentalData.startTime ? convertTo12HourFormat(rentalData.startTime) : 'N/A'}
                    </p>
                </div>
                <div className="pt-3 flex justify-between">
                    <p className="text-gray-500">Drop-Off Date</p>
                    <p className="font-semibold">{rentalData.endDate}</p>
                </div>
                <div className="pt-3 flex justify-between">
                    <p className="text-gray-500">Drop-Off Time</p>
                    <p className="font-semibold">
                        {rentalData.endTime ? convertTo12HourFormat(rentalData.endTime) : 'N/A'}
                    </p>
                </div>
                <div className="pt-3 flex justify-between">
                    <p className="text-gray-500">Reservation Status </p>
                    <button
                        className={`${getStatusColor(status)} rounded-xl font-semibold text-gray-50 text-xs pt-1 pb-1 pr-2 pl-2`}
                    >
                        {rentalData.status}
                    </button>
                </div>
                <div className="pt-3 flex justify-between pb-8">
                    <p className="text-gray-500">Deposit Amount</p>
                    <p className="font-semibold">{'Rs ' + rentalData.deposit}</p>
                </div>
                {rentalData.status !== 'Cancelled' && (
                    <>
                        <hr className="pb-3 border-t-2 border-stone-200" />

                        <div className="pt-8 flex justify-between">
                            <p className="text-gray-500">Extra Mileage Charge(per km)</p>
                            <p className="font-semibold">
                                {rentalData.extraKMCost ? 'Rs ' + rentalData.extraKMCost : '-'}
                            </p>
                        </div>
                        <div className="pt-3 flex justify-between">
                            <p className="text-gray-500">Penalty Fees</p>
                            <p className="font-semibold">{rentalData.penalty ? 'Rs ' + rentalData.penalty : '-'}</p>
                        </div>
                        <div className="pt-3 flex justify-between pb-8">
                            <p className="text-gray-500">Rental Charge</p>
                            <p className="font-semibold">
                                {rentalData.rentalCost ? 'Rs ' + rentalData.rentalCost : '-'}
                            </p>
                        </div>
                        <hr className="pb-3 border-t-2 border-stone-200" />

                        <div className="pt-3 flex justify-between">
                            <p className="text-gray-950 font-bold text-xl">Total Amount</p>
                            <p className="font-semibold text-3xl">{'Rs ' + rentalData.amount}</p>
                        </div>
                        <div className="text-gray-500 text-xs">
                            <p>Overall price including additions </p>
                            <p>and deductions.</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Ongoingrentalssingle
