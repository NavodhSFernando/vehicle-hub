import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

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
import axios from 'axios'
import { Checkbox } from '../../../components/ui/checkbox'
import { useRef } from 'react'

//const regNoPattern = /^[A-Z]{2}\s\d{4}$/

const formSchema = z.object({
    regNo: z
        .string()
        .min(
            1,
            'Registration number must be in the format XX 9999, where X is any uppercase letter and 9 is any digit.'
        ),
    chassisNo: z.string().min(9, 'Chassis number should be at least 9 characters long.'),
    color: z.string().min(1, 'Color is required'),
    costPerDay: z.number().int('Cost per day must be an integer').min(3000, 'Cost per day must be at least 3000'),
    costPerExtraKm: z
        .number()
        .int('Cost per extra Km  must be an integer')
        .min(0, 'Cost per extra Km must be at least 0'),
    mileage: z.number().int('Mileage must be an integer').min(1, 'Mileage is required'),
    transmission: z.string().min(1, { message: 'Transmission type is required' }),
    thumbnail: z.any().refine((file) => file?.length === 1, 'File is required.'),
    frontImg: z.any().refine((file) => file?.length === 1, 'File is required.'),
    rearImg: z.any().refine((file) => file?.length === 1, 'File is required.'),
    dashboard: z.any().refine((file) => file?.length === 1, 'File is required.'),
    interior: z.any().refine((file) => file?.length === 1, 'File is required.'),
    vehicleTypeId: z.string({
        required_error: 'Vehicle Type is required'
    }),
    vehicleModelId: z.string({
        required_error: 'Vehicle Model is required'
    }),
    status: z.boolean().default(false) // Added status field
})

