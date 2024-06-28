import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ggl from '../../assets/Icons/ggl.svg'
import fb from '../../assets/Icons/fb.svg'
import blueicon from '../../assets/logos/blueicon.png'
import bluetype from '../../assets/logos/Blue-type.png'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useToast } from '../../components/ui/use-toast'
import { Button } from '../../components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        register
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const navigate = useNavigate()
    const { toast } = useToast()
    const [accountStatus, setAccountStatus] = useState(null)

    useEffect(() => {
        // Perform an initial check for account status
        const checkAccountStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5062/api/Customer/status')
                setAccountStatus(response.data.status)
            } catch (error) {
                console.error('Failed to fetch account status:', error)
                setAccountStatus(null) // or set account status based on your error handling
            }
        }
        checkAccountStatus()
    }, [])
    const onSubmit = async (data) => {
        try {
            // Make a POST request to backend API endpoint
            const response = await axios.post('http://localhost:5062/api/CustomerAuth/login', data)
            console.log(response.data)

            const token = response.data.token.token
            const encryptedCustomerId = response.data.token.id
            const status = response.data.token.status

            setAccountStatus(status) // Set the account status
            console.log(`Account Status: ${status}`) // Log account status
            sessionStorage.setItem('jwtToken', token)
            Cookies.set('customerId', encryptedCustomerId, { expires: 30 })
            console.log(`Customer ID saved in cookies: ${Cookies.get('customerId')}`) // Log the server response

            console.log('Login successful:', response.data)
            //const customerId = response.data.token.id

            // Redirect to the home page
            toast({
                variant: 'success',
                description: 'Login is successful!'
            })
            navigate('/')
        } catch (error) {
            // Handle login error

            console.error('Login failed:', error)
            if (error.response) {
                console.error('Response data:', error.response.data)

                if (error.response.data === 'Account is inactive. Please contact support.') {
                    toast({
                        variant: 'destructive_border',
                        description: 'This account is inactive, please contact support.'
                    })
                } else if (error.response.data === 'Invalid email') {
                    toast({
                        variant: 'destructive_border',
                        description: 'Invalid email.'
                    })
                } else if (error.response.data === 'Invalid password') {
                    toast({
                        variant: 'destructive_border',
                        description: 'Invalid password.'
                    })
                } else {
                    toast({
                        variant: 'destructive_border',
                        description: 'Failed to Log in!'
                    })
                }
            } else {
                toast({
                    variant: 'destructive_border',
                    description: 'Failed to Log in!'
                })
            }
        }
    }

    const handleDisabledClick = (event) => {
        console.log('handleDisabledClick called')
        if (accountStatus === false) {
            event.preventDefault()
            console.log('Account is inactive, link click prevented.')
        } else {
            console.log('Account is active, link click allowed.')
        }
    }

    const responseGoogle = async (response) => {
        try {
            console.log('Google response:', response)
            const credential = response.credential
            if (!credential) {
                console.log('Google Sign-In failed: No credential received.')
            }

            const decodedToken = jwtDecode(credential)
            console.log('Decoded credential:', decodedToken)

            // Extract email from decoded token
            const email = decodedToken.email
            console.log('Email decoded:', email)

            console.log('Sending email to backend:', email)
            const result = await axios.post(
                'http://localhost:5062/api/GoogleAuth/google-callback',
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log('Google callback result:', result.data)

            const { token, id, status } = result.data
            console.log('Extracted token:', token)
            console.log('Extracted id:', id)
            console.log('Extracted status:', status)

            if (token && id) {
                // Store JWT token in session storage
                sessionStorage.setItem('jwtToken', token)

                // Set customer ID in cookies
                Cookies.set('customerId', id, { expires: 30 })
                console.log(`Customer ID saved in cookies: ${Cookies.get('customerId')}`)

                // Set account status if needed
                setAccountStatus(status)

                // Display success message
                toast({
                    variant: 'success',
                    description: 'Google Sign-In successful!'
                })

                // Optionally navigate to another page after successful sign-in
                navigate('/')
            } else {
                toast({
                    variant: 'destructive_border',
                    description: 'Google Sign-In failed!'
                })
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error)
            toast({
                variant: 'destructive_border',
                description: 'Failed to sign in with Google!'
            })
        }
    }

    return (
        <GoogleOAuthProvider clientId="305530326806-7b896dlp7b65fq8k9eoll4834c45i69c.apps.googleusercontent.com">
            <div>
                <div className=" flex flex-col min-h-screen bg-slate-200  justify-center items-center">
                    <div className="flex flex-row items-center space-x-2 -mb-8 mt-6">
                        <img src={blueicon} alt="Blue Icon" className="w-10 h-auto" />

                        <img src={bluetype} alt="Blue Type" className="w-40 h-auto" />
                    </div>
                    <div className="max-w-md bg-white rounded-xl shadow-lg md:p-8">
                        <h2 className="text-2xl font-bold text-gray-600 mt-6 pb-1 text-center">Customer Login</h2>
                        <p className="text-sm font-inter text-gray-600 pb-4 text-center">
                            Please enter your user information.
                        </p>
                        <Form {...control}>
                            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                                <FormField
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex flex-col space-y-2">
                                                <FormLabel htmlFor="username" className="text-gray-800">
                                                    E-mail
                                                </FormLabel>
                                                <FormControl>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        {...register('email', { required: true })}
                                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                                    />
                                                </FormControl>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex flex-col space-y-1">
                                                <FormLabel htmlFor="password" className="text-gray-800">
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        required
                                                        {...register('password', { required: true })}
                                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                                    />
                                                </FormControl>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full py-3 text-sm text-center tracking-wide bg-indigo-800 text-yellow-200 rounded-md font-semibold hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                                    >
                                        Sign in
                                    </Button>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-16 h-0 border border-gray-400 order-1"></div>
                                    <div className="font-medium text-xs text-center leading-14 text-gray-400 flex-none order-1 mx-3">
                                        Or
                                    </div>
                                    <div className="w-16 h-0 border border-gray-400 order-1"></div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <GoogleLogin
                                        clientId="305530326806-7b896dlp7b65fq8k9eoll4834c45i69c.apps.googleusercontent.com"
                                        buttonText=""
                                        onSuccess={responseGoogle}
                                        // onFailure={responseGoogle} // Optional: handle failure as well
                                        cookiePolicy={'single_host_origin'}
                                        redirectUri="http://localhost:3000/google-callback"
                                        render={(renderProps) => (
                                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                                <img
                                                    src={ggl}
                                                    alt="google"
                                                    className="w-7 h-7 md:w-10 md:h-8 rounded-full shadow-lg mr-10 cursor-pointer"
                                                />
                                            </button>
                                        )}
                                    />
                                    <a href="">
                                        <img src={fb} alt="My Image" className="w-7 h-10 rounded-full shadow-lg" />
                                    </a>
                                </div>
                                <div className="flex pt-4">
                                    <div className="text-indigo-600 font-bold text-left text-1xl mr-4">
                                        <a href="signup">Create An Account</a>
                                    </div>
                                    <div className="text-gray-800 font-semibold text-right text-1xl">
                                        {accountStatus === false ? (
                                            <span className="text-gray-400 cursor-not-allowed">Forgot Password?</span>
                                        ) : (
                                            <a
                                                href="password"
                                                onClick={(event) => {
                                                    handleDisabledClick(event)
                                                    console.log('Link clicked')
                                                }}
                                                className="text-black-600"
                                            >
                                                Forgot Password?
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

export default Login
