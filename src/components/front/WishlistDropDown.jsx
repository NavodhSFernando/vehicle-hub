import React from 'react'
import { Link } from 'react-router-dom'
import aqua from '../../assets/vehicles/aqua.png'

// Sample wishlist data - might want to pass this as a prop as well
const sampleWishlist = [
    {
        id: 'w1',
        name: 'Toyota Aqua',
        year: '2016',
        type: 'Hybrid',
        capacity: '4 Person',
        price: 'Rs 10,000/ day',
        imgSrc: aqua
    },
    {
        id: 'w2',
        name: 'Toyota C-HR',
        year: '2020',
        type: 'Hybrid',
        capacity: '4 Person',
        price: 'Rs 16,000/ day',
        imgSrc: aqua
    },
    {
        id: 'w3',
        name: 'Toyota C-HR',
        year: '2020',
        type: 'Hybrid',
        capacity: '4 Person',
        price: 'Rs 16,000/ day',
        imgSrc: aqua
    },
    {
        id: 'w4',
        name: 'Toyota C-HR',
        year: '2020',
        type: 'Hybrid',
        capacity: '4 Person',
        price: 'Rs 16,000/ day',
        imgSrc: aqua
    },
    {
        id: 'w5',
        name: 'Toyota C-HR',
        year: '2020',
        type: 'Hybrid',
        capacity: '4 Person',
        price: 'Rs 16,000/ day',
        imgSrc: aqua
    }
    // ... more wishlist items
]
// WishlistDropdown component
// WishlistDropdown component
const WishlistDropdown = ({ isOpen, setIsOpen, onNavigate }) => {
    // Make sure to remove the sampleWishlist prop if you're using the hardcoded data above

    return (
        // The dropdown menu
        isOpen && (
            <div className="absolute top-5 right-30 mt-12 w-64 bg-white rounded-lg shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                    <h3 className="font-bold">Wish List</h3>
                </div>
                
                {/* Scrollable list container */}
                <div className="overflow-y-auto wishlist-scrollbar" style={{ maxHeight: '17rem' }}>
                    {/* List of wishlist items */}
                    {sampleWishlist.slice(0, 4).map((item) => ( // changed to show only 3 items
                        <div key={item.id} className="flex items-center px-2 py-3 border-t border-gray-100">
                            <img className="w-[50px] h-full scale-x-[-1] mt-2 p-1" src={item.imgSrc} alt={item.name} />
                            <div className="flex-grow px-2">
                                <p className="font-bold text-gray-600">{item.name}</p>
                                <p className="text-sm text-gray-600">{`${item.year} | ${item.type} | ${item.capacity}`}</p>
                                <p className="text-sm text-gray-900">{item.price}</p>
                            </div>
                            <button
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => {
                                    // Implement the function to remove the item from wishlist here
                                    console.log(`Remove ${item.name}`);
                                }}
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
