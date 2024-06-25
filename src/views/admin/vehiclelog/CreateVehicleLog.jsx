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
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'
import { useToast } from '../../../components/ui/use-toast'
import apiclient from '../../../axiosConfig'

// Define the schema for form validation using zod
const formSchema = z.object({
    customerReservationId: z.number({
        required_error: 'Vehicle ID is required'
    }),
    endMileage: z.number().int().positive(),
    penalty: z.number().min(0).optional(),
    description: z.string().optional()
})

export default function CreateVehicleLog() {
    const navigate = useNavigate()
    const { customerReservationId } = useParams() // Access route parameter
    const { toast } = useToast()
    // Initialize useForm with zodResolver for schema validation
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerReservationId: 0,
            endMileage: 0,
            penalty: 0,
            description: ''
        }
    })

    const employeeId = Cookie.get('employeeId')
    if (!employeeId) {
        console.error('Employee ID not found')
    }

    // Function to handle form submission
    const handleSave = async (data) => {
        const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${employeeId}`)
        const decryptedId = decryptResponse.data.decryptedUserId

        const url = `/AdminReservation/End-Reservation/${customerReservationId}?eid=${decryptedId}`
        try {
            const formData = {
                CustomerReservationId: data.customerReservationId,
                EndMileage: data.endMileage,
                Penalty: data.penalty,
                Description: data.description
            }

            // POST request to the server with form data
            const result = await apiclient.post(url, formData)
            console.log(result)

            toast({
                variant: 'success',
                description: 'Vehicle Log created successfully'
            })
            // Reset form fields after submission
            reset()
            navigate(`/admin/reservation/view`)
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
                    name="customerReservationId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Customer Reservation Id</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    value={customerReservationId}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>
                                {errors.customerReservationId && errors.customerReservationId.message}
                            </FormMessage>
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
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Create"
                        alertTitle="Create Vehicle Log"
                        alertDescription="Are you sure you want to create this vehicle log?"
                        handleConfirm={handleSubmit(handleSave)}
                        buttonClass="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm"
                        variant="outline"
                    />
                </div>
            </form>
        </Form>
    )
}
