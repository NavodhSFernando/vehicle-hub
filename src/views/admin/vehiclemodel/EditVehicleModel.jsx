import React from 'react'
import { useForm } from 'react-hook-form'
import { number, z } from 'zod'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

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

const validVehicleMakeIds = [1, 7]

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
    vehicleMakeId: z.number().refine((vehicleMakeId) => validVehicleMakeIds.includes(vehicleMakeId), {
        message: 'Invalid Vehicle Make ID'
    })
})

export default function EditVehicleModel() {
    // 1. Define your form.
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            year: new Date().getFullYear(), // Current year as default
            engineCapacity: 600, // Default engine capacity
            seatingCapacity: 4, // Default seating capacity
            vehicleMakeId: 0
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5062/api/VehicleModel/${vehicleModelId}`
            try {
                const { data } = await axios.get(url)
                console.log(data.name)
                console.log(data.year)
                console.log(data.engineCapacity)
                console.log(data.seatingCapacity)
                console.log(data.vehicleMakeId)
                reset({
                    name: data.name,
                    year: data.year,
                    engineCapacity: data.engineCapacity,
                    seatingCapacity: data.seatingCapacity,
                    vehicleMakeId: data.vehicleMakeId
                })
            } catch (error) {
                console.error('Failed to fetch vehicle model', error)
            }
        }
        fetchData()
    }, [vehicleModeId, reset])

    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/VehicleModel/${vehicleModeId}`
        try {
            const formData = {
                Name: data.name,
                Year: data.year,
                EngineCapacity: data.engineCapacity,
                Fuel: data.fuel,
                VehicleMakeId: data.vehicleMakeId
            }

            const result = await axios.put(url, formData)
            console.log(result)
            reset()
        } catch (error) {
            console.error('Failed to update vehicle make', error)
        }
    }

    return (
        <Form {...control}>
            <form
                onSubmit={handleSubmit(handleSave)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormDescription>Basic Information</FormDescription>
                <FormField
                    control={control}
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
                    control={control}
                    name="year"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Year</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="engineCapacity"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Engine Capacity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="seatingCapacity"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Seating Capacity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
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
                    control={control}
                    name="vehicleMakeId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle Make Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.vehicleId && errors.vehicleId.message}</FormMessage>
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
