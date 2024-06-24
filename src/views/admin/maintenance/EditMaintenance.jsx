import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import cn from 'classnames'
import { Calendar } from '../../../components/ui/calendar'
import { useToast } from '../../../components/ui/use-toast'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'

const currentDate = new Date().toISOString().split('T')[0]

const formSchema = z.object({
    date: z.string().refine((dateStr) => new Date(dateStr) <= new Date(currentDate), {
        message: 'Maintenance date must not be in the future'
    }),
    vehicleId: z.number({
        message: 'Invalid Vehicle ID'
    }),
    type: z.string({
        required_error: 'Maintenance Type is required'
    }),
    description: z.string({
        message: 'Maintenance Type is required'
    }),
    currentMileage: z.number().int('Mileage must be an integer').min(1, 'Mileage is required')
})

export default function EditMaintenance() {
    const navigate = useNavigate()
    const { maintenanceId } = useParams()
    const { toast } = useToast()
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: '',
            description: '',
            vehicleId: 0,
            currentMileage: 0
        }
    })

    const fetchData = async () => {
        const url = `http://localhost:5062/api/VehicleMaintenance/${maintenanceId}`
        try {
            const { data } = await axios.get(url)
            console.log(data)
            reset({
                date: data.date,
                description: data.description,
                type: data.type,
                vehicleId: data.vehicleId,
                currentMileage: data.currentMileage
            })
        } catch (error) {
            console.error('Failed to fetch maintenance', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [maintenanceId, reset])

    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/VehicleMaintenance/${maintenanceId}`
        try {
            const formData = {
                Date: data.date,
                Description: data.description,
                Type: data.type,
                VehicleId: data.vehicleId,
                CurrentMileage: data.currentMileage
            }

            const result = await axios.put(url, formData)
            toast({
                variant: 'success',
                description: 'Maintenance updated successfully'
            })
            console.log(result)
            navigate(`/admin/maintenance/view`)
        } catch (error) {
            console.error('Failed to update vehicle maintenance', error)
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
                    name="date"
                    render={({ field }) => (
                        <FormItem className="w-1/2 flex flex-col">
                            <FormLabel className="">Maintenance Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
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
                                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage>{errors.maintenanceDate && errors.maintenanceDate.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="currentMileage"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Current Mileage</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.currentMileage && errors.currentMileage.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Maintenance Type</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                {...field}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Maintenance Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Service">Vehicle Service</SelectItem>
                                    <SelectItem value="BrakePadReplacement">Brake Pad Replacement</SelectItem>
                                    <SelectItem value="GearOil">Gear Oil Replacements</SelectItem>
                                    <SelectItem value="TyreRotation">Tyre Rotation</SelectItem>
                                    <SelectItem value="BatteryMaintenance">Battery Maintenance</SelectItem>
                                    <SelectItem value="AirConditioningChecks">Air Conditioning Checks</SelectItem>
                                    <SelectItem value="EngineTuneUp">Engine Tune Up</SelectItem>
                                    <SelectItem value="Replacements">Replacements</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage>{errors.type && errors.type.message}</FormMessage>
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
                    <AlertDialogDemo
                        triggerText="Update"
                        alertTitle="Update Maintenance"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={handleSubmit(handleSave)}
                    />
                </div>
            </form>
        </Form>
    )
}
