import React, { useEffect, useState } from 'react'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { Button } from '../../ui/button'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useToast } from '../../ui/use-toast'
import apiclient from '../../../axiosConfig'

export default function Detailcar({ id, sdate, stime, edate, etime, imageSrc }) {
    const [clicked, setClicked] = useState(false)
    const [wishlistclick, setwishlistclick] = useState(false)
    const [totalFeedbacks, setTotalFeedbacks] = useState(0)
    const [averageRating, setAverageRating] = useState(0)
    const [isChecked, setIsChecked] = useState(false)
    const [vehicleData, setVehicleData] = useState({})
    const { toast } = useToast()
    const navigate = useNavigate()

    const customerId = Cookies.get('customerId')

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked)
    }

    const handleRequestVehicle = async () => {
        if (!isChecked) {
            return toast({
                variant: 'destructive_border',
                description: 'Please agree to the Terms and Conditions to proceed'
            })
        }
        if (!customerId) {
            console.error('Customer ID not found in cookies')
            navigate('/login')
        }

        try {
            const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${customerId}`)
            const decryptedId = decryptResponse.data.decryptedUserId

            const url = `/FrontReservationService/request-reservation`
            const formData = {
                VehicleId: id,
                CustomerId: decryptedId,
                Reservation: {
                    StartDate: sdate,
                    StartTime: stime,
                    EndDate: edate,
                    EndTime: etime
                }
            }
            const response = await apiclient.post(url, formData)

            toast({
                variant: 'success',
                description: 'Vehicle requested successfully'
            })

            console.log('Request vehicle response:', response.data)
            navigate(`/account/viewongoingrentals`)
        } catch (error) {
            navigate('/login')
        }
    }

    //wishlist
    const updateWishlist = (wishlistItems) => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
        const event = new CustomEvent('wishlistUpdated', { detail: wishlistItems })
        window.dispatchEvent(event)
    }

    const getWishlist = () => {
        return JSON.parse(localStorage.getItem('wishlistItems')) || []
    }

    const areVehiclesEqual = (vehicle1, vehicle2) => {
        console.log(vehicle1.id + '==' + vehicle2.id)
        return vehicle1.id == vehicle2.id
    }

    const handleClick = () => {
        const vehicleDetails = {
            id: parseInt(id),
            name: vehicleData.model,
            type: vehicleData.fuelType,
            year: vehicleData.year,
            imageSrc: imageSrc,
            transmission: vehicleData.transmission,
            price: vehicleData.costPerDay,
            capacity: vehicleData.seatingCapacity
        }

        const existingWishlistItems = getWishlist()

        const index = existingWishlistItems.findIndex((item) => areVehiclesEqual(item, vehicleDetails))
        console.log('index->' + index)
        if (index == -1) {
            const updatedWishlistItems = [...existingWishlistItems, vehicleDetails]
            updateWishlist(updatedWishlistItems)
            setClicked(true)
        } else {
            const updatedWishlistItems = existingWishlistItems.filter((item) => !areVehiclesEqual(item, vehicleDetails))
            updateWishlist(updatedWishlistItems)
            setClicked(false)
        }
    }

    const handleWishlistUpdate = (event) => {
        const updatedWishlist = event.detail
        const isInUpdatedWishlist = updatedWishlist.some((item) => item.id === id)
        setClicked(isInUpdatedWishlist)
    }

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await axios.get(`http://localhost:5062/api/FrontReservationService/DetailCar/${id}`)
                setVehicleData(response.data)
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching vehicle data:', error)
            }
        }

        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`http://localhost:5062/api/Feedback/vehicle/${id}`)
                const feedbacks = response.data

                const totalFeedbacks = feedbacks.length
                const sumOfRatings = feedbacks.reduce((sum, feedback) => sum + feedback.feedback.ratingNo, 0)
                const averageRating = totalFeedbacks > 0 ? parseInt(sumOfRatings / totalFeedbacks) : 0

                setTotalFeedbacks(totalFeedbacks)
                setAverageRating(averageRating)
            } catch (error) {
                console.error('Error fetching feedbacks:', error)
            }
        }
        fetchVehicleData()
        fetchFeedbacks()

        //wishlist
        const existingWishlistItems = getWishlist()
        const isInWishlist = existingWishlistItems.some((item) => item.id == id)
        setClicked(isInWishlist)

        window.addEventListener('wishlistUpdated', handleWishlistUpdate)

        return () => {
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
        }
    }, [id])

    return (
        <div className="w-full bg-white p-6 rounded-lg">
            {/* Header */}
            <article className="w-full flex justify-between pb-7 p">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-gray-950 mb-1">
                        {vehicleData.make} {vehicleData.model}
                    </h1>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, starIndex) => (
                            <FaStar key={starIndex} color={starIndex < averageRating ? 'yellow' : 'grey'} />
                        ))}
                        {totalFeedbacks > 10 && <p className="text-gray-500 text-xs">10+ Reviewers</p>}
                        {totalFeedbacks <= 10 && <p className="text-gray-500 text-xs">{totalFeedbacks} Reviewers</p>}
                    </div>
                </div>
                <div className="mt-1">
                    {
                        <button onClick={handleClick}>
                            {clicked ? <BsBookmarkStarFill fontSize={24} /> : <BsBookmarkStar fontSize={24} />}
                        </button>
                    }
                </div>
            </article>
            {/* Specification */}
            <div className="w-full pb-14">
                <p className="text-sm text-slate-500 uppercase">Specification</p>
                <div className="p-2 flex gap-10">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Transmission</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{vehicleData.transmission}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Capacity</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{vehicleData.seatingCapacity}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Engine Capacity</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">
                                {vehicleData.engineCapacity + 'cc'}
                            </p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Mileage</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{vehicleData.mileage + 'km'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-2/5">Fuel</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{vehicleData.fuelType}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-2/5">Year</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{vehicleData.year}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-2/5">Colour</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{vehicleData.colour}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Rental Info */}
            <div className="w-full pb-14">
                <p className="text-sm text-slate-500 uppercase">Rental Info</p>
                <div className="p-2 flex gap-10">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Start Date</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{sdate}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Start Time</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{stime}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-2/5">End Date</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{edate}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-2/5">End Time</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{etime}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Rates */}
            <div className="w-full max-w-[480px]">
                <p className="text-sm text-slate-500 uppercase">Rates</p>
                <div className="p-3">
                    <h1 className="text-3xl font-bold pb-2 w-full border-b border-black mb-4">
                        {'Rs ' + vehicleData.costPerDay} / <span className="text-slate-500">day</span>
                    </h1>
                    <div className="flex flex-col pb-14">
                        <span className="flex gap-2 items-center mb-2">
                            <button className="w-[73px] flex justify-center rounded border border-black" disabled>
                                <p className="text-sm">100 Km</p>
                            </button>
                            <p>Daily Mileage Limit</p>
                        </span>
                        <span className="flex gap-2 items-center">
                            <button className="w-[73px] flex justify-center rounded border border-black" disabled>
                                <p className="text-sm">{'Rs' + vehicleData.costPerExtraKM}</p>
                            </button>
                            <p>Extra Mileage Charge (per km)</p>
                        </span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-blue-100 rounded-lg mb-8 shadow-sm">
                        <input
                            type="checkbox"
                            className="rounded text-blue-500 focus:ring-blue-400 focus:ring-2 focus:ring-offset-0"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            id="termsCheckbox"
                        />
                        <label
                            htmlFor="termsCheckbox"
                            className="text-sm leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold"
                        >
                            I agree to Terms and Conditions
                        </label>
                    </div>

                    <Button
                        className="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-full rounded-lg text-sm"
                        onClick={handleRequestVehicle}
                    >
                        Request Vehicle
                    </Button>
                </div>
            </div>
        </div>
    )
}
