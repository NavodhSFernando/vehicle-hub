import React from 'react'

function Deleteacc() {
    return (
        <div>
            <div className="relative min-h-screen bg-gray-300 flex justify-center items-center">
                <div className="flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-xl shadow-lg mt-8 mb-8">
                    <div className="px-6 py-6 space-y-2">
                        <h2 className="font-bold text-red-500 text-xl">Delete Account</h2>
                        <p className="font-semibold text-gray-500 text-xs mb-2">
                            Delete your profile, along with your authentication associations
                        </p>
                        <hr />
                        <p className="font-semibold text-gray-500 text-s pb-12">
                            Delete any and all content you have, such as rental history, invoices and profile details.
                        </p>
                        <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-xl">
                            Delete Account
                        </button>
                        <div className="flex pt-3">
                            <div className="font-semibold text-gray-500 text-s mr-1">Feel free to contact</div>
                            <div className="font-semibold text-blue-800 text-s mr-1">vehiclehub@example.com</div>
                            <div className="font-semibold text-gray-500 text-s">with any questions.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deleteacc
