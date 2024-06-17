import React, { useEffect } from 'react'
import { BsBookmarkStar } from 'react-icons/bs'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { useState } from 'react'
import { IoCalendarClear } from 'react-icons/io5'
import { HiUsers } from 'react-icons/hi2'
import { RiSteering2Fill } from 'react-icons/ri'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function BookNowCard({
    key,
    id,
    name,
    make,
    type,
    year,
    transmission,
    capacity,
    imageSrc,
    imageAlt,
    price,
    logo
}) {
    const [clicked, setClicked] = useState(false)

    const customerId = Cookies.get('customerId')
    const navigate = useNavigate()

    useEffect(() => {
        const existingWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || []
        const index = existingWishlistItems.findIndex((item) => item.name === name)
        if (index !== -1) {
            setClicked(true)
        }
    }, [name])

    const handleClick = () => {
        const vehicleDetails = {
            key: key,
            id: id,
            name: name,
            type: type,
            year: year,
            transmission: transmission,
            capacity: capacity,
            imageSrc: imageSrc,
            imageAlt: imageAlt,
            price: price
        }

        const existingWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || []

        const areVehiclesEqual = (vehicle1, vehicle2) => {
            return (
                vehicle1.name === vehicle2.name &&
                vehicle1.type === vehicle2.type &&
                vehicle1.year === vehicle2.year &&
                vehicle1.transmission === vehicle2.transmission &&
                vehicle1.capacity === vehicle2.capacity &&
                vehicle1.imageSrc === vehicle2.imageSrc &&
                vehicle1.imageAlt === vehicle2.imageAlt &&
                vehicle1.price === vehicle2.price
            )
        }

        const index = existingWishlistItems.findIndex((item) => areVehiclesEqual(item, vehicleDetails))

        if (index === -1) {
            existingWishlistItems.push(vehicleDetails)
            setClicked(true)
        } else {
            existingWishlistItems.splice(index, 1)
            setClicked(false)
        }

        localStorage.setItem('wishlistItems', JSON.stringify(existingWishlistItems))
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
                {clicked && customerId ? (
                    <button>
                        <BsBookmarkStarFill fontSize={24} onClick={handleClick} />
                    </button>
                ) : !clicked && customerId ? (
                    <button>
                        <BsBookmarkStar fontSize={24} onClick={handleClick} />
                    </button>
                ) : null}
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
                    onClick={() => navigate(`/vehiclefleet/${id}`)}
                >
                    View
                </button>
            </article>
        </div>
    )
}
