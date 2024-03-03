import React from 'react'
import logo from './logo.png'

function Adminlogin() {
    return (
        <div className="relative min-h-screen flex">
            <div className="w-1/2 overflow-hidden bg-indigo-800 flex">
                <img src={logo} alt="My Image" className="h-96 rounded-lg m-auto" />
            </div>
            <div className="w-1/2 flex justify-center items-center bg-gray-100">
                <div className="flex flex-col w-full max-w-md px-8 py-10 bg-white shadow-md rounded-lg">
                    <form action="post" className="w-full space-y-6">
                        <h1 className="font-bold text-gray-800 text-xl">Admin Login</h1>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="username" className="text-gray-800 font-semibold">
                                Username
                            </label>
                            <input className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="password" className="text-gray-800 font-semibold">
                                Password
                            </label>
                            <input className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500" />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4" />
                            <label htmlFor="remember-me" className="ml-2 text-gray-800">
                                Remember me
                            </label>
                            <br></br>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 text-sm text-center tracking-wide bg-indigo-800 text-yellow-200 rounded-md font-semibold hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Adminlogin
