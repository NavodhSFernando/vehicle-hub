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
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    })
})

export default function CreateMaintenanceType() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = (values) => {
        console.log(values)
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormDescription>Basic Information</FormDescription>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" className="w-full" {...field} />
                            </FormControl>
                            <FormMessage />
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
