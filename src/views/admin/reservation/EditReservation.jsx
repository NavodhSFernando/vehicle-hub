import { useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
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

const dateRegex = /^\d{4}-\d{2}-\d{2}$/
const timeRegex = /^\d{2}:\d{2}:\d{2}$/
const currentDate = new Date().toISOString().split('T')[0]

const formSchema = z.object({
    vehicleId: z.number({
        required_error: 'Vehicle ID is required'
    }),
    customerId: z.number({
        required_error: 'Customer ID is required'
    }),
    reservationId: z.number({
        required_error: 'Reservation ID is required'
    }),
    startDate: z
        .string()
        .regex(dateRegex, {
            message: 'Start date is required'
        })
        .refine((dateStr) => new Date(dateStr) >= new Date(currentDate), {
            message: 'Start Date must be in the future'
        }),
    startTime: z.string().regex(timeRegex, {
        required_error: 'Start time is required'
    }),
    endDate: z
        .string()
        .regex(dateRegex, {
            message: 'End date is required'
        })
        .refine((dateStr) => new Date(dateStr) >= new Date(currentDate), {
            message: 'End Date must be in the future'
        }),
    endTime: z.string().regex(timeRegex, {
        required_error: 'End Time is required'
    })
})

export default function EditReservation() {
    // Initialize useForm with zodResolver for schema validation
    const { customerReservationId } = useParams() // Access route parameter
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicleId: 0,
            customerId: 0,
            reservationId: 0,
            startDate: '',
            startTime: '',
            EndDate: '',
            endTime: ''
        }
    })

    // Fetch vehicle Log data
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5062/api/VehicleLog/${customerReservationId}` // fix this URL
            try {
                const { data } = await axios.get(url)
                console.log(data.vehicle.id)
                console.log(data.customerId)
                console.log(data.reservation.id)
                console.log(data.reservation.startDate)
                console.log(data.reservation.startTime)
                console.log(data.reservation.endDate)
                console.log(data.reservation.endTime)
                // Reset form with fetched data
                reset({
                    vehicleId: data.vehicle.id,
                    customerId: data.customerId,
                    reservationId: data.reservation.id,
                    startDate: data.reservation.startDate,
                    startTime: data.reservation.startTime,
                    endDate: data.reservation.endDate,
                    endTime: data.reservation.endTime
                })
            } catch (error) {
                console.error('Failed to fetch Reservation', error)
            }
        }
        fetchData()
    }, [customerReservationId, reset])

    // Function to handle form submission
    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/VehicleLog/${customerReservationId}`
        try {
            const formData = {
                Id: customerReservationId,
                VehicleId: data.vehicleId,
                CustomerId: data.customerId,
                ReservationId: data.reservationId,
                StartDate: data.startDate,
                StartTime: data.startTime,
                EndDate: data.endDate,
                EndTime: data.endTime
            }

            // PUT request to the server with form data
            const result = await axios.put(url, formData)
            console.log(result)
            reset()
        } catch (error) {
            console.log('Failed to update vehicle Log', error)
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
                    name="vehicleId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.vehicleId && errors.vehicleId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="customerId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Customer Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.customerId && errors.customerId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="reservationId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Reservation Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.reservationId && errors.reservationId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Start Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    className="w-full"
                                    onChange={(e) => {
                                        const dateValue = e.target.value // This is the input string in "yyyy-MM-dd"
                                        field.onChange(dateValue) // Pass the string directly to your form's state
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.startDate && errors.startDate.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="startTime"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Start Time</FormLabel>
                            <FormControl>
                                <Input
                                    type="time"
                                    step="1" // Allows for seconds input
                                    className="w-full"
                                    onChange={(e) => {
                                        const timeValue = e.target.value // This is the input string in "HH:mm:ss"
                                        field.onChange(timeValue) // Pass the string directly to your form's state
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.startTime && errors.startTime.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">End Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    className="w-full"
                                    onChange={(e) => {
                                        const dateValue = e.target.value // This is the input string in "yyyy-MM-dd"
                                        field.onChange(dateValue) // Pass the string directly to your form's state
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.endDate && errors.endDate.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="endTime"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">End Time</FormLabel>
                            <FormControl>
                                <Input
                                    type="time"
                                    step="1" // Allows for seconds input
                                    className="w-full"
                                    onChange={(e) => {
                                        const timeValue = e.target.value // This is the input string in "HH:mm:ss"
                                        field.onChange(timeValue) // Pass the string directly to your form's state
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.endTime && errors.endTime.message}</FormMessage>
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
