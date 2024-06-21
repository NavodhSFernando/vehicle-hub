import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
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
            alert('OTP sent to your email.')
            navigate('/VerifyOTP')
        } catch (error) {
            alert('Failed to send OTP.')
            console.error(error.response ? error.response.data : error.message)
        }
    }
    return (
        <div>
            <div className="relative w-screen h-screen bg-gray-300 flex justify-center items-center">
                <div className="bg-gray-200 "></div>

                <div className="flex justify flex-col  items-center w-full md:w-96 bg-white rounded-xl shadow-lg absolute left-[calc(50% - 373px/2 - 0.5px)] top-[calc(50% - 605.97px/2 + 36.5px)] md:left-auto md:right-auto p-8">
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
                                                Email
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
