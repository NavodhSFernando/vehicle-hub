import React, { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    nic: z.string().length(12),
    contactNumber: z.string(),
    currentPassword: z.string(),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(8),
    valid: z
        .any()
        .refine((file) => file?.length == 1, 'File is required.')
        .refine((file) => file[0]?.size <= 5000000, 'Max file size is 5MB')
        .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file[0]?.type), {
            message: 'Invalid file type'
        })
})

function Viewprofile() {
    const { Id } = useParams() // Access route parameter
    const fileInputRef = useRef('')
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            nic: '',
            licenseno: '',
            contactNumber: '',
            address: '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5062/api/customer/${Id}`
            try {
                const { data } = await axios.get(url)
                console.log(data.name)
                console.log(data.email)
                console.log(data.nic)
                console.log(data.licenseno)
                console.log(data.contactNumber)
                console.log(data.address)
                console.log(data.valid)
                reset({
                    name: data.name,
                    email: data.email,
                    nic: data.nic,
                    licenseno: data.licenseno,
                    contactNumber: data.contactNumber,
                    address: data.address,
                    valid: data.valid
                })
            } catch (error) {
                console.error('Failed to fetch profile', error)
            }
        }
        fetchData()
    }, [Id, reset])

    const handleFileChange = (e) => {
        const files = e.target.files
        if (files.length > 0) {
            const files = e.target.files
            setValue('valid', files, { shouldValidate: true })
        }
    }

    const handleSave = async (data) => {
        try {
            const formData = {
                Name: data.name,
                email: data.email,
                nic: data.nic,
                licenseno: data.licenseno,
                valid: data.valid[0].name,
                contactNumber: data.contactNumber,
                address: data.address,
                currentPassword: data['current password'],
                newPassword: data['new password'],
                confirmPassword: data['confirm new password']
            }
            // Handle file data appropriately for your backend

            const url = `http://localhost:5062/api/customer/${Id}`
            const result = await axios.put(url, formData)
            console.log(result)
            reset()
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
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
                                    <Input placeholder="K L Ranasinghe" {...field} />
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
                                    <Input placeholder="abc@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage>{errors.name?.message}</FormMessage>
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
                                    <Input placeholder="200122303006" {...field} />
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
                                    <Input placeholder="123-456-789" {...field} />
                                </FormControl>
                                <FormMessage>{errors.licenseno?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="valid"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3" htmlFor="picture">
                                        Drivers License/ Valid Identification
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input id="picture" type="file" onChange={handleFileChange} {...field} />
                                </FormControl>
                                <FormMessage>{errors.valid?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="contactNumber"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Contact Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="76480678" {...field} />
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
                                    <Input placeholder="No 34, Dias Place, Colombo 7" {...field} />
                                </FormControl>
                                <FormMessage>{errors.address?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <div className="bg-white rounded-lg pt-4 pb-3">
                        <Button type="submit" className="bg-indigo-800 ml-auto text-yellow-200">
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
