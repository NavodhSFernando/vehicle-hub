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
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../../../components/ui/textarea'

const validRegIds = [1001, 1002, 1003, 1004]

const formSchema = z.object({
    reservationId: z.number().refine((reservationId) => validRegIds.includes(reservationId), {
        message: 'Invalid Reservation ID'
    }),
    endMileage: z.number().int().positive(),
    penalty: z.number().min(0).optional(),
    description: z.string().optional()
})

export default function CreateVehicleLog() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reservationId: 0,
            endMileage: 0,
            penalty: 0,
            description: ''
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
                    name="reservationId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Reservation ID</FormLabel>
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
                    name="endMileage"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">End Mileage</FormLabel>
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
                    name="penalty"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Penalty</FormLabel>
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
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Explain any damages caused by the user."
                                    className="resize-none w-full h-20"
                                    {...field}
                                />
                            </FormControl>
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
