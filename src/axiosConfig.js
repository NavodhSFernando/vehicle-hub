import axios from 'axios'

export const getToken = () => {
    return sessionStorage.getItem('jwtToken')
}

const apiclient = axios.create({
    baseURL: 'http://localhost:5062/api'
})

apiclient.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiclient
