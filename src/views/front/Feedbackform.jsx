import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/ui/button'
import axios from 'axios'
import { FaStar } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'

export default function FeedbackForm() {
    const [iconSize, setIconSize] = useState(window.innerWidth <= 768 ? 15 : 30)
    const [value, setValue] = useState(0)
    const [notification, setNotification] = useState(null)
    const { customerReservationId } = useParams()
    const navigate = useNavigate()

    const handleRatingChange = (newValue) => {
        setValue(newValue)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm()

    const onSubmit = async (data) => {
        try {
            if (data.rating == null || data.serviceReview == null || data.vehicleReview == null) {
                setNotification({ message: 'Please fill all fields.', type: 'error' })
            } else {
                const decrypt = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${customerReservationId}`)
                const decryptedId = decrypt.data.decryptedUserId

                const FeedbackRequest = {
                    RatingNo: parseInt(data.rating),
                    Service_Review: data.serviceReview,
                    Vehicle_Review: data.vehicleReview,
                    CustomerReservationId: decryptedId
                }

                const response = await axios.post('http://localhost:5062/api/Feedback', FeedbackRequest)
                setNotification({ message: response.data.message, type: 'success' })
            }
        } catch (error) {
            console.error('Error submitting feedback:', error)
            setNotification({ message: 'Error submitting feedback', type: 'error' })
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIconSize(window.innerWidth <= 768 ? 15 : 30)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="flex items-center justify-center w-full min-h-screen pb-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto pt-10 pb-10 pl-20 pr-20">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Please Provide your Feedback</h2>
                    <p className="text-sm text-gray-500">
                        Your feedback is greatly valued as it gives us the opportunity to serve you better.
                    </p>
                    <p className="mt-4">
                        Please note that your feedback, along with your name, will be displayed on the specific
                        vehicle's details page.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                    <div className="mb-4">
                        <label htmlFor="vehicleRating" className="block text-gray-700 font-semibold mb-2">
                            Vehicle Rating
                        </label>
                        <div className="flex gap-[10px] mb-6">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1
                                return (
                                    <label key={index} className="flex">
                                        <input
                                            {...register('rating')}
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            checked={ratingValue === value}
                                            onChange={() => handleRatingChange(ratingValue)}
                                            style={{
                                                position: 'absolute',
                                                opacity: 0,
                                                width: '1px',
                                                height: '1px',
                                                overflow: 'hidden'
                                            }}
                                        />
                                        <FaStar size={iconSize} color={ratingValue <= value ? '#fcee4e' : '#bfbebb'} />
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vehicleReview" className="block text-gray-700 font-semibold mb-2">
                            Vehicle Review
                        </label>
                        <select
                            {...register('vehicleReview')}
                            id="vehicleReview"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 mb-4"
                        >
                            <option value="" disabled selected>
                                Select a review
                            </option>
                            <option value="Efficient and Reliable">Efficient and Reliable</option>
                            <option value="Comfortable Ride">Comfortable Ride</option>
                            <option value="Good Fuel Efficiency">Good Fuel Efficiency</option>
                            <option value="Needs Maintenance">Needs Maintenance</option>
                            <option value="Not Satisfied">Not Satisfied</option>
                        </select>
                    </div>
                    <div className="mb-8">
                        <label htmlFor="serviceReview" className="block text-gray-700 font-semibold mb-2">
                            Service Review
                        </label>
                        <select
                            {...register('serviceReview')}
                            id="serviceReview"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500"
                        >
                            <option value="" disabled selected>
                                Select a review
                            </option>
                            <option value="Exceptional Service">Exceptional Service</option>
                            <option value="Very Good">Very Good</option>
                            <option value="Satisfactory">Satisfactory</option>
                            <option value="Could Be Better">Could Be Better</option>
                            <option value="Poor Service">Poor Service</option>
                        </select>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <Button
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-800 text-amber-100 font-semibold rounded py-2 px-10 transition-colors duration-300 mt-4"
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => {
                                navigate('/')
                            }}
                            className="bg-blue-900 hover:bg-blue-800 text-amber-100 font-semibold rounded py-2 px-10 transition-colors duration-300 mt-4"
                        >
                            Home
                        </Button>
                    </div>
                </form>
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </div>
        </div>
    )
}

const Notification = ({ message, type, onClose }) => {
    const navigate = useNavigate()

    const handleOkClick = () => {
        if (type === 'success') {
            navigate('/')
        } else {
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                className={`p-6 rounded shadow-lg ${type === 'success' ? 'text-green-500' : 'text-red-500'} bg-white w-1/3 text-center relative`}
            >
                <p className="text-[25px]">{message}</p>
                <button
                    onClick={handleOkClick}
                    className="bg-blue-900 hover:bg-blue-800 text-amber-100 font-semibold rounded py-2 px-10 transition-colors duration-300 mt-6"
                >
                    Ok
                </button>
            </div>
        </div>
    )
}
