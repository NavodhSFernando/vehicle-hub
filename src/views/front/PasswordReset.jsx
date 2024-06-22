import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'

// Define the schema using Zod
const passwordSchema = z
    .object({
        password: z.string().min(8, 'Password must be at least 8 characters long'),
        confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters long')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })

const PasswordReset = () => {
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(passwordSchema)
    })

    const otp = useParams()
    console.log(otp.otp)

    const onSubmit = async (data) => {
        const URL = `http://localhost:5062/api/CustomerAuth/ResetPassword?otp=${otp.otp}&password=${data.password}`
        try {
            const response = await axios.post(URL)
            alert('Password reset successfully')
            navigate('/login')
        } catch (error) {
            alert('Failed to reset password')
        }
    }

    return (
        <div className="relative w-screen h-screen bg-gray-300 flex justify-center items-center">
            <div className="bg-gray-200 "></div>

            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold text-center text-gray-800">Reset Password</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col space-y-2">
                                        <FormLabel className="text-gray-800 font-semibold">New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col space-y-2">
                                        <FormLabel className="text-gray-800 font-semibold">Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full py-3 text-sm font-semibold tracking-wide text-center text-yellow-200 bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                        >
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default PasswordReset
