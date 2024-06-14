import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Cookies from 'js-cookie'
import admin from '../../../src/assets/logos/admin.png'
import { Button } from '../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'

const formSchema = z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})

function Adminlogin() {
    const {
        control,
        handleSubmit,
        formState: { errors }
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
            const result = await axios.post('http://localhost:5062/api/EmployeeAuth/login', data)
            console.log(result.data)
            const token = result.data.token.token
            const encryptedEmployeeId = result.data.token.id

            sessionStorage.setItem('jwtToken', token)

            Cookies.set('employeeId', encryptedEmployeeId, { expires: 30 })
            console.log(`Employee ID saved in cookies: ${Cookies.get('employeeId')}`)
            navigate('/admin/dashboard')
        } catch (error) {
            console.error('Login failed', error.response ? error.response.data : error.message)
        }
    }

    return (
        <div className="relative min-h-screen flex">
            <div className="w-1/2 h-full overflow-hidden">
                <div className="bg-blue-800 h-full flex items-center justify-center">
                    <img src={admin} alt="background" className="object-cover" />
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center bg-gray-100">
                <div className="flex flex-col w-1/2 max-w-md px-6 py-6 bg-white shadow-md rounded-lg">
                    <h1 className="font-bold text-gray-600 text-xl text-center">Admin Login</h1>
                    <p className="text-sm font-inter text-gray-600 pb-4 text-center">Please enter your credentials.</p>
                    <Form {...control}>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="email" className="text-gray-800 font-semibold">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                {...field}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.username?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="password" className="text-gray-800 font-semibold">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="password"
                                                type="password"
                                                {...field}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.password?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center">
                                <FormControl>
                                    <input type="checkbox" id="remember" className="h-4 w-4" />
                                </FormControl>
                                <FormLabel htmlFor="remember" className="ml-2 text-gray-800">
                                    Remember me
                                </FormLabel>
                            </div>
                            <Button
                                type="submit"
                                className="w-full py-3 text-sm text-center tracking-wide bg-indigo-800 text-yellow-200 rounded-md font-semibold hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                            >
                                Log in
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Adminlogin
