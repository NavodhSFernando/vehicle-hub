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
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../components/ui/use-toast'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'

const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters.'),
    formFile: z.any().refine((file) => file?.length === 1, 'File is required.')
})

export default function EditVehicleMake() {
    const navigate = useNavigate()
    const { vehicleMakeId } = useParams() // Access route parameter
    const fileInputRef = useRef(null)
    const { toast } = useToast()
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

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5062/api/VehicleMake/${vehicleMakeId}`
            try {
                const { data } = await axios.get(url)
                setImage(data.logo)
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
        try {
            const formData = new FormData()
            formData.append('Name', data.name)
            formData.append('file', data.formFile[0])

            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data && response.data.logo) {
                setImage(response.data.logo)
            }
            toast({
                variant: 'success',
                description: 'VehicleMake Updated successfully'
            })
            console.log('Request vehicle response:', response.data)
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
                <img className=" object-contain pt-3 h-24 w-24" src={`${baseUrl}${image}`} alt="" />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Update"
                        alertTitle="Update Vehicle Make"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={handleSubmit(handleSave)}
                    />
                </div>
            </form>
        </Form>
    )
}
