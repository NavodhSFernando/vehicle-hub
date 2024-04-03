import React from 'react'
import ggl from '../../assets/Icons/ggl.svg'
import fb from '../../assets/Icons/fb.svg'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

export const Login = () => {
    const form = useForm()

    function onSubmit(values) {
        // Do something with the form values.
        // This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div>
            <div className="relative w-screen h-screen bg-gray-300 flex justify-center items-center">
                <div className="bg-gray-200 "></div>

                <div className="flex justify flex-col  items-center w-full md:w-auto bg-white rounded-xl shadow-lg absolute left-[calc(50% - 373px/2 - 0.5px)] top-[calc(50% - 605.97px/2 + 36.5px)] md:left-auto md:right-auto p-8">
                    <h2 className="text-2xl font-bold text-gray-600 mt-6 pb-1">Customer Login</h2>
                    <p className="text-sm font-inter text-gray-600 pb-4">Please enter your user information.</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
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
                                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                    title="Please enter a valid email address"
                                                    required
                                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-800"
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
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
                                                    autoComplete="current-password"
                                                    required
                                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-800"
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
                            <div className="flex pt-7">
                                <div className="text-indigo-600 font-bold text-left text-1xl mr-4">
                                    Create An Account
                                </div>
                                <div className="text-gray-800 font-semibold text-right text-1xl">Forgot Password</div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
