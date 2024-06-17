import React from 'react'
import ResetPassword from './ResetPassword'
import GeneralSettings from './GeneralSettings'

const Settings = () => {
    return (
        <div className="flex flex-col items-center">
            <ResetPassword />
            <GeneralSettings />
        </div>
    )
}

export default Settings
