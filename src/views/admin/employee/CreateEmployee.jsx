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

const formSchema = z.object({
    name: z.string().min(8, {
        message: 'Name must be at least 8 characters.'
    })
})

export default function CreateEmployee() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema)
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
                className="w-full space-y-4 flex flex-col p-6 bg-white rounded-lg "
            >
                <FormDescription>Basic Information</FormDescription>
                <p className="text-xs text-gray-600">Onboard and Manage Team Members for Efficient Operations.</p>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-4">
                                <FormLabel className="pb-3">Name</FormLabel>
                            </div>
                            <FormControl>
                                <Input placeholder="G K Ranasinghe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Email</FormLabel>
                            </div>
                            <FormControl>
                                <Input placeholder="ranasinghe2001@email.com" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Date of Birth</FormLabel>
                            </div>
                            <FormControl>
                                <Input placeholder="1995.03.10" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Phone</FormLabel>
                            </div>
                            <FormControl>
                                <Input placeholder="077445680653" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nic"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">NIC</FormLabel>
                            </div>
                            <FormControl>
                                <Input placeholder="200145604322" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className=" pb-3">Gender</FormLabel>
                            </div>
                            <Select>
                                <SelectTrigger className="w-2/3">
                                    <SelectValue placeholder="Select Option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="001">Male</SelectItem>
                                    <SelectItem value="002">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Department</FormLabel>
                            </div>
                            <Select>
                                <SelectTrigger className="w-2/3">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="001">Management</SelectItem>
                                    <SelectItem value="002">IT</SelectItem>
                                    <SelectItem value="003">Finance</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Password</FormLabel>
                            </div>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col space-y-1 pt-6">
                                <FormLabel className="pb-3">Status</FormLabel>
                            </div>
                            <Select>
                                <SelectTrigger className="w-2/3">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="001">New</SelectItem>
                                    <SelectItem value="002">Old</SelectItem>
                                </SelectContent>
                            </Select>
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

//{
/* <FormField
                    control={form.control}
                    name="status"
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
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */
//}
