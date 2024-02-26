import React from 'react'
import ggl from '../../assets/Icons/ggl.svg'
import fb from '../../assets/Icons/fb.svg'

export const Signup = () => {
    return (
        <div>
            <div className="relative w-screen h-screen bg-gray-300 flex justify-center items-center">
                <div className="bg-gray-200 "></div>

                <div className="flex flex-col items-center w-full md:w-96 bg-white rounded-xl shadow-lg absolute left-[calc(50% - 373px/2 - 0.5px)] top-[calc(50% - 605.97px/2 + 36.5px)] md:left-auto md:right-auto">
                    <h2 className="text-2xl font-inter font-bold text-gray-600 mt-4 mb-1">Customer Sign up</h2>
                    <p className="text-xs text-gray-600 text-center mb-2">Please enter your user information.</p>
                    <form className="mt-3 px-8 space-y-6" action="post">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-gray-800 font-semibold">
                                E-mail
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
                            <label htmlFor="password" className="text-gray-800 font-semibold">
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
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="confirmpassword" className="text-gray-800 font-semibold">
                                Confirm Password
                            </label>
                            <input
                                id="confirmpassword"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-800"
                            />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="confirm" className="h-4 w-4" />
                            <label htmlFor="confirm" className="ml-2 text-gray-800">
                                By creating this account, you agree the
                                <div className="text-indigo-600 cursor-pointer font-semibold">
                                    {' '}
                                    terms and conditions.
                                </div>
                            </label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 font-semibold text-sm text-center tracking-wide bg-indigo-800 text-yellow-200 rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                            >
                                Sign Up
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
                            <img
                                src={ggl}
                                alt="google"
                                className="w-7 h-7 md:w-10 md:h-8 rounded-full shadow-lg mr-10"
                            />
                            <img src={fb} alt="facebook" className="w-7 h-7 md:w-10 md:h-8 rounded-full shadow-lg" />
                        </div>
                        <div className="flex justify-center">
                            <div className="text-indigo-600 cursor-pointer mr-3 mb-4">Already member? Login?</div>

                            <div className="text-gray-800 font-semibold cursor-pointer">Forgot Password</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
