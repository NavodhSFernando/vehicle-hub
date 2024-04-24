import React, { useEffect, useState } from 'react'
import aqua from '../../assets/vehicles/aqua.png'

const WishlistDropdown = ({ isOpen, setIsOpen, onNavigate }) => {
    const [wishlistItems, setWishlistItems] = useState([])

    useEffect(() => {
        const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || []
        setWishlistItems(storedWishlistItems)
    }, [])

    const handleRemoveFromWishlist = (itemName) => {
        const updatedWishlistItems = wishlistItems.filter((item) => item.name !== itemName)
        setWishlistItems(updatedWishlistItems)
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems))
    }

    return (
        // The dropdown menu
        isOpen && (
            <div className="absolute top-5 right-[50px] mt-12 w-[384px] bg-white rounded-lg shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                    <h3 className="font-bold">Wish List</h3>
                </div>

                {/* Scrollable list container */}
                <div className="overflow-y-auto wishlist-scrollbar" style={{ maxHeight: '17rem' }}>
                    {/* List of wishlist items */}
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="flex items-center px-[20px] py-3 border-t border-gray-100">
                            <img className="w-[50px] h-full scale-x-[-1] mt-2 p-1" src={aqua} alt={item.name} />
                            <div className="flex-grow px-2 ml-[30px]">
                                <p className="font-bold text-gray-600">{item.name}</p>
                                <p className="text-sm text-gray-600">{`${item.year} | ${item.type} | ${item.capacity}`}</p>
                                <p className="text-sm text-gray-900 mt-[10px]">{item.price}</p>
                            </div>
                            <button
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => handleRemoveFromWishlist(item.name)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
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
