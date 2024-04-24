import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
    name: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    })
})

function Viewprofile() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: ''
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <div className="flex flex-col p-6 bg-white rounded-lg pb-6">
                    <FormDescription>Basic Information</FormDescription>
                    <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                        Manage and Modify Vehicle Details for Enhanced Rental Services
                    </p>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Name</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="K L Ranasinghe" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Email</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="abc@gmail.com" />
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
                                    <FormLabel className=" pb-3">NIC</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="200122303006" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="drivers license number"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Drivers License Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="123-456-789" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="drivers license number"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3" htmlFor="picture">
                                        Drivers License/ Valid Identification
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input id="picture" type="file" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contact number"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Contact Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="76480678" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Address</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="No 34, Dias Place, Colombo 7" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="bg-white rounded-lg pt-4 pb-3">
                        <Button type="submit" className="bg-indigo-800 ml-auto text-yellow-200">
                            Save Changes
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col p-6 bg-white rounded-lg pb-6">
                    <FormDescription>Change your Password</FormDescription>
                    <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                        Complete the fields below to change your password. You will need to enter your current password
                        first.
                    </p>

                    <FormField
                        control={form.control}
                        name="current password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-4">
                                    <FormLabel className="pb-3">Current Password</FormLabel>
                                </div>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="new password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">New Password</FormLabel>
                                </div>
                                <FormControl>
                                    <Input />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirm new password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Confirm New Password</FormLabel>
                                </div>
                                <FormControl>
                                    <Input />
                                </FormControl>
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
