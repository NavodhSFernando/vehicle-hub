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
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    })
})

// The FeedbackForm component is a form for users to provide feedback on their vehicle rental experience.
export default function FeedbackForm() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: ''
        }
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // This will be type-safe and validated.
        console.log(values)
    }
    return (
        // The form is centered on the page with a flex container and occupies the full width of the screen.
        //The gray background is applied to the entire viewport.
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-300 pb-4 pt-4">
            {/* The white form container with rounded corners, shadow, and maximum width set to 2xl. */}
            {/* Padding is applied inside the form container. */}
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto pt-10 pb-10 pl-20 pr-20">
                {/* A close button is positioned absolutely in the top right corner of the form. */}
                {/* On click, it logs a message to the console. */}
                <button
                    onClick={() => console.log('Close the form')}
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-500"
                >
                    {/* The '×' character is styled to be large and gray, changing on hover. */}
                    <span className="text-2xl">×</span>
                </button>
                {/* Heading and subheading for the form. */}
                <div className="mb-4">
                    {/* The title of the form is bold and larger than other text. */}
                    <h2 className="text-2xl font-bold text-gray-900">Please Provide your Feedback</h2>
                    {/* A short description below the title, in smaller text. */}
                    <p className="text-sm text-gray-500">
                        Your feedback is greatly valued as it gives us the opportunity to serve you better.
                    </p>
                </div>
                {/* The form tag with POST method indicating how data will be sent to the server. */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                        {/* Input field for the user's name. */}
                        {/* Labels are associated with input fields using the 'for' attribute, which must be 'htmlFor' in JSX. */}
                        <FormField
                            control={form.control}
                            name="name"
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
                                </FormItem>
                            )}
                        />

                        {/* Input field for the user's designation. */}
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
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
                                </FormItem>
                            )}
                        />

                        {/* Placeholder for star rating component for vehicle rating. */}
                        {/* This section is currently empty and should be filled with a star rating component. */}

                        <div className="mb-4">
                            <FormLabel htmlFor="vehicleRating" className="block text-gray-700 font-semibold mb-8">
                                Vehicle Rating
                            </FormLabel>
                            {/* Star rating component */}
                        </div>
                        {/* Textarea for the user's vehicle review. */}

                        <FormField
                            control={form.control}
                            name="vehicle review"
                            render={({ field }) => (
                                <FormItem>
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
                                </FormItem>
                            )}
                        />

                        {/* Textarea for the user's service review. */}
                        <FormField
                            control={form.control}
                            name="service review"
                            render={({ field }) => (
                                <FormItem>
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
                                </FormItem>
                            )}
                        />

                        {/* Submit button for the form. */}
                        {/* The button is styled with background color, hover effect, padding, and transition for smooth color change. */}
                        <div className="mb-4">
                            <Button
                                type="submit"
                                className="bg-blue-900 hover:bg-blue-800 text-amber-100 font-semibold rounded py-2 px-10 transition-colors duration-300 mt-4"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