export default function EditVehicle() {
    const { vehicleId } = useParams() // Access route parameter
    const fileInputRef = useRef(null)
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            regNo: '',
            chassisNo: '',
            color: '',
            costPerDay: 0,
            costPerExtraKm: 0,
            transmission: 'auto',
            mileage: 0,
            thumbnail: null,
            frontImg: null,
            rearImg: null,
            dashboard: null,
            interior: null,
            vehicleTypeId: 0,
            vehicleModelId: '',
            status: true
        }
    })

    const [image, setImage] = useState('')

    const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'

    const [vehicleModels, setVehicleModels] = useState([])
    const [vehicleTypes, setVehicleTypes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5062/api/Vehicle/${vehicleId}`
            try {
                const { data } = await axios.get(url)
                setImage(data.thumbnail)
                console.log(image)
                console.log(data)
                reset({
                    regNo: data.registrationNumber,
                    chassisNo: data.chassisNo,
                    color: data.colour,
                    mileage: data.mileage,
                    costPerDay: data.costPerDay,
                    costPerExtraKm: data.costPerExtraKM,
                    transmission: data.transmission,
                    thumbnail: null,
                    frontImg: null,
                    rearImg: null,
                    dashboard: null,
                    interior: null,
                    vehicleTypeId: data.vehicleType.id,
                    vehicleModelId: data.vehicleModel.id,
                    EmployeeId: data.employee.id,
                    status: data.status
                })
            } catch (error) {
                console.error('Failed to fetch vehicle', error)
            }
        }

        const fetchVehicleModels = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching vehicles
                const response = await axios.get('http://localhost:5062/api/VehicleModel')
                setVehicleModels(response.data)
                console.log(response.data)
            } catch (error) {
                console.error('Failed to fetch vehicle models:', error)
            }
        }
        fetchVehicleModels()

        const fetchVehicleTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5062/api/VehicleType')
                setVehicleTypes(response.data)
            } catch (error) {
                console.error('Failed to fetch vehicle Types:', error)
            }
        }
        fetchVehicleTypes()
        fetchData()
    }, [vehicleId, reset])

    // File change handler
    const handleThumbnailChange = (e) => {
        const files = e.target.files
        setValue('thumbnail', files, { shouldValidate: true })
    }

    const handleFrontImgChange = (e) => {
        const files = e.target.files
        setValue('frontImg', files, { shouldValidate: true })
    }

    const handleRearImgChange = (e) => {
        const files = e.target.files
        setValue('rearImg', files, { shouldValidate: true })
    }

    const handleDashboardImgChange = (e) => {
        const files = e.target.files
        setValue('dashboard', files, { shouldValidate: true })
    }

    const handleInteriorImgChange = (e) => {
        const files = e.target.files
        setValue('interior', files, { shouldValidate: true })
    }

    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/Vehicle/${vehicleId}`
        try {
            const formData = new FormData()
            console.log(data)
            formData.append('RegistrationNumber', data.regNo)
            formData.append('ChassisNo', data.chassisNo)
            formData.append('Colour', data.color)
            formData.append('Mileage', data.mileage)
            formData.append('CostPerDay', data.costPerDay)
            formData.append('Transmission', data.transmission)
            formData.append('CostPerExtraKM', data.costPerExtraKm)
            formData.append('formFile', data.thumbnail[0])
            formData.append('front', data.frontImg[0])
            formData.append('rear', data.rearImg[0])
            formData.append('dashboard', data.dashboard[0])
            formData.append('interior', data.interior[0])
            formData.append('VehicleTypeId', data.vehicleTypeId)
            formData.append('VehicleModelId', data.vehicleModelId)
            formData.append('EmployeeId', '1')
            formData.append('Status', data.status)

            console.log('Form Data:', formData)

            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Response:', response.data)
            reset()

            if (fileInputRef.current) {
                fileInputRef.current.value = '' // This clears the file input field
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <Form {...control}>
            <form
                onSubmit={handleSubmit(handleSave)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormDescription>Basic Information</FormDescription>
                <p className="text-xs text-gray-600">Manage and Modify Vehicle Details for Enhanced Rental Services.</p>
                <FormField
                    control={control}
                    name="regNo"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Registration Number</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.regNo && errors.regNo.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="chassisNo"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Chassis Number</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage>{errors.chassisNo && errors.chassisNo.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="transmission"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Transmission</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                {...field}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Transmission" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="auto">Auto</SelectItem>
                                    <SelectItem value="manual">Manual</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage>{errors.transmission && errors.transmission.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="color"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Color</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.color && errors.color.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="costPerDay"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Cost Per Day</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => {
                                        const number = parseInt(e.target.value) // This is the input string in "yyyy-MM-dd"
                                        field.onChange(number) // Pass the string directly to your form's state
                                    }}
                                />
                            </FormControl>
                            <FormMessage>{errors.costPerDay && errors.costPerDay.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="costPerExtraKm"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Cost Per Extra Km</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    {...field}
                                    onChange={(e) => {
                                        const number = parseInt(e.target.value)
                                        field.onChange(number)
                                    }}
                                />
                            </FormControl>
                            <FormMessage>{errors.costPerExtraKm && errors.costPerExtraKm.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="mileage"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Mileage</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.mileage && errors.mileage.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Thumbnail</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleThumbnailChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.thumbnail && errors.thumbnail.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <img className=" object-contain pt-3 h-24 w-24" src={`${baseUrl}${image}`} />
                <FormField
                    control={control}
                    name="frontImg"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Front Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleFrontImgChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.frontImg && errors.frontImg.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="rearImg"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Rear Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleRearImgChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.rearImg && errors.rearImg.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="dashboard"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Dashboard Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleDashboardImgChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.dashboard && errors.dashboard.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="interior"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Interior Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleInteriorImgChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.interior && errors.interior.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="vehicleTypeId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle Type</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                    {...field}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Vehicle Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vehicleTypes.map((vehicleType) => (
                                            <SelectItem key={vehicleType.id} value={String(vehicleType.id)}>
                                                {vehicleType.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage>{errors.vehicleTypeId && errors.vehicleTypeId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="vehicleModelId"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Vehicle Model</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                    {...field}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Vehicle Model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vehicleModels.map((vehicleModel) => (
                                            <SelectItem key={vehicleModel.id} value={String(vehicleModel.id)}>
                                                {vehicleModel.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage>{errors.vehicleModelId && errors.vehicleModelId.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Status </FormLabel>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(checked)}
                                />
                            </FormControl>
                            <FormMessage>{errors.status && errors.status.message}</FormMessage>
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
