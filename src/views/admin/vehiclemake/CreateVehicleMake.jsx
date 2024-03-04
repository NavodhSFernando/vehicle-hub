import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
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

export default function CreateVehicleMake() {
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
                                Create New Vehicle Make
                            </h1>
                            <hr className="pb-3" />
                            <div className="flex flex-col items-start p-6 bg-white rounded-lg pb-6">
                                <FormDescription>Basic Information</FormDescription>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Name</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="Honda" {...field} />
                                </FormControl>
                                <div className="grid w-full max-w-sm items-center gap-3">
                                    <FormLabel className="pt-3" htmlFor="logo">
                                        Logo
                                    </FormLabel>
                                    <Input id="logo" type="file" />
                                </div>
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
