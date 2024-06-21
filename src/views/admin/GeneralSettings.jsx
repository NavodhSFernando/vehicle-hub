import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/ui/button'

const GeneralSettings = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        console.log('General Settings Data:', data)
        // Handle the data submission logic here
    }

    return (
        <div className="w-full max-w-xl p-8 space-y-6 bg-gray-100 rounded-lg shadow-md mx-auto mt-8">
            <h1 className="text-xl font-bold text-center text-gray-800">General Settings</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="timezone">
                        Timezone
                    </label>
                    <select
                        id="timezone"
                        {...register('timezone', { required: true })}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="UTC-5">UTC-5</option>
                        <option value="UTC-6">UTC-6</option>
                        {/* Add more timezones as needed */}
                    </select>
                    {errors.timezone && <p className="text-red-500 text-xs italic">Please select a timezone.</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="language">
                        Language
                    </label>
                    <select
                        id="language"
                        {...register('language', { required: true })}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        {/* Add more languages as needed */}
                    </select>
                    {errors.language && <p className="text-red-500 text-xs italic">Please select a language.</p>}
                </div>

                <div className="flex items-center justify-between">
                    <Button
                        type="submit"
                        className="w-full hover:bg-indigo-700 bg-indigo-600 text-white py-2 rounded-md"
                    >
                        Save Settings
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default GeneralSettings
