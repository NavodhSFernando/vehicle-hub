import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md'
import { MdOutlineMarkEmailRead } from 'react-icons/md'

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
            setNotifications(response.data)
        } catch (error) {
            console.error('Error fetching notifications:', error)
        }
    }

    const markAsRead = async (notificationId) => {
        try {
            const response = await axios.put(
                `http://localhost:5062/api/Notification/MarkAsRead?notificationid=${notificationId}`
            )
            if (response.status === 200) {
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notification) =>
                        notification.id === notificationId ? { ...notification, isRead: true } : notification
                    )
                )
            }
        } catch (error) {
            console.error('Error marking notification as read:', error)
        }
    }

    const deleteNotification = async (notificationId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5062/api/Notification/DeleteNotification?notificationId=${notificationId}`
            )
            if (response.status === 200) {
                setNotifications((prevNotifications) =>
                    prevNotifications.filter((notification) => notification.id !== notificationId)
                )
            } else {
                console.log('Failed to delete the notification.')
            }
        } catch (error) {
            if (error.response) {
                console.error('Error deleting notification:', error.response.data)
            } else if (error.request) {
                console.error('No response received:', error.request)
            } else {
                console.error('Error setting up request:', error.message)
            }
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
                            notification={notification}
                            onMarkAsRead={markAsRead}
                            OnDelete={deleteNotification}
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

function NotificationCard({ notification, onMarkAsRead, OnDelete }) {
    const { id, title, description, generated_DateTime, isRead } = notification

    return (
        <div className="p-4 shadow rounded-lg mb-4 sm:mx-20 flex justify-between items-start gap-[10px]">
            <div className="flex flex-col">
                <div className="font-bold text-lg">{title}</div>
                <div className="text-gray-700">{description}</div>
                <div className="text-gray-500 text-sm">{generated_DateTime}</div>
            </div>
            <div className="flex-3 flex flex-col justify-center items-center gap-[10px]">
                {!isRead && (
                    <button onClick={() => onMarkAsRead(id)}>
                        <MdOutlineMarkEmailRead fontSize={28} style={{ color: '#283280' }} />
                    </button>
                )}
                <button onClick={() => OnDelete(id)}>
                    <MdDeleteOutline fontSize={28} style={{ color: '#283280' }} />
                </button>
            </div>
        </div>
    )
}
