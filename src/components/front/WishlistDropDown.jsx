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
    }
    // ... more wishlist items
]
// WishlistDropdown component
const WishlistDropdown = ({ isOpen, setIsOpen, onNavigate }) => {
    return (
        // The dropdown menu
        isOpen && (
            <div className="absolute top-5 right-35 mt-12 py-2 w-64 h-auto bg-white rounded-lg shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                    <h3 className="font-bold">Wish List</h3>
                </div>

                {/* List of wishlist items */}
                {sampleWishlist.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex items-center px-4 py-3 border-t border-gray-100">
                        <img className="w-[50px] h-full scale-x-[-1] mt-2" src={aqua} alt={item.name} />
                        <div className="flex-grow">
                            <p className="text-bold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{`${item.year} | ${item.type} | ${item.capacity}`}</p>
                            <p className="text-bold text-gray-900">{item.price}</p>
                        </div>
                        <button
                            className="ml-4 text-sm text-gray-400 hover:text-gray-500"
                            onClick={() => {
                                /* function to remove item from wishlist */
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}

                {/* 'View all' button :change this to the correct path of all wishlist items?*/}
                <Link to={'wishlist'}>
                    <button
                        onClick={() => {
                            onNavigate() // This should be a function passed as a prop for navigation
                            setIsOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                    >
                        View all
                    </button>
                </Link>
            </div>
        )
    )
}

export default WishlistDropdown
