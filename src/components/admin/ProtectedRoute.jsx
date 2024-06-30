import React from 'react'
import { Navigate } from 'react-router-dom'
import { getUserRoles } from '../../../src/getUserRoles'
import { useToast } from '../../components/ui/use-toast'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userRole = getUserRoles()
    const { toast } = useToast()

    console.log('User Role:', userRole)
    console.log('Allowed Roles:', allowedRoles)

    if (!userRole || !allowedRoles.includes(userRole)) {
        toast({
            variant: 'destructive_border',
            description: 'Access Denied!'
        })
        console.log('Access denied. Redirecting...')
        return <Navigate to="/admin-login" />
    }

    return children
}

export default ProtectedRoute
