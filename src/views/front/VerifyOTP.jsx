import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '../../components/ui/use-toast'

import { Button } from '../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'

export const OtpVerification = () => {
    const form = useForm()
    const navigate = useNavigate()
    const { toast } = useToast()
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`http://localhost:5062/api/CustomerAuth/VerifyOtp?otp=${data.otp}`)
            console.log(response.data)
            toast({
                variant: 'success',
                description: 'OTP verified!'
            })
            navigate(`/PasswordReset/${data.otp}`)
        } catch (error) {
            toast({
                variant: 'destructive_border',
                description: 'Invalid OTP!'
            })
        }
    }

    return (
        <div className="relative w-screen h-screen bg-slate-200 flex justify-center items-center">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold text-center text-gray-600">OTP Verification</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800 font-semibold">OTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.otp?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full py-3 text-sm font-semibold tracking-wide text-center text-yellow-200 bg-indigo-800 rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                        >
                            Verify OTP
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default OtpVerification
