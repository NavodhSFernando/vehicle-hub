import React, { useEffect, useState } from 'react'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { IoCalendarClear } from 'react-icons/io5'
import { HiUsers } from 'react-icons/hi2'
import { RiSteering2Fill } from 'react-icons/ri'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function BookNowCard({
    id,
    name,
    type,
    year,
    transmission,
    capacity,
    imageSrc,
    imageAlt,
    price,
    logo,
    startDate,
    startTime,
    endDate,
    endTime
}) {
    const [clicked, setClicked] = useState(false)

    const updateWishlist = (wishlistItems) => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
        const event = new CustomEvent('wishlistUpdated', { detail: wishlistItems })
        window.dispatchEvent(event)
    }

    const getWishlist = () => {
        return JSON.parse(localStorage.getItem('wishlistItems')) || []
    }

    const customerId = Cookies.get('customerId')
    const navigate = useNavigate()

    useEffect(() => {
        const existingWishlistItems = getWishlist()
        const isInWishlist = existingWishlistItems.some((item) => item.id === id)
        setClicked(isInWishlist)

        const handleWishlistUpdate = (event) => {
            const updatedWishlist = event.detail
            const isInUpdatedWishlist = updatedWishlist.some((item) => item.id === id)
            setClicked(isInUpdatedWishlist)
        }

        window.addEventListener('wishlistUpdated', handleWishlistUpdate)

        return () => {
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
        }
    }, [id])

    const handleClick = () => {
        const vehicleDetails = {
            id,
            name,
            type,
            year,
            imageSrc,
            transmission,
            price,
            capacity
        }

        const existingWishlistItems = getWishlist()
        const areVehiclesEqual = (vehicle1, vehicle2) => {
            return vehicle1.id === vehicle2.id
        }

        const index = existingWishlistItems.findIndex((item) => areVehiclesEqual(item, vehicleDetails))

        if (index === -1) {
            const updatedWishlistItems = [...existingWishlistItems, vehicleDetails]
            updateWishlist(updatedWishlistItems)
            setClicked(true)
        } else {
            const updatedWishlistItems = existingWishlistItems.filter((item) => !areVehiclesEqual(item, vehicleDetails))
            updateWishlist(updatedWishlistItems)
            setClicked(false)
        }
    }

    return (
        <div className="w-[317px] flex flex-col p-5 shadow-xl rounded-xl bg-white">
            <div className="flex justify-between pb-12 align-top">
                <div className="flex">
                    <img className="w-9 h-9" src={logo} alt="Logo" />
                    <div className="flex flex-col ml-2">
                        <h1 className="text-xl font-bold">{name}</h1>
                        <p className="text-base opacity-50 font-semibold">{type}</p>
                    </div>
                </div>
                {customerId && (
                    <button onClick={handleClick}>
                        {clicked ? <BsBookmarkStarFill fontSize={24} /> : <BsBookmarkStar fontSize={24} />}
                    </button>
                )}
            </div>
            <img className="w-full booknowimage pb-12 scale-x" src={imageSrc} alt={imageAlt} />
            <div className="flex justify-between pb-8">
                <span className="flex gap-1 items-center">
                    <IoCalendarClear fontSize={20} style={{ color: '#90A3BF' }} />
                    <p className="text-sm opacity-50">{year}</p>
                </span>
                <span className="flex gap-1 items-center">
                    <RiSteering2Fill fontSize={20} style={{ color: '#90A3BF' }} />
                    <p className="text-sm opacity-50">{transmission}</p>
                </span>
                <span className="flex gap-1 items-center">
                    <HiUsers fontSize={20} style={{ color: '#90A3BF' }} />
                    <p className="text-sm opacity-50">{capacity}</p>
                </span>
            </div>
            <article className="flex justify-between items-center">
                <span>
                    <h1 className="text-base font-bold">
                        {price}
                        <span className="text-sm opacity-50"> / Day</span>
                    </h1>
                    <p className="text-sm opacity-50 font-semibold">100Km/day</p>
                </span>
                <button
                    className="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] w-fit focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={() => navigate(`/vehiclefleet/${id}`, { state: { startDate, startTime, endDate, endTime } })}
                >
                    View
                </button>
            </article>
        </div>
    )
}
