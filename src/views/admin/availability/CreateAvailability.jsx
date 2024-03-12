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

export default function CreateAvailability() {
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
                                <div className="flex flex-col space-y-1 pt-4">
                                    <FormLabel className="pb-3">Vehicle ID</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="1001" {...field} />
                                </FormControl>

                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Reservation ID</FormLabel>
                                </div>
                                <FormControl>
                                    <Input placeholder="001" {...field} />
                                </FormControl>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Availability Status</FormLabel>
                                </div>
                                <Select>
                                    <SelectTrigger className="w-2/3">
                                        <SelectValue placeholder="Available" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="001">Available</SelectItem>
                                        <SelectItem value="002">Not Available</SelectItem>
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
