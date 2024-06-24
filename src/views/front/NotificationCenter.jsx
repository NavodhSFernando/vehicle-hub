import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useOutletContext } from 'react-router-dom'

const NOTIFICATIONS_PER_PAGE = 6

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const indexOfLastNotification = currentPage * NOTIFICATIONS_PER_PAGE
    const indexOfFirstNotification = indexOfLastNotification - NOTIFICATIONS_PER_PAGE
    const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const customerId = useOutletContext()

    const fetchNotifications = async () => {
        try {
            const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${customerId}`)
            const decryptedId = decryptResponse.data.decryptedUserId

            const response = await axios.get(`http://localhost:5062/api/Notification/Notifications/${decryptedId}`)
            console.log("============================")
            console.log(response.data)
            setNotifications(response.data)
            console.log("============================")
        } catch (error) {
            console.error('Error fetching notifications:', error)
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [customerId])

    return (
        <div className="flex justify-center items-start pb-10">
            <div className="w-full max-h-[800px] overflow-y-auto p-4 border shadow-lg rounded-lg bg-white">
                <h2 className="text-xl pt-10 pl-20 font-semibold mb-4">Notifications</h2>
                {currentNotifications.length > 0 ? (
                    currentNotifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            title={notification.title}
                            description={notification.description}
                            time={notification.generated_DateTime}
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-500">No notifications</div>
                )}
                {notifications.length > NOTIFICATIONS_PER_PAGE && (
                    <Pagination
                        totalNotifications={notifications.length}
                        notificationsPerPage={NOTIFICATIONS_PER_PAGE}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                )}
            </div>
        </div>
    )
}

function Pagination({ totalNotifications, notificationsPerPage, paginate, currentPage }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalNotifications / notificationsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="flex justify-center items-center pt-4 space-x-1">
            <button
                className={`px-4 py-2 border rounded shadow ${
                    currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-Paginationbluecolor hover:text-white'
                }`}
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
            >
                Prev
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`px-4 py-2 border rounded shadow ${
                        currentPage === number
                            ? 'bg-Paginationbluecolor text-white'
                            : 'bg-white text-gray-700 hover:bg-Paginationbluecolor hover:text-white'
                    }`}
                    onClick={() => paginate(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className={`px-4 py-2 border rounded shadow ${
                    currentPage === pageNumbers.length
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-Paginationbluecolor hover:text-white'
                }`}
                disabled={currentPage === pageNumbers.length}
                onClick={() => paginate(currentPage + 1)}
            >
                Next
            </button>
        </div>
    )
}

function NotificationCard({ title, description, time }) {
    return (
        <div className=" p-4 shadow rounded-lg mb-4 mx-20">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-gray-700">{description}</div>
            <div className="text-gray-500 text-sm">{time}</div>
        </div>
    )
}
