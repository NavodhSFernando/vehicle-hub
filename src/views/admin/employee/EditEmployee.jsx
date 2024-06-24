import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { Button } from '../../../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Switch } from '../../../components/ui/switch'
import { useToast } from '../../../components/ui/use-toast'

import { useParams } from 'react-router-dom'
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

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    address: z.string({
        required_error: 'address is required'
    }),
    role: z.string({
        required_error: 'role is required'
    }),
    dob: z.string().regex(/^\d{4}\-\d{2}\-\d{2}$/, { message: 'Date of birth must be in YYYY.MM.DD format' }),
    contactNo: z.number().int(),
    nic: z.string().length(12),
    gender: z.string({
        required_error: 'gender is required'
    }),
    department: z.string({
        required_error: 'department is required'
    }),
    password: z.string().min(8).optional(),
    status: z.boolean().default(true)
})

export default function EditEmployee() {
    const { employeeId } = useParams() // Access route parameter
    console.log(employeeId)
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
            email: '',
            address: '',
            role: '',
            dob: '',
            contactNo: 0,
            nic: '',
            gender: '',
            department: '',
            status: true
        }
    })

    const fetchData = async () => {
        try {
            //const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${employeeId}`)
            //const decryptedId = decryptResponse.data.decryptedUserId

            const url = `http://localhost:5062/api/Employee/${employeeId}`
            const { data } = await axios.get(url)

            console.log(data)
            reset({
                name: data.name,
                email: data.email,
                address: data.address,
                role: data.role,
                dob: data.dob,
                contactNo: data.contactNo,
                nic: data.nic,
                gender: data.gender,
                department: data.department,
                status: data.status
            })
        } catch (error) {
            console.error('Failed to fetch Employee', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [employeeId, reset])

    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/Employee/${employeeId}`
        try {
            const formData = {
                Name: data.name,
                Email: data.email,
                Address: data.address,
                Role: data.role,
                DOB: data.dob,
                ContactNo: data.contactNo,
                NIC: data.nic,
                Gender: data.gender,
                Department: data.department,
                Status: data.status
            }
            console.log(formData)

            const result = await axios.put(url, formData)
            console.log(result)
            toast({
                variant: 'success',
                description: 'Updated the Employee successfully!'
            })
            navigate('/admin/employee/view')
        } catch (error) {
            toast({
                variant: 'destructive_border',
                description: 'Failed to update the Employee!'
            })
            console.error('Failed to Update', error)
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server responded with error data:', error.response.data)
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server')
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error setting up request:', error.message)
            }
        }
    }

    return (
        <Form {...control}>
            <form
                onSubmit={handleSubmit(handleSave)}
                className="w-full space-y-4 flex flex-col p-6 bg-white rounded-lg "
            >
                <FormDescription>Basic Information</FormDescription>
                <p className="text-xs text-gray-600">Onboard and Manage Team Members for Efficient Operations.</p>
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-4">
                                <FormLabel className="pb-3">Name</FormLabel>
                            </div>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage>{errors.name && errors.name.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Email</FormLabel>
                            </div>
                            <FormControl>
                                <Input
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.email && errors.email.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Address</FormLabel>
                            </div>
                            <FormControl>
                                <Input
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.address && errors.address.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Role</FormLabel>
                            </div>
                            <FormControl>
                                <Input
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.role && errors.role.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Date of Birth</FormLabel>
                            </div>
                            <FormControl>
                                <Input
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.dob && errors.dob.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="contactNo"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Phone</FormLabel>
                            </div>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage>{errors.contactNo && errors.contactNo.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="nic"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">NIC</FormLabel>
                            </div>
                            <FormControl>
                                <Input
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.nic && errors.nic.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className=" pb-3">Gender</FormLabel>
                            </div>
                            <Select onValueChange={field.onChange} {...field} value={field.value}>
                                <SelectTrigger className="w-2/3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage>{errors.gender && errors.gender.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="department"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3 w-full">Department</FormLabel>
                            </div>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                {...field}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-2/3">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Management">Management</SelectItem>

                                    <SelectItem value="Finance">Finance</SelectItem>
                                    <SelectItem value="IT">IT</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage>{errors.transmission && errors.transmission.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <div className="flex flex-col space-y-1 pt-6"></div>
                            <FormLabel className="pb-3 w-full">Status </FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage>{errors.status && errors.status.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="flex  flex-col items-start p-6 bg-white rounded-lg pt-4 pb-3">
                    <Button type="submit" className="flex flex-col bg-indigo-600 ml-auto ">
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    )
}
