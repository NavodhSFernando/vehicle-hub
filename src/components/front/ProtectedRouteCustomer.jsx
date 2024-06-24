import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../../../src/getToken'

const ProtectedRouteCustomer = ({ children }) => {
    const token = getToken()

    console.log('Token:', token)

    if (!token) {
        alert('Access Denied')
        console.log('Access denied. Redirecting...')
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRouteCustomer
