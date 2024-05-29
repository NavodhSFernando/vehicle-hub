import React, { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Button } from '../../components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    nic: z.string().length(12),
    contactNumber: z.number(),
    address: z.string({
        required_error: 'address is required'
    }),
    licenseno: z.string({
        required_error: 'Driving License Number is required'
    })
})

function Viewprofile() {
    const { customerId } = useParams() // Access route parameter
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            nic: '',
            licenseno: '',
            contactNumber: 0,
            address: ''
        }
    })

    useEffect(() => {
        if (customerId) {
            const fetchData = async () => {
                const url = `http://localhost:5062/api/customer/${customerId}`
                try {
                    const { data } = await axios.get(url)
                    console.log(data)

                    reset({
                        name: data.name,
                        email: data.email,
                        nic: data.nic,
                        licenseno: data.drivingLicenseNo,
                        contactNumber: data.contactNo,
                        address: data.address
                    })
                } catch (error) {
                    console.error('Failed to fetch profile', error)
                }
            }
            fetchData()
        }
    }, [reset])

    const handleSave = async (data) => {
        try {
            if (!customerId) {
                console.error('customer Id is not available')
                return
            }

            const formData = {
                Name: data.name,
                Email: data.email,
                NIC: data.nic,
                DrivingLicenseNo: data.licenseno,
                ContactNo: data.contactNumber,
                Address: data.address
            }
            // Handle file data appropriately for your backend

            const url = `http://localhost:5062/api/customer/${customerId}`
            const result = await axios.put(url, formData)
            console.log(result.data)
        } catch (error) {
            console.error('Failed to update the profile', error)
        }
    }

    return (
        <Form {...control}>
            <form onSubmit={handleSubmit(handleSave)} className="w-full space-y-4">
                <div className="flex flex-col p-6 bg-white rounded-lg pb-6">
                    <FormDescription>Basic Information</FormDescription>
                    <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                        Manage and Modify Vehicle Details for Enhanced Rental Services
                    </p>
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Name</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.name?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Email</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="nic"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">NIC</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.nic?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="licenseno"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Drivers License Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.licenseno?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="contactNumber"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Contact Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="number" // Ensure input type is number for direct numeric input
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage>{errors.contactNumber?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Address</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.address?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <div className="bg-white rounded-lg pt-4 pb-3">
                        <Button onClick={handleSave} type="submit" className="bg-indigo-800 ml-auto text-yellow-200">
                            Save Changes
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col items-start p-6 bg-white rounded-lg pb-6">
                    <FormDescription>Delete Customer</FormDescription>
                    <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                        Delete your profile, along with your authentication associations.
                    </p>
                    <hr />
                    <p className="text-s text-gray-600 text-left mb-2 font-semibold">
                        Delete any and all content you have, such as rental history, invoices and profile details.
                    </p>
                    <div className="bg-white rounded-lg pt-4 pb-3">
                        <Button type="submit" className=" bg-red-600 hover:bg-red-800 text-white font-bold ml-auto ">
                            Delete Account
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default Viewprofile
