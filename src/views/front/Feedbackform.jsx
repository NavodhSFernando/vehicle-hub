import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/ui/button'
import axios from 'axios'
import { FaStar } from 'react-icons/fa6'
import { useParams } from 'react-router-dom';

export default function FeedbackForm() {
    const [iconSize, setIconSize] = useState(window.innerWidth <= 768 ? 15 : 30)
    const [value, setValue] = useState(0)
    const { reservationId } = useParams();

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
            const FeedbackRequest = {
                Designation: data.designation,
                RatingNo: parseInt(data.rating),
                Service_Review: data.serviceReview,
                Vehicle_Review: data.vehicleReview,
                CustomerReservationId: reservationId
            }
            const response = await axios.post('http://localhost:47367/api/Feedback', FeedbackRequest)
            console.log(response.data)
            alert(response.data)
        } catch (error) {
            console.error('Error submitting feedback:', error)
            alert('Error submitting feedback')
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
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-300 pb-4 pt-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto pt-10 pb-10 pl-20 pr-20">
                <button
                    onClick={() => console.log('Close the form')}
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-500"
                >
                    <span className="text-2xl">×</span>
                </button>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Please Provide your Feedback</h2>
                    <p className="text-sm text-gray-500">
                        Your feedback is greatly valued as it gives us the opportunity to serve you better.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            {...register('username')}
                            id="name"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500"
                            placeholder="Alex Fernando"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="designation" className="block text-gray-700 font-semibold mb-2">
                            Designation
                        </label>
                        <input
                            {...register('designation')}
                            id="designation"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 mb-3"
                            placeholder="A12345670"
                            required
                        />
                    </div>
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
                        <textarea
                            {...register('vehicleReview')}
                            id="vehicleReview"
                            className="w-full px-3 py-8 border border-gray-300 rounded-lg text-sm text-gray-500 mb-4"
                            placeholder="'Efficient Toyota Aqua: Economical, compact, and eco-friendly hybrid.'"
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="serviceReview" className="block text-gray-700 font-semibold mb-2">
                            Service Review
                        </label>
                        <textarea
                            {...register('serviceReview')}
                            id="serviceReview"
                            className="w-full px-3 py-8 border border-gray-300 rounded-lg text-sm text-gray-500"
                            placeholder="'Service: Exceptional, reliable, and efficient for Toyota Aqua car rental.'"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Button
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-800 text-amber-100 font-semibold rounded py-2 px-10 transition-colors duration-300 mt-4"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
