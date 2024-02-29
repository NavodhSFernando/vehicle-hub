import React from 'react'

export default function Notification() {
    return (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Notification</h2>
            <div className="space-y-4">
                <div className="bg-gray-100 rounded p-2">
                    <p>Reservation confirmed.</p>
                    <p className="text-sm text-gray-600">CBI-2345 vehicle has been allocated for your reservation.</p>
                    <p className="text-sm text-gray-500">14 hours ago</p>
                </div>
                <div className="bg-gray-100 rounded p-2">
                    <p>Payment Successful.</p>
                    <p className="text-sm text-gray-600">
                        Payment for the reservation #2345 has been successfully processed.
                    </p>
                    <p className="text-sm text-gray-500">23 hours ago</p>
                </div>
                <a href="/notifications" className="text-blue-600 hover:underline">
                    View all notifications
                </a>
            </div>
        </div>
    )
}
