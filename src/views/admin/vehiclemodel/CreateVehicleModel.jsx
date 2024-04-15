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

const vehicleMakes = [
    { value: 'toyota', label: 'Toyota' },
    { value: 'ford', label: 'Ford' },
    { value: 'chevrolet', label: 'Chevrolet' }
]

const currentYear = new Date().getFullYear()

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Username must be at least 2 characters'
    }),
    year: z
        .number()
        .min(1900, {
            message: 'Year must be 1900 or later'
        })
        .max(currentYear, {
            message: 'Year cannot be in the future'
        }),
    engineCapacity: z
        .number()
        .min(600, {
            message: 'Engine capacity must be at least 600cc'
        })
        .max(7200, {
            message: 'Engine capacity must be under 7200cc'
        }),
    seatingCapacity: z
        .number()
        .int()
        .min(2, {
            message: 'Seating capacity must be at least 2'
        })
        .max(7, {
            message: 'Seating capacity must be no more than 7'
        }),
    fuel: z.string({
        required_error: 'Please select a fuel type'
    }),
    vehicleMake: z.string({
        required_error: 'Please select a vehicle make'
    })
})

export default function CreateVehicleModel() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            year: new Date().getFullYear(), // Current year as default
            engineCapacity: 600, // Default engine capacity
            seatingCapacity: 4 // Default seating capacity
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
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormDescription>Basic Information</FormDescription>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Model Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Year</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    {...field}
                                    {...{
                                        onChange: (e) => {
                                            // Convert the input value to a number before setting it.
                                            field.onChange(parseFloat(e.target.value))
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="engineCapacity"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Engine Capacity</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    {...field}
                                    {...{
                                        onChange: (e) => {
                                            // Convert the input value to a number before setting it.
                                            field.onChange(parseFloat(e.target.value))
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="seatingCapacity"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Seating Capacity</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    {...field}
                                    {...{
                                        onChange: (e) => {
                                            // Convert the input value to a number before setting it.
                                            field.onChange(parseFloat(e.target.value))
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fuel"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Fuel</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Fuel Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="petrol">Petrol</SelectItem>
                                    <SelectItem value="diesal">Diesel</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                    <SelectItem value="electric">Electric</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vehicleMake"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle Make</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Vehicle Make" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {vehicleMakes.map((make) => (
                                        <SelectItem key={make.value} value={make.value}>
                                            {make.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <Button type="submit" className="bg-indigo-600">
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}
