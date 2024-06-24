import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import blueicon from '../../assets/logos/blueicon.png'
import bluetype from '../../assets/logos/Blue-type.png'
import { useToast } from '../../components/ui/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
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
    email: z.string().email()
})

export const Password = () => {
    const navigate = useNavigate()
    const { toast } = useToast()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        register
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `http://localhost:5062/api/CustomerAuth/ForgotPassword?email=${data.email}`
            )
            console.log(response.data)
            toast({
                variant: 'success',
                description: 'OTP sent successfully!'
            })
            navigate('/VerifyOTP')
        } catch (error) {
            console.error(error.response ? error.response.data : error.message)
            toast({
                variant: 'destructive_border',
                description: 'Failed to send OTP!'
            })
        }
    }
    return (
        <div>
            <div className="flex flex-col min-h-screen bg-blue-50  justify-center items-center">
                <div className="flex flex-row items-center space-x-2 -mb-8 mt-6">
                    <img src={blueicon} alt="Blue Icon" className="w-10 h-auto" />

                    <img src={bluetype} alt="Blue Type" className="w-40 h-auto" />
                </div>
                <div className="flex justify flex-col  items-center md:w-96 bg-white rounded-xl shadow-lg  md:left-auto md:right-auto p-8">
                    <h2 className="text-2xl w-300 h-30 left-36.5 top-25 font-inter font-bold text-gray-600 text-center text-20 mt-6 mb-2">
                        Password Recovery
                    </h2>

                    <p className="text-xs font-inter text-gray-600 text-justify">
                        Don't worry, we'll send you an email
                    </p>
                    <p className="text-xs font-inter text-gray-600 mb-6 text-justify">to reset your password.</p>

                    <Form {...control}>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex flex-col space-y-3">
                                            <FormLabel htmlFor="email" className="text-gray-800 font-semibold">
                                                E-mail
                                            </FormLabel>
                                            <FormControl>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-800"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>{errors.email && errors.email.message}</FormMessage>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-3 pb-2">
                                <Button
                                    type="submit"
                                    className="w-full py-3 font-semibold text-sm text-center tracking-wide bg-indigo-800 text-yellow-200 rounded-md  hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                                >
                                    Send OTP
                                </Button>
                            </div>

                            <div className="flex pt-2">
                                <div className="text-gray-800 text-justify pr-2">Don't have an account? </div>
                                <div className="text-indigo-600 text-justify ">
                                    <a href="signup">Sign Up</a>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Password
