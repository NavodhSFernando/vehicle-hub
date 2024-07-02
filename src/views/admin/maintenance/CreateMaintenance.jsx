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
import { useParams } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import cn from 'classnames'
import { Calendar } from '../../../components/ui/calendar'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../components/ui/use-toast'
import apiclient from '../../../axiosConfig'

const currentDate = new Date().toISOString().split('T')[0]

const formSchema = z.object({
    date: z.string().refine((dateStr) => new Date(dateStr) <= new Date(currentDate), {
        message: 'Maintenance date must not be in the future'
    }),
    vehicleId: z.number().int('Invalid Vehicle ID'),
    type: z.string({
        required_error: 'Maintenance Type is required'
    }),
    description: z.string({
        message: 'Maintenance Type is required'
    }),
    currentMileage: z.number().int('Mileage must be an integer').min(1, 'Mileage is required')
})

export default function CreateMaintenance() {
    const navigate = useNavigate()
    const { vehicleId } = useParams()
    const numericVehicleId = parseInt(vehicleId, 10)
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
            vehicleId: numericVehicleId,
            description: '',
            currentMileage: 0
        }
    })

    //Submit handler
    const handleSave = async (data) => {
        const url = '/VehicleMaintenance'
        try {
            const formData = {
                Date: data.date,
                VehicleId: data.vehicleId,
                Description: data.description,
                Type: data.type,
                CurrentMileage: data.currentMileage
            }

            const result = await apiclient.post(url, formData)
            toast({
                variant: 'success',
                description: 'Maintenance created successfully'
            })
            console.log(result)
            reset()
            navigate(`/admin/maintenance/view`)
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
                                    type="number" // Ensure input type is number for direct numeric input
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
                                    <SelectItem value="Other">Other</SelectItem>
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
                                <Input
                                    disabled
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
