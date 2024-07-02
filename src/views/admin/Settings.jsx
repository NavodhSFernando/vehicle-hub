import React from 'react'
import GeneralSettings from './GeneralSettings'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate()

    const handleResetPassword = () => {
        navigate('../resetpassword')
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-xl p-8 space-y-6 bg-white rounded-lg shadow-md mx-auto mt-8">
                <h1 className="text-xl font-bold text-center text-gray-800">Settings</h1>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                        <span className="text-gray-700">Reset Password</span>
                        <button
                            className="bg-[#283280] hover:bg-[#283299]  text-[#FBDAC6] px-4 py-2 rounded-md "
                            onClick={handleResetPassword}
                        >
                            Reset
                        </button>
                    </div>
                    <GeneralSettings />
                </div>
            </div>
        </div>
    )
}

export default Settings
