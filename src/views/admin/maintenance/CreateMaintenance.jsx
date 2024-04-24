import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'

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

const validVehicleIds = [1]

const currentDate = new Date().toISOString().split('T')[0]

//const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // Regex to validate yyyy-mm-dd format

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
    maintenanceType: z.string({
        required_error: 'Maintenance Type is required'
    }),
    description: z.string({
        message: 'Maintenance Type is required'
    })
})

export default function CreateMaintenance() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maintenanceDate: '',
            vehicleId: 0,
            description: ''
        }
    })

    //Submit handler
    const handleSave = async (data) => {
        const url = 'http://localhost:5062/api/VehicleMaintenance'
        try {
            const formData = {
                Date: data.maintenanceDate,
                VehicleId: data.vehicleId,
                Description: data.description,
                Type: data.maintenanceType
            }

            const result = await axios.post(url, formData)
            console.log(result)
            reset()
        } catch (error) {
            console.log(error)
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
                    name="maintenanceDate"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Maintenance Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => {
                                        const dateValue = e.target.value // This is the input string in "yyyy-MM-dd"
                                        field.onChange(dateValue) // Pass the string directly to your form's state
                                    }}
                                />
                            </FormControl>
                            <FormMessage>{errors.maintenanceDate && errors.maintenanceDate.message}</FormMessage>
                        </FormItem>
                    )}
                />

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
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.vehicleId && errors.vehicleId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="maintenanceType"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Maintenance Type</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                //defaultValue={field.value}
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
                            <FormMessage>{errors.maintenanceType && errors.maintenanceType.message}</FormMessage>
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
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <Button type="submit" className="bg-indigo-600">
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}
