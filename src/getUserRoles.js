import { jwtDecode } from 'jwt-decode'

export const getUserRoles = () => {
    const token = sessionStorage.getItem('jwtToken')
    if (!token) return []

    try {
        const decodedToken = jwtDecode(token)
        return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null
    } catch (error) {
        console.error('Failed to decode token:', error)
        return []
    }
}

export default getUserRoles
