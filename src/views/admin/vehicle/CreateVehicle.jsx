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
import axios from 'axios'

const regNoPattern = /^[A-Z]{2}\s\d{4}$/

const validVehicleTypeIds = [1]

const validVehicleModelIds = [1]

const validEmployeeIds = [1]

const formSchema = z.object({
    regNo: z
        .string()
        .min(1, 'Registration number is required')
        .regex(
            regNoPattern,
            'Registration number must be in the format XX 9999, where X is any uppercase letter and 9 is any digit.'
        ),
    chassisNo: z.string().min(9, 'Chassis number should be at least 9 characters long.'),
    color: z.string().min(1, 'Color is required'),
    costPerDay: z
        .number()
        .int('Cost per day must be an integer')
        .min(3000, 'Cost per day must be at least 3000')
        .max(10000, 'Cost per day must be no more than 10000'),
    mileage: z.number().int('Mileage must be an integer').min(1, 'Mileage is required'),
    transmission: z.string().min(1, { message: 'Transmission type is required' }),
    vehicleTypeId: z.number().refine((vehicleTypeId) => validVehicleTypeIds.includes(vehicleTypeId), {
        message: 'Invalid Vehicle Type ID'
    }),
    vehicleModelId: z.number().refine((vehicleModelId) => validVehicleModelIds.includes(vehicleModelId), {
        message: 'Invalid Vehicle Model ID'
    }),
    employeeId: z.number().refine((employeeId) => validEmployeeIds.includes(employeeId), {
        message: 'Invalid employee ID'
    })
})

export default function CreateVehicle() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            regNo: '',
            chassisNo: '',
            color: '',
            costPerDay: 0,
            transmission: 'auto',
            mileage: 0,
            vehicleTypeId: 0,
            vehicleModelId: 0,
            employeeId: 0
        }
    })
    const handleSave = async (data) => {
        const url = 'http://localhost:5062/api/Vehicle'
        try {
            const formData = {
                RegistrationNumber: data.regNo,
                ChassisNo: data.chassisNo,
                Colour: data.color,
                Mileage: data.mileage,
                CostPerDay: data.costPerDay,
                Transmission: data.transmission,
                VehicleTypeId: data.vehicleTypeId,
                VehicleModelId: data.vehicleModelId,
                EmployeeId: data.employeeId
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
                <p className="text-xs text-gray-600">Manage and Modify Vehicle Details for Enhanced Rental Services.</p>
                <FormField
                    control={control}
                    name="regNo"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Registration Number</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.regNo && errors.regNo.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="chassisNo"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Chassis Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="SV30-0169266"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage>{errors.chassisNo && errors.chassisNo.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="transmission"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Transmission</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Transmission" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="auto">Auto</SelectItem>
                                    <SelectItem value="manual">Manual</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage>{errors.transmission && errors.transmission.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="color"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Color</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="White"
                                    className="w-full"
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.color && errors.color.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="costPerDay"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Cost Per Day</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.costPerDay && errors.costPerDay.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="mileage"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Mileage</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.mileage && errors.mileage.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="vehicleTypeId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle Type Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.vehicleTypeId && errors.vehicleTypeId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="vehicleModelId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle Model Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.vehicleModelId && errors.vehicleModelId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="employeeId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Employee Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.employeeId && errors.employeeId.message}</FormMessage>
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
