import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../../../components/ui/button'
import { useParams } from 'react-router-dom'
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
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../components/ui/use-toast'
import { Description } from '@radix-ui/react-dialog'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'

const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters.'
    }),
    depositAmount: z.number().gte(3000, {
        message: 'Deposit Amount must be at least Rs.3000'
    })
})

export default function EditVehicleType() {
    const navigate = useNavigate()
    const { vehicleTypeId } = useParams() // Access route parameter
    const { toast } = useToast()
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            depositAmount: 0
        }
    })

    const fetchData = async () => {
        const url = `http://localhost:5062/api/VehicleType/${vehicleTypeId}`
        try {
            const { data } = await axios.get(url)
            reset({
                name: data.name,
                depositAmount: data.depositAmount
            })
        } catch (error) {
            console.error('Failed to fetch vehicle type', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [vehicleTypeId, reset])

    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/VehicleType/${vehicleTypeId}`
        try {
            const formData = {
                Name: data.name,
                DepositAmount: data.depositAmount
            }

            const result = await axios.put(url, formData)
            toast({
                variant: 'success',
                description: 'VehicleType Updated successfully'
            })
            console.log('Vehicle type updated', result)
            navigate(`/admin/vehicletype/view`)
        } catch (error) {
            console.error('Failed to update vehicle type', error)
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
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Type Name</FormLabel>
                            <FormControl>
                                <Input className="w-full" {...field} />
                            </FormControl>
                            <FormMessage>{errors.name && errors.name.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="depositAmount"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Deposit Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.depositAmount && errors.depositAmount.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Update"
                        alertTitle="Update Vehicle Type"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={handleSubmit(handleSave)}
                    />
                </div>
            </form>
        </Form>
    )
}
