import React from 'react'

function Basicinfo() {
    return (
        <div>
            <div className="relative w-screen h-screen bg-gray-300 flex justify-center items-center">
                <div className="bg-gray-200 "></div>
                <div className="flex flex-col items-justify w-full md:w-96 bg-white rounded-xl shadow-lg absolute left-[calc(50% - 373px/2 - 0.5px)] top-[calc(50% - 605.97px/2 + 36.5px)] md:left-auto md:right-auto">
                    <form className='mt-3 px-8 space-y-6" action="post'>
                        <h2 className="font-bold text-gray-900 text-xl mt-4 mb-1">Basic Information</h2>
                        <p className="font-semibold text-gray-500 text-xs mb-2">
                            Manage and Modify Vehicle Details for Enhanced Rental Services
                        </p>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="name" className="text-gray-800 font-semibold">
                                Name
                            </label>
                            <input
                                className="box-border flex flex-row items-start p-12 20 w-540 h-42 bg-white border border-gray-300 rounded-6 font-medium text-gray-500"
                                placeholder=" K L Ranasinghe"
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input />
                        </div>
                        <div>
                            <label>NIC</label>
                            <input />
                        </div>
                        <div>
                            <label>Drivers License Number</label>
                            <input />
                        </div>
                        <div>
                            <label>Drivers License/ Valid Identification</label>
                            <input />
                        </div>
                        <div>
                            <label>Contact number</label>
                            <input />
                        </div>
                        <div>
                            <label>Address</label>
                            <input />
                        </div>
                        <button>Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Basicinfo
