import React from 'react'
import { useNavigate } from 'react-router-dom'
import ggl from '../../assets/Icons/ggl.svg'
import fb from '../../assets/Icons/fb.svg'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

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

    const onSubmit = async (data) => {
        try {
            // Make a POST request to backend API endpoint
            const response = await axios.post('http://localhost:5062/api/CustomerAuth/login', data)

            // Handle successful login
            console.log('Login successful:', response.data)

            // Redirect to the home page
            navigate('/VehicleFleetSingle')
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error)
        }
    }
    return (
        <div>
            <div className="relative w-screen h-screen bg-gray-300 flex justify-center items-center">
                <div className="bg-gray-200 "></div>

                <div className="w-full md:w-auto bg-white rounded-xl shadow-lg p-8">
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
                                                Username
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FormControl>
                                        <input type="checkbox" id="remember" className="h-4 w-4" />
                                    </FormControl>
                                    <FormLabel htmlFor="remember-me" className="ml-2 text-gray-800">
                                        Remember me
                                    </FormLabel>
                                    <br></br>
                                </div>
                            </div>
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
                                    <a href="">Create An Account</a>
                                </div>
                                <div className="text-gray-800 font-semibold text-right text-1xl">
                                    <a href="">Forgot Password?</a>
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
