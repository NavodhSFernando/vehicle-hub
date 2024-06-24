import React from 'react'
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

    const onSubmit = async (data) => {
        try {
            // Make a POST request to backend API endpoint
            const response = await axios.post('http://localhost:5062/api/CustomerAuth/login', data)
            console.log(response.data)

            const token = response.data.token.token
            const encryptedCustomerId = response.data.token.id

            sessionStorage.setItem('jwtToken', token)
            // Handle successful login
            console.log('Login successful:', response.data)
            //const customerId = response.data.token.id

            Cookies.set('customerId', encryptedCustomerId, { expires: 30 })
            console.log(`Customer ID saved in cookies: ${Cookies.get('customerId')}`) // Log the server response
            // Redirect to the home page
            toast({
                variant: 'success',
                description: 'Login is successfull'
            })
            navigate('/')
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error)
            toast({
                variant: 'destructive_border',
                description: 'Failed to Log in!'
            })
        }
    }
    return (
        <div>
            <div className=" flex flex-col min-h-screen bg-blue-50  justify-center items-center">
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
                                <a href="">
                                    <img src={ggl} alt="My Image" className="w-7 h-10 rounded-full shadow-lg mr-10" />
                                </a>
                                <a href="">
                                    <img src={fb} alt="My Image" className="w-7 h-10 rounded-full shadow-lg" />
                                </a>
                            </div>
                            <div className="flex pt-4">
                                <div className="text-indigo-600 font-bold text-left text-1xl mr-4">
                                    <a href="signup">Create An Account</a>
                                </div>
                                <div className="text-gray-800 font-semibold text-right text-1xl">
                                    <a href="password">Forgot Password?</a>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
