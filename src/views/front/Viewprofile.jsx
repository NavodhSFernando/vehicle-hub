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

function Viewprofile() {
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
                            <div className="flex flex-col items-start p-6 bg-white rounded-lg pb-6">
                                <FormDescription>Basic Information</FormDescription>
                                <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                                    Manage and Modify Vehicle Details for Enhanced Rental Services
                                </p>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Name</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="K L Ranasinghe" />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Email</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="abc@gmail.com" />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">NIC</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="200122303006" />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Drivers License Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="123-456-789" />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3" htmlFor="picture">
                                        Drivers License/ Valid Identification
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Input id="picture" type="file" />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Contact Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="76480678" />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Address</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="No 34, Dias Place, Colombo 7" />
                                </FormControl>

                                <div className="bg-white rounded-lg pt-4 pb-3">
                                    <Button type="submit" className="bg-indigo-800 ml-auto text-yellow-200">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col items-start p-6 bg-white rounded-lg pb-6">
                                <FormDescription>Change your Password</FormDescription>
                                <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                                    Complete the fields below to change your password. You will need to enter your
                                    current password first.
                                </p>
                                <div className="flex flex-col space-y-1 pt-4">
                                    <FormLabel className="pb-3">Current Password</FormLabel>
                                </div>
                                <FormControl>
                                    <Input />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">New Password</FormLabel>
                                </div>
                                <FormControl>
                                    <Input />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Confirm New Password</FormLabel>
                                </div>
                                <FormControl>
                                    <Input />
                                </FormControl>

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
                                    Delete any and all content you have, such as rental history, invoices and profile
                                    details.
                                </p>
                                <div className="bg-white rounded-lg pt-4 pb-3">
                                    <Button
                                        type="submit"
                                        className=" bg-red-600 hover:bg-red-800 text-white font-bold ml-auto "
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default Viewprofile
