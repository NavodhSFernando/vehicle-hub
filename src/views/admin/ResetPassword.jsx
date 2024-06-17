import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'

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

const PasswordReset = () => {
    const form = useForm({
        resolver: zodResolver(passwordSchema)
    })

    const onSubmit = async (data) => {
        const URL = 'http://localhost:5062/api/EmployeeAuth/ResetPassword'
        try {
            const response = await axios.post(URL, {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            })
            alert('Password reset successfully')
        } catch (error) {
            alert('Failed to reset password')
        }
    }

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md mx-auto mt-8">
            <h1 className="text-xl font-bold text-center text-gray-800">Reset Password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="w-full" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.currentPassword?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="w-full" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.newPassword?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="w-full" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
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

export default PasswordReset
