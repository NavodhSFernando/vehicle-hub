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

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    })
})

export default function CreateUser() {
    const form = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <h1 className="flex flex-col items-start font-bold text-gray-800 text-2xl pb-3 pt-3">
                                Create New User
                            </h1>
                            <hr className="pb-3" />
                            <div className="flex flex-col items-start p-6 bg-white rounded-lg pb-6">
                                <FormDescription>Basic Information</FormDescription>
                                <p className="text-xs text-gray-600">
                                    Onboard and Manage Team Members for Efficient Operations.
                                </p>
                                <div className="flex flex-col space-y-1 pt-4">
                                    <FormLabel className="pb-3">Name</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="G K Ranasinghe" {...field} />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Email</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="ranasinghe2001@email.com" {...field} />
                                </FormControl>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Date of Birth</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="1995.03.10" {...field} />
                                </FormControl>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Phone</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="077445680653" {...field} />
                                </FormControl>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">NIC</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="200145604322" {...field} />
                                </FormControl>
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
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Password</FormLabel>
                                </div>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
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
                            </div>
                            <div className="flex  flex-col items-start p-6 bg-white rounded-lg pt-4 pb-3">
                                <Button type="submit" className="flex flex-col bg-indigo-600 ml-auto ">
                                    Create
                                </Button>
                            </div>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
