import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
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

const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters.'),
    formFile: z.any().refine((file) => file?.length === 1, 'File is required.')
    // .refine((file) => file[0]?.size <= 5000000, 'Max file size is 5MB')
    // .refine((file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file[0]?.type), {
    //     message: 'Invalid file type'
    // })
})

export default function EditVehicleMake() {
    const { vehicleMakeId } = useParams() // Access route parameter
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

    const [image, setImage] = useState('')

    const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/logos/'

    // Fetch vehicle make data
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5062/api/VehicleMake/${vehicleMakeId}`
            try {
                const { data } = await axios.get(url)
                setImage(data.logo)
                console.log(image)
                reset({
                    name: data.name,
                    formFile: null
                })
            } catch (error) {
                console.error('Failed to fetch vehicle make', error)
            }
        }
        fetchData()
    }, [vehicleMakeId, reset])

    const handleFileChange = (e) => {
        const files = e.target.files
        setValue('formFile', files, { shouldValidate: true })
    }

    const handleSave = async (data) => {
        const url = `http://localhost:5062/api/VehicleMake/${vehicleMakeId}`
        console.log(data.formFile[0])
        console.log(data.name)
        try {
            const formData = new FormData()
            formData.append('Name', data.name)
            formData.append('file', data.formFile[0])
            // Send the form data as multipart/form-data

            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            // Assuming the response contains the new logo URL
            if (response.data && response.data.logo) {
                setImage(response.data.logo)
            }
            console.log(response)
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
                <FormDescription>Edit Basic Information</FormDescription>
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
                <img className=" object-contain pt-3 h-24 w-24" src={`${baseUrl}${image}`} />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <Button type="submit" className="bg-indigo-600">
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    )
}
