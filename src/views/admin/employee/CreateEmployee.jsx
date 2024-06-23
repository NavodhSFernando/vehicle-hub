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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import Password from '../../front/Password'
import { Checkbox } from '../../../components/ui/checkbox'
import apiclient from '../../../axiosConfig'
import { Switch } from '../../../components/ui/switch'

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    address: z.string({
        required_error: 'address is required'
    }),
    role: z.string({
        required_error: 'role is required'
    }),
    dob: z.string().regex(/^\d{4}\-\d{2}\-\d{2}$/, { message: 'Date of birth must be in YYYY-MM-DD format' }),
    contactNo: z.number().int(),
    nic: z.string().length(12),
    gender: z.string({
        required_error: 'gender is required'
    }),
    department: z.string({
        required_error: 'department is required'
    }),
    status: z.boolean().default(true) // Added status field
})

export default function CreateEmployee() {
    // 1. Define your form.
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

    const handleSave = async (data) => {
        const url = '/EmployeeAuth/register'
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
                Password: '',
                Status: data.status
            }
            console.log(formData)

            const result = await apiclient.post(url, formData)
            console.log(result)
            console.log(formData)
            reset()
        } catch (error) {
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
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                    {...field}
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
                                <Input type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage>{errors.phone && errors.phone.message}</FormMessage>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value || ''}>
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
                                defaultValue={field.value}
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
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}
