import React from 'react'

export const Password = () => {
    return (
        <div>
            <div className="relative w-screen h-screen bg-gray-300 flex justify-center items-center">
                <div className="bg-gray-200 "></div>

                <div className="flex justify flex-col  items-center w-100 h-100 bg-white  rounded-xl shadow-lg absolute w-96 h-[405.97px] left-[calc(50% - 373px/2 - 0.5px)] top-[calc(50% - 505.97px/2 + 36.5px)] ">
                    <h2 className="text-2xl w-300 h-30 left-36.5 top-25 font-inter font-bold text-gray-600 text-center text-20 mt-6 mb-2">
                        Password Recovery
                    </h2>

                    <p className="text-xs font-inter text-gray-600 text-center mb-6">
                        Don't worry, we'll send you an email to reset your password.
                    </p>

                    <form className="px-8 space-y-6" action="post">
                        <div className="flex flex-col space-y-3">
                            <label htmlFor="email" className="text-gray-800 font-semibold">
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
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 font-semibold text-sm text-center tracking-wide bg-indigo-800 text-yellow-200 rounded-md  hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500"
                            >
                                Reset Password
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input type="checkbox" id="confirm" className="h-4 w-4" />
                                <label htmlFor="confirm" className="ml-2 text-gray-800 text-justify">
                                    Remember Me
                                </label>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="text-gray-800 text-justify mr-10">Don't have an account?</div>
                            <div className="text-indigo-600 text-justify ml-10">Sign Up</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password
