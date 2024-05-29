import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useParams } from 'react-router-dom'
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

const validVehicleIds = [1, 7]

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const formSchema = z.object({
    insuranceNo: z.string().min(9, 'Insurance No should be at least 9 characters long'),
    expiryDate: z.string().regex(dateRegex, {
        message: 'Insurance expiry date is required'
    }),
    vehicleId: z.number().refine((vehicleId) => validVehicleIds.includes(vehicleId), {
        message: 'Invalid Vehicle ID'
    })
})

export default function EditInsurance() {
    const { insuranceId } = useParams() // Access route parameter
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
            vehicleId: 0
        }
    })

    const fetchData = async () => {
        const url = `http://localhost:5062/api/VehicleInsurance/${insuranceId}`
        try {
            const { data } = await axios.get(url)
            console.log(data.insuranceNo)
            console.log(data.expiryDate)
            console.log(data.vehicleId)
            console.log(data)

            reset({
                insuranceNo: data.insuranceNo,
                expiryDate: data.expiryDate,
                vehicleId: data.vehicle.id
            })
        } catch (error) {
            console.error('Failed to fetch insurance', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [insuranceId, reset])

    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/VehicleInsurance/${insuranceId}`
        try {
            const formData = {
                InsuranceNo: data.insuranceNo,
                ExpiryDate: data.expiryDate,
                VehicleId: data.vehicleId
            }

            const result = await axios.put(url, formData)
            console.log(result)
            fetch()
        } catch (error) {
            console.error('Failed to update vehicle Insurance', error)
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
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.vehicleId && errors.vehicleId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <Button type="submit" className="bg-indigo-600">
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    )
}
