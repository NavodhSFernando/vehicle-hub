import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { Calendar } from '../../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import cn from 'classnames'
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
import { useNavigate } from 'react-router-dom'

const currentDate = new Date().toISOString().split('T')[0]
const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const formSchema = z.object({
    insuranceNo: z.string().min(9, 'Insurance No should be at least 9 characters long'),
    expiryDate: z
        .string()
        .regex(dateRegex, {
            message: 'Insurance expiry date is required'
        })
        .refine((dateStr) => new Date(dateStr) >= new Date(currentDate), {
            message: 'Insurance expiry date must be in the future'
        }),
    vehicleId: z.number().int('Invalid Vehicle ID')
})

export default function EditInsurance() {
    const navigate = useNavigate()
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

            reset({
                insuranceNo: data.insuranceNo,
                expiryDate: data.expiryDate,
                vehicleId: data.vehicleId
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
            navigate(`/admin/insurance/view`)
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
                        <FormItem className="w-1/2 flex flex-col">
                            <FormLabel className="">Expiry Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            {...field}
                                            variant={'outline'}
                                            className={cn(
                                                'justify-start text-left font-normal p-3 h-12',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? (
                                                format(parseISO(field.value), 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value ? parseISO(field.value) : null}
                                        onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                                        disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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
                                <Input disabled {...field} type="number" className="w-full text-gray-950" />
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
