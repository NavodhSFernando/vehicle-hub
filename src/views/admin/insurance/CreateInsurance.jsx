import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useParams } from 'react-router-dom'

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
import axios from 'axios'

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const formSchema = z.object({
    insuranceNo: z.string().min(9, 'Insurance No should be at least 9 characters long'),
    expiryDate: z.string().regex(dateRegex, {
        message: 'Insurance expiry date is required'
    }),
    vehicleId: z.number().int('Invalid Vehicle ID')
})

export default function CreateInsurance() {
    const { vehicleId } = useParams()
    const numericVehicleId = parseInt(vehicleId, 10)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            insuranceNo: '',
            expiryDate: '',
            vehicleId: numericVehicleId
        }
    })

    //Submit handler
    const handleSave = async (data) => {
        const url = 'http://localhost:5062/api/VehicleInsurance'
        try {
            const formData = {
                InsuranceNo: data.insuranceNo,
                ExpiryDate: data.expiryDate,
                VehicleId: data.vehicleId
            }
            console.log(formData)
            const result = await axios.post(url, formData)
            console.log(result)
            reset() // Reset form after successful submission
        } catch (error) {
            console.log(error) // Log error if submission fails
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
                    name="insuranceNo"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Insurance No</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="w-full"
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.insuranceNo && errors.insuranceNo.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="expiryDate"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Insurance Expiry Date</FormLabel>
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
                            <FormMessage>{errors.expiryDate && errors.expiryDate.message}</FormMessage>
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
                                    value={vehicleId}
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
