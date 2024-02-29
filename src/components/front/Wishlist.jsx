import React from 'react'

export default function Wishlist() {
    return (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Wishlist</h2>
            <div className="space-y-4">
                <div className="bg-gray-100 rounded p-2">
                    <p>Toyota Aqua</p>
                    <p className="text-sm text-gray-600">2016 | Hybrid | 4 Person</p>
                    <p className="text-sm text-gray-500">Rs.10,000/day </p>
                </div>
                <div className="bg-gray-100 rounded p-2">
                    <p>Toyota Aqua</p>
                    <p className="text-sm text-gray-600">2016 | Hybrid | 4 Person</p>
                    <p className="text-sm text-gray-500">Rs.10,000/day</p>
                </div>
                <a href="/notifications" className="text-blue-600 hover:underline">
                    View all
                </a>
            </div>
        </div>
    )
}
