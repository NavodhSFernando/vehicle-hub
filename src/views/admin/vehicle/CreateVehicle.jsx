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
    chassisNo: z.string({
        required_error: 'Chassis number is required'
    }),
    maintenanceType: z.string({
        required_error: 'Maintenance type is required'
    }),
    color: z.string({
        required_error: 'Color is required'
    }),
    costPerDay: z
        .number()
        .int()
        .min(3000, {
            message: 'Cost per day must be at least 3000'
        })
        .max(10000, {
            message: 'Cost per day must be no more than 10000'
        }),
    mileage: z.number().int().min(0, {
        message: 'Mileage must be more than 0'
    })
})

export default function CreateReservation() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            regNo: '',
            chassisNo: '',
            color: '',
            costPerDay: 0,
            mileage: 0,
            thumbnail: '',
            images: []
        }
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // This will be type-safe and validated.
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
                                <Input placeholder="QL 9904" className="w-full" {...field} />
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
                                <Input placeholder="SV30-0169266" className="w-full" {...field} />
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                <Input placeholder="White" className="w-full" {...field} />
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
                                    type="number"
                                    placeholder="10000"
                                    className="w-full"
                                    {...field}
                                    {...{
                                        onChange: (e) => {
                                            // Convert the input value to a number before setting it.
                                            field.onChange(parseFloat(e.target.value))
                                        }
                                    }}
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
                                    type="number"
                                    placeholder="2500KM"
                                    className="w-full"
                                    {...field}
                                    {...{
                                        onChange: (e) => {
                                            // Convert the input value to a number before setting it.
                                            field.onChange(parseFloat(e.target.value))
                                        }
                                    }}
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
                                <Input type="file" className="w-full" {...field} {...{}} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel htmlFor="picture" className="pb-3 w-full">
                                Add photos
                            </FormLabel>
                            <FormControl>
                                <Input type="file" multiple className="w-full" {...field} {...{}} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Status"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
