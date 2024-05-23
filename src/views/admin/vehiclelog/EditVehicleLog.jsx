import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../../../components/ui/textarea'

const validReservationIds = [4]

const formSchema = z.object({
    reservationId: z.number().refine((reservationId) => validReservationIds.includes(reservationId), {
        message: 'Invalid Vehicle ID'
    }),
    endMileage: z.number().int().positive(),
    penalty: z.number().min(0).optional(),
    description: z.string().optional(),
    extraDays: z.number().min(0).optional()
})

export default function EditVehicleLog() {
    const { vehicleLogId } = useParams() // Access route parameter
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reservationId: 0,
            endMileage: 0,
            penalty: 0,
            description: '',
            extraDays: 0
        }
    })
    // Fetch vehicle Log data
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5062/api/VehicleLog/${vehicleLogId}`
            try {
                const { data } = await axios.get(url)
                console.log(data.reservationId)
                console.log(data.endMileage)
                console.log(data.penalty)
                console.log(data.description)
                console.log(data.extraDays)
                reset({
                    reservationId: data.reservationId,
                    endMileage: data.endMileage,
                    penalty: data.penalty,
                    description: data.description,
                    extraDays: data.extraDays
                })
            } catch (error) {
                console.error('Failed to fetch vehicle Logs', error)
            }
        }
        fetchData()
    }, [vehicleLogId, reset])

    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/VehicleLog/${vehicleLogId}`
        try {
            const formData = {
                ReservationId: data.reservationId,
                EndMileage: data.endMileage,
                Penalty: data.penalty,
                Description: data.description,
                ExtraDays: data.extraDays
            }

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
                    name="endMileage"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">End Mileage</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.endMileage && errors.endMileage.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="penalty"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Penalty</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.penalty && errors.penalty.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Explain any damages caused by the user."
                                    className="resize-none w-full h-20"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage>{errors.description && errors.description.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="extraDays"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Extra Days</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.extraDays && errors.extraDays.message}</FormMessage>
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
