import React, { useRef, useEffect, useState } from 'react'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import Cookies from 'js-cookie'
import { confirmAlert } from 'react-confirm-alert'
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
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from '../../../src/components/ui/dialog'

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    nic: z.string().length(12),
    contactNumber: z.number(),
    address: z.string({
        required_error: 'address is required'
    }),
    licenseno: z.string({
        required_error: 'Driving License Number is required'
    })
})

function Viewprofile() {
    const [decrypt, setDecrypt] = useState('') // State for tracking the decrypted Customer ID
    const navigate = useNavigate()
    const customerId = useOutletContext()
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            nic: '',
            licenseno: '',
            contactNumber: 0,
            address: ''
        }
    })

    useEffect(() => {
        const decryptId = async () => {
            try {
                const response = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${customerId}`)
                setDecrypt(response.data.decryptedUserId)
            } catch (error) {
                console.error('Failed to decrypt Customer ID:', error)
            }
        }
        decryptId()
    }, [customerId])

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:5062/api/customer/${decrypt}`
            try {
                const { data } = await axios.get(url)
                console.log(data)

                reset({
                    name: data.name,
                    email: data.email,
                    nic: data.nic,
                    licenseno: data.drivingLicenseNo,
                    contactNumber: data.contactNo,
                    address: data.address
                })
            } catch (error) {
                console.error('Failed to fetch profile', error)
            }
        }
        fetchData()
    }, [decrypt, reset])

    const handleSave = async (data) => {
        try {
            if (!customerId) {
                console.error('customer Id is not available')
                return
            }

            const formData = {
                Name: data.name,
                Email: data.email,
                NIC: data.nic,
                DrivingLicenseNo: data.licenseno,
                ContactNo: data.contactNumber,
                Address: data.address
            }
            // Handle file data appropriately for your backend

            const url = `http://localhost:5062/api/customer/${decrypt}`
            const result = await axios.put(url, formData)
            console.log(result.data)
        } catch (error) {
            console.error('Failed to update the profile', error)
        }
    }

    const handleDeleteAccount = async () => {
        try {
            const url = `http://localhost:5062/api/CustomerAuth/deactivate/${decrypt}`
            const result = await axios.put(url)
            console.log(result.data)
            navigate('/signup')
        } catch (error) {
            console.error('Failed to delete the account', error)
        }
    }

    // Dialog state management
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const openDialog = () => setIsDialogOpen(true)

    const closeDialog = () => setIsDialogOpen(false)

    return (
        <Form {...control}>
            <form onSubmit={handleSubmit(handleSave)} className="w-full space-y-4">
                <div className="flex flex-col p-6 bg-white rounded-lg pb-6">
                    <FormDescription>Basic Information</FormDescription>
                    <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                        Manage and Modify Vehicle Details for Enhanced Rental Services
                    </p>
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Name</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.name?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Email</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="nic"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">NIC</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.nic?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="licenseno"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Drivers License Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.licenseno?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="contactNumber"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className="pb-3">Contact Number</FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        type="number" // Ensure input type is number for direct numeric input
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage>{errors.contactNumber?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-col space-y-1 pt-6">
                                    <FormLabel className=" pb-3">Address</FormLabel>
                                </div>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{errors.address?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <div className="bg-white rounded-lg pt-4 pb-3">
                        <Button onClick={handleSave} type="submit" className="bg-indigo-800 ml-auto text-yellow-200">
                            Save Changes
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col items-start p-6 bg-white rounded-lg pb-6">
                    <FormDescription>Reset Password</FormDescription>
                    <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                        Click the button below to reset your password.
                    </p>
                    <p className="text-s text-gray-600 text-left mb-2 font-semibold">
                        You can reset your password anytime you want for further security.
                    </p>
                    <div className="bg-white rounded-lg pt-4 pb-3">
                        <Button
                            onClick={() => navigate('/profileresetpassword')}
                            className="bg-indigo-800 ml-auto text-yellow-200"
                        >
                            Reset Password
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
                        Delete any and all content you have, such as rental history, invoices and profile details.
                    </p>
                    <div className="bg-white rounded-lg pt-4 pb-3">
                        <Button
                            type="submit"
                            className=" bg-red-600 hover:bg-red-800 text-white font-bold ml-auto "
                            onClick={openDialog}
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                    <DialogContent>
                        <DialogClose
                            as="button"
                            onClick={closeDialog}
                            className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        />
                        <DialogHeader>
                            <DialogTitle className="text-gray-800 font-bold">Confirm to delete</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="text-gray-400">
                            Are you sure you want to delete your account?
                        </DialogDescription>
                        <DialogFooter className="flex justify-end gap-4 mt-4">
                            <Button
                                onClick={handleDeleteAccount}
                                className="bg-red-600 hover:bg-red-800 text-white font-bold px-6 py-2 rounded-lg"
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={closeDialog}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold px-6 py-2 rounded-lg"
                            >
                                No
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </form>
        </Form>
    )
}

export default Viewprofile
