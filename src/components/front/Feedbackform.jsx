import React from 'react'

export default function Feedbackform() {
    return (
        <div>
            <div className="relative w-full min-h-screen bg-gray-300 flex justify-center items-center">
                <div className="flex flex-col w-full max-w-md bg-white rounded-xl shadow-lg absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <form action="post" className=" space-y-2 border-2border-neutral-100 px-8 py-3">
                        <h2 className="font-bold text-gray-900 text-xl mt-12 mb-1 ">Please Provide your Feedback</h2>
                        <p className="font-semibold text-gray-500 text-xs mt-1 mb-1">
                            Your feedback is greatly valued as it gives us the opportunity to serve you better.
                        </p>
                        <div className="flex flex-col space-y-1 ">
                            <label htmlFor="name" className="text-gray-800 font-semibold ">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                                placeholder="Alex Fernando"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="designation" className="text-gray-800 font-semibold ">
                                Designation
                            </label>
                            <input
                                type="text"
                                required
                                className="p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                                placeholder="A12345670"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="vehicle rating" className="text-gray-800 font-semibold ">
                                Vehicle Rating
                            </label>
                            <ul className="flex justify-center">
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="mr-1 h-5 w-5 text-warning"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                        />
                                    </svg>
                                </li>
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="mr-1 h-5 w-5 text-warning"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                        />
                                    </svg>
                                </li>
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="mr-1 h-5 w-5 text-warning"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                        />
                                    </svg>
                                </li>
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="mr-1 h-5 w-5 text-warning"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                        />
                                    </svg>
                                </li>
                                <li>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="mr-1 h-5 w-5 text-warning"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                        />
                                    </svg>
                                </li>
                            </ul>
                            {/* <input type="" required className="" /> */}
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="vehicle review" className="text-gray-800 font-semibold ">
                                Vehicle Review
                            </label>
                            <input
                                type="text"
                                className="p-2  h-20 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                                placeholder="Efficient Toyota Aqua: Economical, compact, and eco-friendly hybrid."
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="service review" className="text-gray-800 font-semibold ">
                                Service Review
                            </label>
                            <input
                                type="text"
                                className="p-2 h-20 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                                placeholder="Service: Exceptional, reliable, and efficient for Toyota Aqua car rental."
                            />
                        </div>
                        <button className="bg-blue-900 hover:bg-blue-500 text-white font-semibold rounded py-2 px-4">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
