import React from 'react'

function Createnewv() {
    return (
        <div className="relative min-h-screen bg-gray-300 flex justify-center items-center">
            <div className="flex flex-col items-start p-8 mx-auto sm:w-full md:w-3/4 lg:w-1/2 xl:w-2/3 bg-white rounded-lg mt-6 mb-6">
                <form action="post" className="w-full space-y-4">
                    <h3 className="flex flex-col items-start font-bold text-gray-800 text-xl">Basic information</h3>
                    <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                        Manage and Modify Vehicle Details for Enhanced Rental Services.
                    </p>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="registrationno" className="text-gray-800 font-semibold">
                            Registration Number
                        </label>
                        <input
                            className="inputText flex items-start p-4 w-2/3 h-12 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="QL 9904"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="chassis" className="text-gray-800 font-semibold">
                            Chassis number
                        </label>
                        <input
                            className="inputText flex items-start p-4 w-2/3 h-12 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="SV30-0169266"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="engine" className="text-gray-800 font-semibold">
                            Engine Capacity
                        </label>
                        <input
                            className="inputText flex items-start p-4 w-2/3 h-12 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="1800"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="transmission" className="text-gray-800 font-semibold">
                            Transmission
                        </label>
                        <select
                            className="selectOption flex flex-row justify-between items-start p-4 w-2/3 h-13 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="Select Transmission"
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="colour" className="text-gray-800 font-semibold">
                            Colour
                        </label>
                        <input
                            className="inputText flex items-start p-4 w-2/3 h-12 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="White"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="fuel" className="text-gray-800 font-semibold">
                            Fuel
                        </label>
                        <select className="selectOption flex flex-row justify-between items-start p-4 w-2/3 h-13 border border-gray-300 bg-white rounded-md text-gray-500">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="cost" className="text-gray-800 font-semibold">
                            Cost per day
                        </label>
                        <input
                            className="inputText flex items-start p-4 w-2/3 h-12 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="10000"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="mileage" className="text-gray-800 font-semibold">
                            Mileage
                        </label>
                        <input
                            className="inputText flex items-start p-4 w-2/3 h-12 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="25000"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="dl" className="text-gray-800 font-semibold">
                            Drivers License/ Valid Identification
                        </label>
                        <input
                            className="inputText flex items-start p-4 w-2/3 h-32 border border-gray-300 bg-white rounded-md text-gray-500 text-center"
                            placeholder="Drag image here. Or Browse files"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="vi" className="text-gray-800 font-semibold">
                            Drivers License/ Valid Identification
                        </label>
                        <input
                            className="inputText flex items-start p-4 w-2/3 h-32 border border-gray-300 bg-white rounded-md text-gray-500 text-center"
                            placeholder="Drag image here. Or Browse files"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="status" className="text-gray-800 font-semibold">
                            Status
                        </label>
                        <select className="selectOption flex flex-row justify-between items-start p-4 w-2/3 h-13 border border-gray-300 bg-white rounded-md text-gray-500">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Createnewv
