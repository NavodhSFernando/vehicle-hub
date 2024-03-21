import React from 'react'

export default function FeedbackForm() {
    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-300">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto pt-10 pb-10 pl-20 pr-20">
                {/* For demonstration purposes, the close button is just a console log. */}
                <button
                    onClick={() => console.log('Close the form')}
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-500"
                >
                    <span className="text-2xl">×</span>
                </button>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Please Provide your Feedback</h2>
                    <p className="text-sm text-gray-500">
                        Your feedback is greatly valued as it gives us the opportunity to serve you better.
                    </p>
                </div>
                <form action="#" method="POST">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500"
                            placeholder="Alex Fernando"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="designation" className="block text-gray-700 font-semibold mb-2">
                            Designation
                        </label>
                        <input
                            id="designation"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500"
                            placeholder="A12345670"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vehicleRating" className="block text-gray-700 font-semibold mb-2">
                            Vehicle Rating
                        </label>
                        {/* Star rating component */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vehicleReview" className="block text-gray-700 font-semibold mb-2">
                            Vehicle Review
                        </label>
                        <textarea
                            id="vehicleReview"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500"
                            placeholder="'Efficient Toyota Aqua: Economical, compact, and eco-friendly hybrid.'"
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="serviceReview" className="block text-gray-700 font-semibold mb-2">
                            Service Review
                        </label>
                        <textarea
                            id="serviceReview"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500"
                            placeholder="'Service: Exceptional, reliable, and efficient for Toyota Aqua car rental.'"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-900 hover:bg-blue-800 text-amber-100 font-semibold rounded py-2 px-10 transition-colors duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
