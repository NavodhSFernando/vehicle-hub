import React from 'react'
import ggl from '../../assets/Icons/ggl.svg'
import fb from '../../assets/Icons/fb.svg'

export const Login = () => {
    return (
        <div>
            <div className="relative w-screen h-screen bg-gray-300 flex justify-center items-center">
                <div className="bg-gray-200 "></div>

                <div className="flex justify flex-col  items-center w-100 h-100 bg-white rounded-xl shadow-lg absolute w-96 h-[605.97px] left-[calc(50% - 373px/2 - 0.5px)] top-[calc(50% - 605.97px/2 + 36.5px)] ">
                    <h2 className="text-2xl font-bold text-gray-600 mt-6 ">Customer Login</h2>
                    <p className="text-sm font-inter text-gray-600">Please enter your user information.</p>
                    <form className="w-full mt-8 px-8 space-y-6" action="post">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="username" className="text-gray-800">
                                Username
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-800"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="password" className="text-gray-800">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-800"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input type="checkbox" id="remember" className="h-4 w-4" />
                                <label htmlFor="remember-me" className="ml-2 text-gray-800">
                                    Remember me
                                </label>
                                <br></br>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 text-sm text-center tracking-wide bg-indigo-800 text-yellow-200 rounded-md font-semibold hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="w-16 h-0 border border-gray-400 order-1"></div>
                            <div className="font-medium text-xs text-center leading-14 text-gray-400 flex-none order-1 mx-3">
                                Or
                            </div>
                            <div className="w-16 h-0 border border-gray-400 order-1"></div>
                        </div>
                        <div className="flex justify-center items-center">
                            <img src={ggl} alt="My Image" className="w-7 h-10 rounded-full shadow-lg mr-10" />
                            <img src={fb} alt="My Image" className="w-7 h-10 rounded-full shadow-lg" />
                        </div>
                        <div className="flex">
                            <div className="text-indigo-600 font-bold text-left text-1xl mr-4">Create An Account</div>
                            <div className="text-gray-800 font-semibold text-right text-1xl">Forgot Password</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
