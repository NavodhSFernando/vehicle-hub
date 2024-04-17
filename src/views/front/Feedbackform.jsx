import React from 'react'
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
import StarRating from '../../components/ui/StarRating'

export default function FeedbackForm() {
    const form = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-300 pb-4 pt-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto pt-10 pb-10 pl-20 pr-20">
                <button
                    onClick={() => console.log('Close the form')}
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-500"
                >
                    <span className="text-2xl">×</span>
                </button>

                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Please Provide your Feedback</h2>

                    <p className="text-sm text-gray-500">
                        Your feedback is greatly valued as it gives us the opportunity to serve you better.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                id="name"
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500"
                                                placeholder="Alex Fernando"
                                                required
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="mb-4">
                                        <FormLabel
                                            htmlFor="designation"
                                            className="block text-gray-700 font-semibold mb-2"
                                        >
                                            Designation
                                        </FormLabel>
                                        <FormControl>
                                            <input
                                                id="designation"
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 mb-3"
                                                placeholder="A12345670"
                                                required
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="mb-4">
                                        <FormLabel
                                            htmlFor="vehicleRating"
                                            className="block text-gray-700 font-semibold mb-2"
                                        >
                                            Vehicle Rating
                                        </FormLabel>

                                        <FormControl>
                                            <StarRating />
                                        </FormControl>
                                    </div>

                                    <div className="mb-4">
                                        <FormLabel
                                            htmlFor="vehicleReview"
                                            className="block text-gray-700 font-semibold mb-2"
                                        >
                                            Vehicle Review
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                id="vehicleReview"
                                                className="w-full px-3 py-8 border border-gray-300 rounded-lg text-sm text-gray-500 mb-4"
                                                placeholder="'Efficient Toyota Aqua: Economical, compact, and eco-friendly hybrid.'"
                                                required
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="mb-8">
                                        <FormLabel
                                            htmlFor="serviceReview"
                                            className="block text-gray-700 font-semibold mb-2"
                                        >
                                            Service Review
                                        </FormLabel>
                                        <FormControl>
                                            <textarea
                                                id="serviceReview"
                                                className="w-full px-3 py-8 border border-gray-300 rounded-lg text-sm text-gray-500"
                                                placeholder="'Service: Exceptional, reliable, and efficient for Toyota Aqua car rental.'"
                                                required
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="mb-4">
                                        <Button
                                            type="submit"
                                            className="bg-blue-900 hover:bg-blue-800 text-amber-100 font-semibold rounded py-2 px-10 transition-colors duration-300 mt-4"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </div>
    )
}
