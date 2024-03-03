import React from 'react'
import Container from '../Components/form/Container'
import Inputfield from '../Components/form/Inputfield'
import Button from '../Components/form/Button'

function Createnewuser() {
    return (
        <div className="relative w-screen h-full bg-gray-300 flex justify-center items-center pt-6 pb-6">
            <div>
                <Container width="70vw" height="130%">
                    <form action="post" className="w-3/4 space-y-3">
                        <h3 className="flex flex-col items-start font-bold text-gray-800 text-xl pt-8">
                            Basic information
                        </h3>
                        <p className="text-xs text-gray-600 text-left mb-2 font-semibold">
                            Onboard and Manage Team Members for Efficient Operations.
                        </p>
                        <Inputfield label="Name" placeholder="G K Ranasinghe"></Inputfield>
                        <Inputfield label="Email" placeholder="ranasinghe2001@email.com"></Inputfield>
                        <Inputfield label="Date of Birth" placeholder="1995.03.10"></Inputfield>
                        <Inputfield label="Phone" placeholder="077445680653"></Inputfield>
                        <Inputfield label="NIC" placeholder="200145604322"></Inputfield>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="gender" className="text-gray-800 font-semibold">
                                Gender
                            </label>
                            <select
                                className="selectOption flex flex-row justify-between items-start p-2 w-3/4 h-13 border border-gray-300 bg-white rounded-md text-gray-500"
                                placeholder="Select Option"
                            >
                                <option value="option1">Male</option>
                                <option value="option2">Female</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="dept" className="text-gray-800 font-semibold">
                                Department
                            </label>
                            <select
                                className="selectOption flex flex-row justify-between items-start p-2 w-3/4 h-13 border border-gray-300 bg-white rounded-md text-gray-500"
                                placeholder="Select Role"
                            >
                                <option value="option1">option 1</option>
                                <option value="option2">option 2</option>
                            </select>
                        </div>
                        <Inputfield label="Password" placeholder="********"></Inputfield>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="status" className="text-gray-800 font-semibold">
                                Status
                            </label>
                            <select
                                className="selectOption flex flex-row justify-between items-start p-2 w-3/4 h-13 border border-gray-300 bg-white rounded-md text-gray-500"
                                placeholder="Select Status"
                            >
                                <option value="option1">option 1</option>
                                <option value="option2">option 2</option>
                            </select>
                        </div>
                        <Button content="Create"> </Button>
                        {/* <label htmlFor="gender" className="text-gray-800 font-semibold">
                            Gender
                        </label> */}
                        {/* <Select options={options} value={selectedOption} onChange={handleChange} className="mt-1" /> */}
                    </form>
                </Container>
            </div>
        </div>
    )
}

export default Createnewuser
