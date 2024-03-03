import React from 'react'

function Createmaintenance() {
    return (
        <div>
            <div className="flex flex-col items-start p-8 bg-white rounded-lg mt-6 mb-6">
                <form action="post" className="w-full space-y-4">
                    <h3 className="flex flex-col items-start font-bold text-gray-800 text-xl">Basic Information</h3>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="id" className="text-gray-800 font-semibold">
                            Vehicle Maintenance ID
                        </label>
                        <input
                            className="inputText flex items-start p-3 w-2/3 h-12 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="QL 9904"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="date" className="text-gray-800 font-semibold">
                            Last Maintenance Date
                        </label>
                        <input
                            className="inputText flex items-start p-3 w-2/3 h-12 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="2023/12/31"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="vehicleID" className="text-gray-800 font-semibold">
                            Vehicle ID
                        </label>
                        <select
                            className="selectOption flex flex-row justify-between items-start p-3 w-2/3 h-13 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="Select Vehicle"
                        >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="maintenancetypeID" className="text-gray-800 font-semibold">
                            Maintenance Type ID
                        </label>
                        <select
                            className="selectOption flex flex-row justify-between items-start p-3 w-2/3 h-13 border border-gray-300 bg-white rounded-md text-gray-500"
                            placeholder="Select Type"
                        >
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

export default Createmaintenance
