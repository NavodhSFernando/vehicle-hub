import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useEffect, useState } from 'react'

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
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'
import { useToast } from '../../../components/ui/use-toast'
import apiclient from '../../../axiosConfig'

const formSchema = z.object({
    customerReservationId: z.number({
        required_error: 'Customer reservation ID is required'
    }),
    endMileage: z.number().int().positive(),
    penalty: z.number().min(0).optional(),
    description: z.string().optional()
})

export default function EditVehicleLog() {
    const { vehicleLogId } = useParams() // Access route parameter
    const navigate = useNavigate()
    const [customerReservationId, setCustomerReservationId] = useState(0)
    const { toast } = useToast()
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
    // Fetch vehicle Log data
    useEffect(() => {
        const fetchData = async () => {
            const url = `/VehicleLog/${vehicleLogId}`
            try {
                const { data } = await apiclient.get(url)
                setCustomerReservationId(data.customerReservationId)
                // Reset form with fetched data
                reset({
                    customerReservationId: data.customerReservationId,
                    endMileage: data.endMileage,
                    penalty: data.penalty,
                    description: data.description
                })
            } catch (error) {
                console.error('Failed to fetch vehicle Logs', error)
            }
        }
        fetchData()
    }, [])

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
                description: 'Vehicle Log updated successfully'
            })

            // Reset form fields after submission
            reset()
            navigate(`/admin/vehiclelog/view`)
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
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Update"
                        alertTitle="Update Vehicle Log"
                        alertDescription="Are you sure you want to update this vehicle log?"
                        handleConfirm={handleSubmit(handleSave)}
                        buttonClass="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm"
                        variant="outline"
                    />
                </div>
            </form>
        </Form>
    )
}
