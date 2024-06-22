import React from 'react'
import { Navigate } from 'react-router-dom'
import { getUserRoles } from '../../../src/getUserRoles'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userRole = getUserRoles()

    console.log('User Role:', userRole)
    console.log('Allowed Roles:', allowedRoles)

    if (!userRole || !allowedRoles.includes(userRole)) {
        alert('Access Denied')
        console.log('Access denied. Redirecting...')
        return <Navigate to="/admin-login" />
    }

    return children
}

export default ProtectedRoute
