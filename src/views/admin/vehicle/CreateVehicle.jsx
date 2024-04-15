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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'

const regNoPattern = /^[A-Z]{2}\s\d{4}$/

const formSchema = z.object({
    regNo: z
        .string()
        .min(1, 'Registration number is required')
        .regex(
            regNoPattern,
            'Registration number must be in the format XX 9999, where X is any uppercase letter and 9 is any digit.'
        ),
    chassisNo: z.string().min(9, 'Chassis number should be at least 9 characters long.'),
    color: z.string().min(1, 'Color is required'),
    costPerDay: z
        .number()
        .int('Cost per day must be an integer')
        .min(3000, 'Cost per day must be at least 3000')
        .max(10000, 'Cost per day must be no more than 10000'),
    mileage: z.number().int('Mileage must be an integer').min(1, 'Mileage is required'),
    transmission: z.string().min(1, { message: 'Transmission type is required' }),
    status: z.string().min(1, { message: 'Status is required' }),
    thumbnail: z
        .any()
        .refine((thumbnail) => thumbnail?.length === 1, 'File is required.')
        .refine((thumbnail) => thumbnail[0]?.size <= 3000000, 'Max file size is 3MB')
    // images: z
    //     .any()
    //     .refine((images) => images?.length === 1, 'File is required.')
    //     .refine((images) => images[0]?.size <= 3000000, 'Max file size is 3MB')
})

export default function CreateVehicle() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            regNo: '',
            chassisNo: '',
            color: '',
            costPerDay: 0,
            mileage: 0,
            thumbnail: 0
            // images: []
        }
    })

    const fileRef = form.register('thumbnail', { required: true })

    // const filesRef = form.register('images', {
    //     required: 'You must select at least one file'
    // })

    function onSubmit(values) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormDescription>Basic Information</FormDescription>
                <p className="text-xs text-gray-600">Manage and Modify Vehicle Details for Enhanced Rental Services.</p>
                <FormField
                    control={form.control}
                    name="regNo"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Registration Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="QL 9904"
                                    className="w-full"
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="chassisNo"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Chassis Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="SV30-0169266"
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
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Transmission</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Transmission" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="oilChange">Auto</SelectItem>
                                    <SelectItem value="tireRotation">Manual</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Color</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="White"
                                    className="w-full"
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="costPerDay"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Cost Per Day</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Mileage</FormLabel>
                            <FormControl>
                                <Input
                                    type="number" // Ensure input type is number for direct numeric input
                                    className="w-full"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel htmlFor="picture" className="pb-3 w-full">
                                Add Thumbnail
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    {...fileRef}
                                    onChange={(e) => {
                                        // Get the file from the input
                                        const thumbnail = e.target.files[0]
                                        if (thumbnail) {
                                            field.onChange(thumbnail.name) // Update the form state with the file name if file is selected
                                        } else {
                                            field.onChange('') // Clear the form state if no file is selected
                                        }
                                    }}
                                    {...{}}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel htmlFor="images" className="pb-3 w-full">
                                Add Images
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    multiple
                                    {...filesRef}
                                    onChange={(e) => {
                                        // Get the files from the input, convert FileList to an array
                                        const files = Array.from(e.target.files)
                                        if (files.length > 0) {
                                            // Update the form state with the array of selected files
                                            field.onChange(files)
                                        } else {
                                            // Clear the form state if no files are selected
                                            field.onChange([])
                                        }
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Status</FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="oilChange">Active</SelectItem>
                                    <SelectItem value="tireRotation">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <Button type="submit" className="bg-indigo-600">
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}
