import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    })
})

export default function CreateReservation() {
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
                <FormDescription>Reservation</FormDescription>
                <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                    Effortlessly Book and Manage Your Car Rentals
                </p>
                <div className="flex flex-col p-6 bg-white rounded-lg pb-6 ">
                    <FormField
                        control={form.control}
                        name="reservation status"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Reservation Status</FormLabel>
                                </div>
                                <Select>
                                    <SelectTrigger className="w-2/3">
                                        <SelectValue placeholder="Pending" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="001">Waiting</SelectItem>
                                        <SelectItem value="002">Confirmed</SelectItem>
                                        <SelectItem value="003">Pending</SelectItem>
                                        <SelectItem value="003">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="start date"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Start Date</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="2023/12/01" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="end date"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">End Date</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="2023/12/31" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="start time"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Start Time</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="9.00AM" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="end time"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">End Time</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="9.00AM" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col p-6 bg-white rounded-lg pb-6">
                    <FormDescription>Vehicle</FormDescription>
                    <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                        Manage and Modify Vehicle Details for Enhanced Rental Services
                    </p>

                    <FormField
                        control={form.control}
                        name="vehicle id"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-4">
                                    <FormLabel className="pb-3">Vehicle Id</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="001" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="model name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Model Name</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="Toyota - Axio" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Transmission</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="Auto" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="milage"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Milage</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="25000km" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="manufacture year"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Manufacture Year</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="2017" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="engine capacity"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Engine Capacity</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="1600cc" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fuel"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Fuel</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="Petrol" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col p-6 bg-white rounded-lg pb-6">
                    <FormDescription>Customer</FormDescription>
                    <p className="text-xs text-gray-600 text-left mb-2 font-semibold">Edit Customer Details</p>

                    <FormField
                        control={form.control}
                        name="customer id"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-4">
                                    <FormLabel className="pb-3">Customer Id</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="001" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Name</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="P L Peiris" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Email</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="abc@gmail.com" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="nic"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">NIC</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="200122456789" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="drivers license number"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Driving License Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="123-456-789" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Address</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="no 34, Dias place, Colombo 7" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contact no"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Contact No</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="+94765688555" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex  flex-col items-start p-6 bg-white rounded-lg pt-4 pb-3">
                    <Button type="submit" className="flex flex-col bg-indigo-600 ml-auto ">
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}
