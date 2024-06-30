import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
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
import axios from 'axios'
import { useRef } from 'react'
import { useToast } from '../../../components/ui/use-toast'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'
import apiclient from '../../../axiosConfig'

export default function EditVehiclePhotos({ vehicleId }) {
    const fileInputRef = useRef('')
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm()

    const { toast } = useToast()

    const baseThumbnailUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'
    const baseFrontImgUrl = 'https://vehiclehubimages.blob.core.windows.net/front/'
    const baseRearImgUrl = 'https://vehiclehubimages.blob.core.windows.net/rear/'
    const baseDashboardUrl = 'https://vehiclehubimages.blob.core.windows.net/dashboard/'
    const baseInteriorUrl = 'https://vehiclehubimages.blob.core.windows.net/interior/'

    const [thumbnail, setThumbnail] = useState(null)
    const [frontImg, setFrontImg] = useState(null)
    const [rearImg, setRearImg] = useState(null)
    const [dashboard, setDashboard] = useState(null)
    const [interior, setInterior] = useState(null)

    const fetchData = async () => {
        const url = `/Vehicle/${vehicleId}`
        try {
            const { data } = await apiclient.get(url)
            setThumbnail(data.thumbnail)
            setFrontImg(data.frontImg)
            setRearImg(data.rearImg)
            setDashboard(data.dashboardImg)
            setInterior(data.interiorImg)

            reset({
                thumbnail: null,
                frontImg: null,
                rearImg: null,
                dashboardImg: null,
                interiorImg: null
            })
            console.log(fileInputRef.current)
        } catch (error) {
            console.error('Failed to fetch vehicle', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [vehicleId, reset])

    const handleThumbnailChange = (e) => {
        const files = e.target.files
        setValue('thumbnail', files, { shouldValidate: true })
    }

    const handleFrontImgChange = (e) => {
        const files = e.target.files
        setValue('frontImg', files, { shouldValidate: true })
    }

    const handleRearImgChange = (e) => {
        const files = e.target.files
        setValue('rearImg', files, { shouldValidate: true })
    }

    const handleDashboardImgChange = (e) => {
        const files = e.target.files
        setValue('dashboard', files, { shouldValidate: true })
    }

    const handleInteriorImgChange = (e) => {
        const files = e.target.files
        setValue('interior', files, { shouldValidate: true })
    }

    const handleThumbnailSave = async (data) => {
        const url = `/Vehicle/Thumbnail/${vehicleId}`
        try {
            const formData = new FormData()
            formData.append('formFile', data.thumbnail ? data.thumbnail[0] : null)
            const response = await apiclient.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data && response.data.thumbnail) {
                setThumbnail(response.data.thumbnail)
            }
            reset()
            fetchData()
            toast({
                variant: 'success',
                description: 'Thumbnail updated successfully'
            })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleFrontImgSave = async (data) => {
        const url = `/Vehicle/FrontImg/${vehicleId}`
        try {
            const formData = new FormData()
            formData.append('front', data.frontImg[0])
            const response = await apiclient.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data && response.data.frontImg) {
                setFrontImg(response.data.frontImg)
            }
            reset()
            fetchData()
            toast({
                variant: 'success',
                description: 'Front Image updated successfully'
            })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleRearImgSave = async (data) => {
        const url = `/Vehicle/RearImg/${vehicleId}`
        try {
            const formData = new FormData()
            formData.append('rear', data.rearImg[0])
            const response = await apiclient.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data && response.data.rearImg) {
                setRearImg(response.data.rearImg)
            }
            reset()
            fetchData()
            toast({
                variant: 'success',
                description: 'Rear Image updated successfully'
            })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleDashboardImgSave = async (data) => {
        const url = `/api/Vehicle/DashboardImg/${vehicleId}`
        try {
            const formData = new FormData()
            formData.append('dashboard', data.dashboard[0])
            const response = await apiclient.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data && response.data.dashboard) {
                setDashboard(response.data.dashboard)
            }
            reset()
            fetchData()
            toast({
                variant: 'success',
                description: 'Dashboard Image updated successfully'
            })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleInteriorImgSave = async (data) => {
        const url = `/Vehicle/InteriorImg/${vehicleId}`
        try {
            const formData = new FormData()
            formData.append('interior', data.interior[0])
            const response = await apiclient.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.data && response.data.interior) {
                setInterior(response.data.interior)
            }
            reset()
            fetchData()
            toast({
                variant: 'success',
                description: 'Interior Image updated successfully'
            })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <Form {...control}>
            <form
                onSubmit={handleSubmit(handleThumbnailSave)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormDescription>Basic Information</FormDescription>
                <p className="text-xs text-gray-600">Manage and Modify Vehicle Details for Enhanced Rental Services.</p>
                <FormField
                    control={control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Thumbnail</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleThumbnailChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.formFile && errors.formFile.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Update"
                        alertTitle="Confirm Update"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={handleSubmit(handleThumbnailSave)}
                        buttonClass="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm"
                        variant="outline"
                    />
                </div>
                <img className=" object-contain h-40 w-40" src={`${baseThumbnailUrl}${thumbnail}`} alt="" />
            </form>

            <form
                onSubmit={handleSubmit(handleFrontImgSave)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormField
                    control={control}
                    name="frontImg"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Front Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleFrontImgChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.frontImg && errors.frontImg.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Update"
                        alertTitle="Confirm Update"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={handleSubmit(handleFrontImgSave)}
                        buttonClass="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm"
                        variant="outline"
                    />
                </div>
                <img className=" object-contain h-40 w-40" src={`${baseFrontImgUrl}${frontImg}`} alt="" />
            </form>

            <form
                onSubmit={handleSubmit(handleRearImgSave)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormField
                    control={control}
                    name="rearImg"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Rear Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleRearImgChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.rearImg && errors.rearImg.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Update"
                        alertTitle="Confirm Update"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={handleSubmit(handleRearImgSave)}
                        buttonClass="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm"
                        variant="outline"
                    />
                </div>
                <img className=" object-contain h-40 w-40" src={`${baseRearImgUrl}${rearImg}`} alt="" />
            </form>

            <form
                onSubmit={handleSubmit(handleDashboardImgSave)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormField
                    control={control}
                    name="dashboard"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Dashboard Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleDashboardImgChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.dashboardImg && errors.dashboardImg.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Update"
                        alertTitle="Confirm Update"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={handleSubmit(handleDashboardImgSave)}
                        buttonClass="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm"
                        variant="outline"
                    />
                </div>
                <img className=" object-contain h-40 w-40" src={`${baseDashboardUrl}${dashboard}`} alt="" />
            </form>

            <form
                onSubmit={handleSubmit(handleInteriorImgSave)}
                className="w-full space-y-4 flex flex-col items-start p-6 bg-white rounded-lg pb-6"
            >
                <FormField
                    control={control}
                    name="interior"
                    render={({ field }) => (
                        <FormItem className="w-1/2">
                            <FormLabel className="pb-3 w-full">Interior Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    className="w-full"
                                    ref={fileInputRef}
                                    onChange={handleInteriorImgChange}
                                />
                            </FormControl>
                            <FormMessage>{errors.interiorImg && errors.interiorImg.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className="p-6 bg-white rounded-lg pt-4 pb-3 ml-auto">
                    <AlertDialogDemo
                        triggerText="Update"
                        alertTitle="Confirm Update"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={handleSubmit(handleInteriorImgSave)}
                        buttonClass="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-lg text-sm"
                        variant="outline"
                    />
                </div>
                <img className=" object-contain h-40 w-40" src={`${baseInteriorUrl}${interior}`} alt="" />
            </form>
        </Form>
    )
}
