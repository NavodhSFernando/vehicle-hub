import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import Cookies from 'js-cookie'
import { useToast } from '../../components/ui/use-toast'

// Define the schema using Zod
const passwordSchema = z
    .object({
        currentPassword: z.string().min(8, 'Current Password must be at least 8 characters long'),
        newPassword: z.string().min(8, 'New Password must be at least 8 characters long'),
        confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters long')
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })

const ResetPassword = () => {
    const navigate = useNavigate()
    const { toast } = useToast()

    const { control, handleSubmit, formState } = useForm({
        resolver: zodResolver(passwordSchema)
    })

    const employeeId = Cookies.get('employeeId')
    if (!employeeId) {
        console.log('Employee ID not available')
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${employeeId}`)
            const decryptedId = response.data.decryptedUserId

            const formData = {
                Id: decryptedId, // Use the decrypted Employee ID
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            }

            const url = `http://localhost:5062/api/EmployeeAuth/ResetPassword`
            const result = await axios.post(url, formData)
            console.log(result.data)
            toast({
                variant: 'success',
                description: 'Password has been reset successfully!'
            })
            navigate('/admin/dashboard')
        } catch (error) {
            console.error('Failed to reset the password', error)
            toast({
                variant: 'destructive_border',
                description: 'Failed to reset the Password!'
            })
        }
    }

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md mx-auto mt-8">
            <h1 className="text-xl font-bold text-center text-gray-800">Reset Password</h1>
            <Form {...control}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="w-full" {...field} />
                                </FormControl>
                                <FormMessage>{formState.errors.currentPassword?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="w-full" {...field} />
                                </FormControl>
                                <FormMessage>{formState.errors.newPassword?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="w-full" {...field} />
                                </FormControl>
                                <FormMessage>{formState.errors.confirmPassword?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-indigo-800 text-white py-2 rounded-md">
                        Reset Password
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ResetPassword
