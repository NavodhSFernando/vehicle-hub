import React from 'react'

const Navbar = () => {
    const loggedIn = false
    return (
        <nav className="bg-blue-700">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
                <div className="flex lg:flex-row flex-col gap-5 lg:gap-0 items-center justify-between  ">
                    <div className="flex-shrink-0">
                        <img
                            className="block w-[78px]"
                            src={
                                'https://cdn.discordapp.com/attachments/510829749065744405/1212711934395289610/VH-Icon_1.png?ex=65f2d500&is=65e06000&hm=ebc6a43b3d87e930f678800161d0f46ac7ff01695f7212f20b2fc09f81687f9f&'
                            }
                            alt="Vehicle Hub"
                        />
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex sm:space-x-4">
                            <a
                                href="#home"
                                className="text-white px-3 py-2  font-medium hover:border-b-[1px] hover:border-[#FBDAC6]"
                            >
                                Home
                            </a>
                            <a
                                href="#vehiclefleet"
                                className="text-white px-3 py-2  font-medium hover:border-b-[1px] hover:border-[#FBDAC6]"
                            >
                                Vehicle Fleet
                            </a>
                            <a
                                href="#faq"
                                className="text-white px-3 py-2  font-medium hover:border-b-[1px] hover:border-[#FBDAC6]"
                            >
                                FAQ
                            </a>
                            <a
                                href="#contact"
                                className="text-white px-3 py-2  text-sm font-medium hover:border-b-[1px] hover:border-[#FBDAC6]"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                    {/* Sign In and Sign Up buttons */}

                    {!loggedIn ? (
                        <div className="flex items-center">
                            <button className="bg-blue-800 text-white px-3 py-2 rounded-md text-sm font-medium">
                                Sign In
                            </button>
                            <button className="ml-4 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium">
                                Sign Up
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-16">
                            <img
                                className="w-[24px]"
                                src="https://cdn.discordapp.com/attachments/510829749065744405/1212697770935451678/bookmark-star.png?ex=65f2c7cf&is=65e052cf&hm=c340e44c42849cd071aa974ec242564eaf94da0ec4411a0bb4ac2ceb51c496b3&"
                                alt=""
                            />
                            <img
                                className="w-[24px]"
                                src="https://cdn.discordapp.com/attachments/510829749065744405/1212716579574390794/notification-bell.png?ex=65f2d953&is=65e06453&hm=8f5a6a9bb9ccb0a1b9d57f012f8a3760557314a1ba486dad22778809631260a5&"
                                alt=""
                            />
                            <img
                                className="w-[24px]"
                                src="https://cdn.discordapp.com/attachments/510829749065744405/1212716579884765254/profile-2user.png?ex=65f2d953&is=65e06453&hm=8d8bfbe3725ab1357d576fffd8a689031f266295c55f01e1c41cba5ffbb402fa&"
                                alt=""
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
