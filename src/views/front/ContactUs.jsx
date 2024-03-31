import React, { useState } from 'react'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        copy: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would send the formData to your backend server
        // For this just logging it to the console
        console.log(JSON.stringify(formData))
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 space-y-4 p-4">
                        <h2 className="text-2xl font-bold">Contact us</h2>
                        <p>
                            We'd love to hear from you! Whether you have a question about our services, need assistance,
                            or you're in the area and want to check out our headquarters, feel free to drop us a line.
                            We aim to reply to all messages within two business days.
                        </p>

                        <p>Vehicle Hub (Pvt.) Ltd. No 58 Pamankada Road, Colombo 06, Sri Lanka. </p>
                        <p>+94 11 2365367</p>
                        <p>info@Vehiclehub.com</p>
                    </div>
                    <div className="md:w-1/2 p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full p-2 border rounded"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    value={formData.name}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-2 border rounded"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    name="message"
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                    placeholder="Message"
                                    onChange={handleChange}
                                    value={formData.message}
                                ></textarea>
                            </div>
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    name="copy"
                                    id="copy"
                                    className="mr-2"
                                    onChange={handleChange}
                                    checked={formData.copy}
                                />
                                <label htmlFor="copy">Send me a copy of this message</label>
                            </div>
                            <button
                                type="submit"
                                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
