import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '../../../components/ui/checkbox'
import { useToast } from '../../../components/ui/use-toast'
import apiclient from '../../../axiosConfig'

const items = [
    { id: 'abs', label: 'ABS' },
    { id: 'acFront', label: 'Ac Front' },
    { id: 'securitySystem', label: 'Security System' },
    { id: 'bluetooth', label: 'Bluetooth' },
    { id: 'parkingSensors', label: 'Parking Sensors' },
    { id: 'airbagDriver', label: 'Airbag: Driver' },
    { id: 'airbagPassenger', label: 'Airbag: Passenger' },
    { id: 'airbagSide', label: 'Airbag: Side' },
    { id: 'fogLights', label: 'Fog Lights' },
    { id: 'navigationSystem', label: 'Navigation System' },
    { id: 'sunroof', label: 'Sunroof' },
    { id: 'tintedGlass', label: 'Tinted Glass' },
    { id: 'powerWindows', label: 'Power Windows' },
    { id: 'rearWindowWiper', label: 'Rear Window Wiper' },
    { id: 'alloyWheels', label: 'Alloy Wheels' },
    { id: 'electricMirrors', label: 'Electric Mirrors' },
    { id: 'automaticHeadlights', label: 'Automatic Headlights' },
    { id: 'keylessEntry', label: 'Keyless Entry' }
]

const currentYear = new Date().getFullYear()

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Username must be at least 2 characters'
    }),
    year: z
        .number()
        .min(1900, {
            message: 'Year must be 1900 or later'
        })
        .max(currentYear, {
            message: 'Year cannot be in the future'
        }),
    engineCapacity: z
        .number()
        .min(600, {
            message: 'Engine capacity must be at least 600cc'
        })
        .max(7200, {
            message: 'Engine capacity must be under 7200cc'
        }),
    seatingCapacity: z
        .number()
        .int()
        .min(2, {
            message: 'Seating capacity must be at least 2'
        })
        .max(20, {
            message: 'Seating capacity must be no more than 20'
        }),
    fuel: z.string({
        required_error: 'Please select a fuel type'
    }),
    vehicleMakeId: z.string({
        required_error: 'Vehicle Model is required'
    }),
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'You have to select at least one item.'
    })
})

export default function CreateVehicleModel() {
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
            year: 0,
            engineCapacity: 0,
            seatingCapacity: 0,
            vehicleMakeId: '',
            items: []
        }
    })

    const [vehicleMakes, setVehicleMakes] = useState([])

    useEffect(() => {
        const fetchVehicleMakes = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching vehicles
                const response = await apiclient.get('/VehicleMake')
                setVehicleMakes(response.data)
            } catch (error) {
                console.error('Failed to fetch vehicle makes:', error)
            }
        }
        fetchVehicleMakes()
    }, [])

    const handleSave = async (data) => {
        const url = '/AdminVehicle'
        try {
            // Convert the items array into an object with key-value pairs
            const additionalFeatures = items.reduce((acc, item) => {
                acc[item.id] = data.items.includes(item.id)
                return acc
            }, {})

            const formData = {
                VehicleModel: {
                    Name: data.name,
                    Year: data.year,
                    EngineCapacity: data.engineCapacity,
                    SeatingCapacity: data.seatingCapacity,
                    Fuel: data.fuel,
                    VehicleMakeId: data.vehicleMakeId
                },
                AdditionalFeatures: additionalFeatures
            }

            const result = await apiclient.post(url, formData)
            console.log('Vehicle model created', result)
            toast({
                variant: 'success',
                description: 'Vehicle Model created successfully'
            })
            reset()
            navigate(`/admin/vehiclemodel/view`)
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
                            <FormLabel className="pb-3 w-full">Model Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="year"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Year</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="engineCapacity"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Engine Capacity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="seatingCapacity"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Seating Capacity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="fuel"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Fuel</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Fuel Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Petrol">Petrol</SelectItem>
                                    <SelectItem value="Diesel">Diesel</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    <SelectItem value="Electric">Electric</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="vehicleMakeId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle Make</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Vehicle Make" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vehicleMakes.map((vehicleMake) => (
                                            <SelectItem key={vehicleMake.id} value={String(vehicleMake.id)}>
                                                {vehicleMake.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage>{errors.vehicleMakeId && errors.vehicleMakeId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormItem>
                    <div className="mb-4">
                        <FormLabel>Additional Features</FormLabel>
                    </div>
                    <div className="flex flex-wrap">
                        {items.map((item) => (
                            <div className="w-1/2 mb-4" key={item.id}>
                                <FormField
                                    control={control}
                                    name="items"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        const newValue = checked
                                                            ? [...field.value, item.id]
                                                            : field.value.filter((value) => value !== item.id)
                                                        field.onChange(newValue)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">{item.label}</FormLabel>
                                            <FormMessage>{errors.items && errors.items.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </FormItem>
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
