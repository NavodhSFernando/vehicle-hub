import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import Cookies from 'js-cookie'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

const passwordSchema = z
    .object({
        currentPassword: z.string().min(8, 'Current password must be at least 8 characters long'),
        newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
        confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters long')
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "New password and confirm password don't match",
        path: ['confirmPassword']
    })

function ProfileResetPassword() {
    const [decrypt, setDecrypt] = useState('') // State for tracking the decrypted Customer ID
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    useEffect(() => {
        const decryptId = async () => {
            const encryptedCustomerId = Cookies.get('customerId')
            if (encryptedCustomerId) {
                try {
                    const response = await axios.get(
                        `http://localhost:5062/api/Encryption/decrypt/${encryptedCustomerId}`
                    )
                    setDecrypt(response.data.decryptedUserId)
                } catch (error) {
                    console.error('Failed to decrypt Customer ID:', error)
                }
            } else {
                console.error('Customer ID is not available in cookies')
            }
        }
        decryptId()
    }, [])

    const handlePasswordReset = async (data) => {
        try {
            const token = sessionStorage.getItem('jwtToken')
            const encryptedCustomerId = Cookies.get('customerId')

            if (!token) {
                console.error('JWT token is not available')
                return
            }

            if (!decrypt) {
                console.error('Decrypted Customer ID is not available')
                alert('Decrypted Customer ID is not available')
                return
            }

            const formData = {
                Id: decrypt, // Use the decrypted customer ID
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            }

            console.log('Sending payload:', formData) // Log payload for debugging

            const url = `http://localhost:5062/api/CustomerAuth/ResetPasswordProfile`
            const result = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(result.data)
            alert('Password has been reset successfully')
            navigate('/viewprofile') // Navigate to viewprofile after successful password reset
        } catch (error) {
            console.error('Failed to reset the password', error)
            alert('Failed to reset the password!')
        }
    }

    return (
        <div className="relative w-screen h-screen bg-gray-300 flex justify-center items-center">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold text-center text-gray-800">Reset Password</h1>
                <Form {...control}>
                    <form onSubmit={handleSubmit(handlePasswordReset)} className="w-full space-y-4">
                        <FormField
                            control={control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col space-y-2">
                                        <FormLabel className="text-gray-800 font-semibold">Current Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>{errors.currentPassword?.message}</FormMessage>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="newPassword"
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
                                        <FormMessage>{errors.newPassword?.message}</FormMessage>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
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
                                        <FormMessage>{errors.confirmPassword?.message}</FormMessage>
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

export default ProfileResetPassword
