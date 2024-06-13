import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRef } from 'react'
import { set } from 'date-fns'

//const regNoPattern = /^[A-Z]{2}\s\d{4}$/

export default function EditVehiclePhotos({ vehicleId }) {
    const fileInputRef = useRef('')
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm()

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
        const url = `http://localhost:5062/api/Vehicle/${vehicleId}`
        try {
            const { data } = await axios.get(url)
            console.log('data', data)
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
        const url = `http://localhost:5062/api/Vehicle/Thumbnail/${vehicleId}`
        try {
            const formData = new FormData()
            console.log(data)
            formData.append('formFile', data.thumbnail ? data.thumbnail[0] : null)

            console.log('Form Data:', formData)

            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Response:', response.data)
            if (response.data && response.data.thumbnail) {
                setThumbnail(response.data.thumbnail)
            }
            fetchData()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleFrontImgSave = async (data) => {
        const url = `http://localhost:5062/api/Vehicle/FrontImg/${vehicleId}`
        try {
            const formData = new FormData()
            console.log(data)
            formData.append('front', data.frontImg[0])

            console.log('Form Data:', formData)

            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Response:', response.data)
            if (response.data && response.data.frontImg) {
                setFrontImg(response.data.frontImg)
            }
            fetchData()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleRearImgSave = async (data) => {
        const url = `http://localhost:5062/api/Vehicle/RearImg/${vehicleId}`
        try {
            const formData = new FormData()
            console.log('data', data)
            formData.append('rear', data.rearImg[0])

            console.log('Form Data:', formData)

            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Response:', response.data)
            if (response.data && response.data.rearImg) {
                setRearImg(response.data.rearImg)
            }
            fetchData()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleDashboardImgSave = async (data) => {
        const url = `http://localhost:5062/api/Vehicle/DashboardImg/${vehicleId}`
        try {
            const formData = new FormData()
            console.log('data', data)
            formData.append('dashboard', data.dashboard[0])

            console.log('Form Data:', formData)

            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Response:', response.data)
            if (response.data && response.data.dashboard) {
                setDashboard(response.data.dashboard)
            }
            fetchData()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleInteriorImgSave = async (data) => {
        const url = `http://localhost:5062/api/Vehicle/InteriorImg/${vehicleId}`
        try {
            const formData = new FormData()
            console.log(data)
            formData.append('interior', data.interior[0])

            console.log('Form Data:', formData)

            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Response:', response.data)
            if (response.data && response.data.interior) {
                setInterior(response.data.interior)
            }
            fetchData()
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
                    <Button type="submit" className="bg-indigo-600">
                        Update
                    </Button>
                </div>
                <img className=" object-contain h-60 w-60" src={`${baseThumbnailUrl}${thumbnail}`} />
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
                    <Button type="submit" className="bg-indigo-600">
                        Update
                    </Button>
                </div>
                <img className=" object-contain h-60 w-60" src={`${baseFrontImgUrl}${frontImg}`} />
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
                    <Button type="submit" className="bg-indigo-600">
                        Update
                    </Button>
                </div>
                <img className=" object-contain h-60 w-60" src={`${baseRearImgUrl}${rearImg}`} />
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
                    <Button type="submit" className="bg-indigo-600">
                        Update
                    </Button>
                </div>
                <img className=" object-contain h-60 w-60" src={`${baseDashboardUrl}${dashboard}`} />
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
                    <Button type="submit" className="bg-indigo-600">
                        Update
                    </Button>
                </div>
                <img className=" object-contain h-60 w-60" src={`${baseInteriorUrl}${interior}`} />
            </form>
        </Form>
    )
}
