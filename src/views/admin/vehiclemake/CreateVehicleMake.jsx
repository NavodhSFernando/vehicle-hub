import React, { useRef } from 'react'
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
import axios from 'axios'

// File validation Schema
const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters.'),
    logo: z
        .any()
        .refine((file) => file?.length == 1, 'File is required.')
        .refine((file) => file[0]?.size <= 5000000, 'Max file size is 5MB')
        .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file[0]?.type), {
            message: 'Invalid file type'
        })
})

// Main function component
export default function CreateVehicleMake() {
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
            logo: ''
        }
    })

    // File change handler
    const handleFileChange = (e) => {
        const files = e.target.files
        setValue('logo', files, { shouldValidate: true })
    }

    //Submit handler
    const handleSave = async (data) => {
        const url = 'http://localhost:5062/api/VehicleMake'
        try {
            const formData = {
                Name: data.name,
                Logo: data.logo[0].name
            }

            const result = await axios.post(url, formData)
            console.log(result)
            reset()
            if (fileInputRef.current) {
                fileInputRef.current.value = '' // This clears the file input field
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...control}>
            <form
                onSubmit={handleSubmit(handleSave)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormDescription>Basic Information</FormDescription>
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Name</FormLabel>
                            <FormControl>
                                <Input className="w-full" {...field} />
                            </FormControl>
                            <FormMessage>{errors.name && errors.name.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Logo</FormLabel>
                            <FormControl>
                                <Input type="file" className="w-full" ref={fileInputRef} onChange={handleFileChange} />
                            </FormControl>
                            <FormMessage>{errors.logo && errors.logo.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <Button type="submit" className="bg-indigo-600">
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}
