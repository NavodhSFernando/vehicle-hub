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
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'

const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters.'),
    formFile: z.any().refine((file) => file?.length === 1, 'File is required.')
})

export default function CreateVehicleMake() {
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
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
            formFile: null
        }
    })

    // File change handler
    const handleFileChange = (e) => {
        const files = e.target.files
        setValue('formFile', files, { shouldValidate: true })
    }

    // Submit handler
    const handleSave = async (data) => {
        const url = 'http://localhost:5062/api/VehicleMake'
        try {
            // Create FormData object and append the name and formFile
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('formFile', data.formFile[0]) // Ensure the key matches the backend expectation

            // Send the form data as multipart/form-data
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.data)
            if (fileInputRef.current) {
                fileInputRef.current.value = '' // This clears the file input field
            }
            navigate(`/admin/vehiclemake/view`)
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
                    name="formFile"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Logo</FormLabel>
                            <FormControl>
                                <Input type="file" className="w-full" ref={fileInputRef} onChange={handleFileChange} />
                            </FormControl>
                            <FormMessage>{errors.formFile && errors.formFile.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Create"
                        alertTitle="Create New Vehicle Make"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={handleSubmit(handleSave)}
                    />
                </div>
            </form>
        </Form>
    )
}
