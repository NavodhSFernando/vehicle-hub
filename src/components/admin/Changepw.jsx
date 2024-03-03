import React from 'react'

function Changepw() {
    return (
        <div>
            <div className="relative w-full min-h-screen bg-gray-300 flex justify-center items-center">
                <div className="flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-xl shadow-lg">
                    <form action="post" className="px-8 py-6 space-y-6">
                        <h2 className="font-bold text-gray-900 text-xl mt-2">Change your Password</h2>
                        <p className="font-semibold text-gray-500 text-xs">
                            Complete the fields below to change your password. You will need to enter your current
                            password first.
                        </p>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="current" className="text-gray-800 font-semibold">
                                Current Password
                            </label>
                            <input className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="new" className="text-gray-800 font-semibold">
                                New Password
                            </label>
                            <input className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="confirm" className="text-gray-800 font-semibold">
                                Confirm New Password
                            </label>
                            <input className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500" />
                        </div>
                        <button className="bg-indigo-800 hover:bg-blue-800 text-yellow-100 font-bold py-2 px-6 rounded-xl">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Changepw
