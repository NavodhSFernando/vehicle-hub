import React, { useState } from 'react'
import ggl from '../../assets/Icons/ggl.svg'
import fb from '../../assets/Icons/fb.svg'
import blueicon from '../../assets/logos/blueicon.png'
import bluetype from '../../assets/logos/Blue-type.png'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// File validation Schema
const formSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(8),
        confirmpassword: z.string()
    })

    .refine((data) => data.password === data.confirmpassword, {
        message: "Passwords don't match",
        path: ['confirmpassword'] // path of error
    })

export const Signup = () => {
    const navigate = useNavigate()
    const { toast } = useToast()

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        register
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmpassword: ''
        }
    })

    // Submit handler
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const result = await axios.post('http://localhost:5062/api/CustomerAuth/register', {
                email: data.email,
                password: data.password
            })
            toast({
                variant: 'success',
                description: 'Registration is successfull'
            })
            //reset() // Reset the form after successful submission
            navigate('/Login')
        } catch (error) {
            console.error('Registration failed', error.response ? error.response.data : error.message)
            toast({
                variant: 'destructive_border',
                description: 'Failed to Register!'
            })
        }
    }

    return (
        <div className="flex flex-col  justify-center items-center min-h-screen bg-blue-50 p-6">
            <div className="flex flex-row items-center space-x-2 -mb-8 mt-6">
                <img src={blueicon} alt="Blue Icon" className="w-10 h-auto" />

                <img src={bluetype} alt="Blue Type" className="w-40 h-auto" />
            </div>
            <div className="max-w-md bg-white rounded-xl shadow-lg  md:p-8">
                <h1 className="text-2xl font-bold text-gray-700 mb-1 text-center"> Customer Sign up</h1>
                <p className="text-xs text-gray-600 text-center mb-2">Please enter your user information.</p>

                <Form {...control}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col space-y-2 pt-3">
                                        <FormLabel htmlFor="email" className="text-gray-800 font-semibold">
                                            E-mail
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                id="email"
                                                type="email"
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                                {...register('email')}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage>{errors.email && errors.email.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col space-y-2 pt-3">
                                        <FormLabel htmlFor="password" className="text-gray-800 font-semibold">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                id="password"
                                                type="password"
                                                required
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                                {...register('password')}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage>{errors.password && errors.password.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="confirmpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col space-y-1 pt-3">
                                        <FormLabel htmlFor="confirmpassword" className="text-gray-800 font-semibold">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                id="confirmpassword"
                                                type="password"
                                                required
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                                                {...register('confirmpassword')}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage>
                                        {errors.confirmpassword && errors.confirmpassword.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="confirm"
                                className="h-4 w-4"
                                checked={isCheckboxChecked}
                                onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                            />
                            <label htmlFor="confirm" className="ml-2 text-gray-800">
                                By creating this account, you agree the
                                <div className="text-indigo-600 cursor-pointer font-semibold">
                                    terms and conditions.
                                </div>
                            </label>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="w-full py-3 font-semibold text-sm text-center tracking-wide bg-indigo-800 text-yellow-200 rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                                disabled={!isCheckboxChecked}
                            >
                                Sign Up
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
                                <img
                                    src={ggl}
                                    alt="google"
                                    className="w-7 h-7 md:w-10 md:h-8 rounded-full shadow-lg mr-10 cursor-pointer"
                                />
                            </a>
                            <a href="">
                                <img
                                    src={fb}
                                    alt="facebook"
                                    className="w-7 h-7 md:w-10 md:h-8 rounded-full shadow-lg"
                                />
                            </a>
                        </div>
                        <div className="flex justify-center pt-4">
                            <div className="text-indigo-600 cursor-pointer mr-3 mb-4">
                                <a href="login">Already member? Login?</a>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Signup
