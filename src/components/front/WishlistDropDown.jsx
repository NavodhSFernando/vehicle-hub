import React, { useEffect, useState } from 'react'
import aqua from '../../assets/vehicles/aqua.png'

const WishlistDropdown = ({ isOpen }) => {
    const [wishlistItems, setWishlistItems] = useState([])

    const updateWishlist = (wishlistItems) => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
        const event = new CustomEvent('wishlistUpdated', { detail: wishlistItems })
        window.dispatchEvent(event)
    }

    const getWishlist = () => {
        return JSON.parse(localStorage.getItem('wishlistItems')) || []
    }

    useEffect(() => {
        setWishlistItems(getWishlist())

        const handleWishlistUpdate = (event) => {
            setWishlistItems(event.detail)
        }

        window.addEventListener('wishlistUpdated', handleWishlistUpdate)

        return () => {
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
        }
    }, [])

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
    
    const handleRemoveFromWishlist = (vehicleDetails) => {
        const updatedWishlistItems = wishlistItems.filter((item) => !areVehiclesEqual(item, vehicleDetails))
        updateWishlist(updatedWishlistItems)
    }

    return (
        isOpen && (
             <div className="absolute top-5 right-[150px] mt-12 w-[384px] bg-white rounded-lg shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                    <h3 className="font-bold">Wish List</h3>
                </div>
                <div className="overflow-y-auto wishlist-scrollbar" style={{ maxHeight: '17rem' }}>
                {wishlistItems.length === 0 ? (
                        <div className="flex items-center px-[20px] py-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600">No Items Added</p>
                        </div>
                    ) : (
                        wishlistItems.map((item) => (
                            <div key={item.id} className="flex items-center px-[20px] py-3 border-t border-gray-100">
                                <img className="w-[50px] h-full scale-x-[-1] mt-2 p-1" src={aqua} alt={item.name} />
                                <div className="flex-grow px-2 ml-[30px]">
                                    <p className="font-bold text-gray-600">{item.name}</p>
                                    <p className="text-sm text-gray-600">{`${item.year} | ${item.type} | ${item.capacity}`}</p>
                                    <p className="text-sm text-gray-900 mt-[10px]">{item.price}</p>
                                </div>
                                <button
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={() => handleRemoveFromWishlist(item)}
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <style>
                    {`
                        .wishlist-scrollbar::-webkit-scrollbar {
                            width: 4px;
                        }
                        .wishlist-scrollbar::-webkit-scrollbar-track {
                            background: #f1f1f1;
                        }
                        .wishlist-scrollbar::-webkit-scrollbar-thumb {
                            background: #888;
                            border-radius: 4px;
                        }
                        .wishlist-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: #553;
                        }
                        .wishlist-scrollbar {
                            -ms-overflow-style: none; /* IE and Edge */
                            scrollbar-width: thin; /* Firefox */
                            scrollbar-color: #888 #f1f1f1; /* Firefox */
                        }
                    `}
                </style>
            </div>
        )
    )
}

export default WishlistDropdown
