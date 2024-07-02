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
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../components/ui/use-toast'
import apiclient from '../../../axiosConfig'

const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters.'
    }),
    depositAmount: z.number().gte(3000, {
        message: 'Deposit Amount must be at least Rs.3000'
    })
})

export default function CreateVehicleType() {
    const navigate = useNavigate()
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

    //Submit handler
    const handleSave = async (data) => {
        const url = '/VehicleType'
        try {
            const formData = {
                Name: data.name,
                DepositAmount: data.depositAmount
            }

            const result = await apiclient.post(url, formData)
            console.log(result.data)
            toast({
                variant: 'success',
                description: 'Vehicle Type created successfully'
            })
            reset()
            navigate(`/admin/vehicletype/view`)
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
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Type Name</FormLabel>
                            <FormControl>
                                <Input className="w-full" {...field} />
                            </FormControl>
                            <FormMessage>{errors.type && errors.type.message}</FormMessage>
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
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.depositAmount && errors.depositAmount.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <Button
                        type="submit"
                        className="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}
