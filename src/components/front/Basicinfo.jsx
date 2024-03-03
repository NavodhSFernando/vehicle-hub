import React from 'react'

function Basicinfo() {
    return (
        <div>
            <div className="relative min-h-screen bg-gray-300 flex justify-center items-center">
                <div className="bg-gray-200 "></div>
                <div className=" flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-xl shadow-lg mt-8 mb-8">
                    <form className="px-6 py-6 space-y-2" action="post">
                        <h2 className="font-bold text-gray-900 text-xl">Basic Information</h2>
                        <p className="font-semibold text-gray-500 text-xs mb-2">
                            Manage and Modify Vehicle Details for Enhanced Rental Services
                        </p>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className="text-gray-800 font-semibold">
                                Name
                            </label>
                            <input
                                className="box-border flex flex-row items-start p-12 w-80 h-1 bg-white border border-gray-300 rounded-6 font-medium text-gray-500"
                                placeholder=" K L Ranasinghe"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-gray-800 font-semibold">
                                Email
                            </label>
                            <input
                                className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-5000"
                                placeholder="abc@gmail.com"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="nic" className="text-gray-800 font-semibold">
                                NIC
                            </label>
                            <input
                                className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                                placeholder="200122303006"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="license" className="text-gray-800 font-semibold">
                                Drivers License Number
                            </label>
                            <input
                                className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                                placeholder="123-456-789"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="licenseimg">Drivers License/ Valid Identification</label>
                            <input
                                className="p-8 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                                placeholder="Drag image here. Or Browse files"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="contact">Contact number</label>
                            <input
                                className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                                placeholder="76480678"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="address">Address</label>
                            <input
                                className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                                placeholder="No 34, Dias Place, Colombo 7"
                            />
                        </div>
                        <button className="bg-indigo-800 hover:bg-blue-800 text-yellow-100 font-bold py-2 px-6 rounded-xl mt-4 mb-3">
                            Save changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Basicinfo
