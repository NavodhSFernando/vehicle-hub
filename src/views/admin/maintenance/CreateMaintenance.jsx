import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'

const validVehicleIds = [1001, 1002, 1003, 1004]

const currentDate = new Date().toISOString().split('T')[0]

const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // Regex to validate yyyy-mm-dd format

const formSchema = z.object({
    maintenanceDate: z
        .string()
        // .regex(dateRegex, {
        //     message: 'Maintenance date must be in yyyy-mm-dd format'
        // })
        .refine((dateStr) => new Date(dateStr) <= new Date(currentDate), {
            message: 'Maintenance date must not be in the future'
        }),
    vehicleId: z.number().refine((vehicleId) => validVehicleIds.includes(vehicleId), {
        message: 'Invalid Vehicle ID'
    }),
    description: z.string({
        message: 'Maintenance Type is required'
    }),
    maintenanceType: z.string({
        message: 'Maintenance Type is required'
    })
})

export default function CreateMaintenance() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maintenanceDate: '',
            vehicleId: 0,
            description: ''
        }
    })

    function onSubmit(values) {
        // Do something with the form values.
        // This will be type-safe and validated.
        console.log(values)
        console.log('Maintenance Type:', values.maintenanceType)
    }

    const [maintenanceDate, setMaintenanceDate] = useState('')
    const [vehicleId, setVehicleId] = useState('')
    const [maintenanceType, setMaintenanceType] = useState('')
    const [description, setDescription] = useState('')

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormDescription>Basic Information</FormDescription>
                <FormField
                    control={form.control}
                    name="maintenanceDate"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Maintenance Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    className="w-full"
                                    value={maintenanceDate}
                                    {...field}
                                    onChange={(e) => {
                                        const dateValue = e.target.value // This is the input string in "yyyy-MM-dd"
                                        field.onChange(dateValue) // Pass the string directly to your form's state
                                        setMaintenanceDate(dateValue) // Update the local state
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="vehicleId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle ID</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    value={vehicleId}
                                    {...field}
                                    onChange={(e) => {
                                        // Convert the input value to a number before setting it.
                                        field.onChange(parseFloat(e.target.value))
                                        setVehicleId(e.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maintenanceType"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Maintenance Type</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                    setMaintenanceType(value) // Update the local state
                                }}
                                value={maintenanceType}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Maintenance Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="oilChange">Oil and Fluid Changes</SelectItem>
                                    <SelectItem value="tireRotation">Tire Rotation</SelectItem>
                                    <SelectItem value="brakeChecks">Brake Checks</SelectItem>
                                    <SelectItem value="batteryMaintenance">Battery Maintenance</SelectItem>
                                    <SelectItem value="airConditioningChecks">Air Conditioning Checks</SelectItem>
                                    <SelectItem value="replacements">Replacements</SelectItem>
                                </SelectContent>
                            </Select>
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
                                    value={description}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                        setDescription(e.target.value)
                                    }}
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
