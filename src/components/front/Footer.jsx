import React from 'react'
import Logo from '../../assets/logos/VH-Type.png'
import { FaInstagram } from 'react-icons/fa6'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'

export const Footer = () => {
    return (
        <div>
            <footer className="bg-primary py-20 px-4 text-white">
                <div className="max-w-6xl mx-auto flex flex-wrap  justify-between">
                    <div className="w-full flex flex-col max-w-[340px]">
                        <img className="w-[200px]" src={Logo} alt="Vehicle Hub Logo" />
                        <p className="mt-2 opacity-50">
                            Our vision is to provide convenience and help increase your sales business.
                        </p>
                    </div>
                    <div className="flex flex-wrap flex-col sm:flex-row sm:justify-end w-full md:w-auto mt-3 gap-6">
                        <a href="#" className="text-white sm:px-4 py-2 hover:text-gray-300">
                            Home
                        </a>
                        <a href="#" className="text-white sm:px-4 py-2 hover:text-gray-300">
                            Vehicle Fleet
                        </a>
                        <a href="#" className="text-white sm:px-4 py-2 hover:text-gray-300">
                            FAQ
                        </a>
                        <a href="#" className="text-white sm:px-4 py-2 hover:text-gray-300">
                            Contact
                        </a>
                    </div>
                    <div className="mt-16 flex flex-row w-full">
                        <div className="justify-start">© 2023 SprintSphere. All Rights Reserved </div>
                        <div className="md:ml-auto justify-center space-x-4 flex">
                            <p>Reach us on:</p>
                            <a href="#" className="text-white hover:text-gray-300">
                                <span className="">
                                    <FaFacebookF color="FBDAC6" fontSize={24} />
                                </span>
                            </a>
                            <a href="#" className="text-white hover:text-gray-300">
                                <span className="">
                                    <FaInstagram color="FBDAC6" fontSize={24} />
                                </span>
                            </a>
                            <a href="#" className="text-white hover:text-gray-300">
                                <span className="">
                                    <FaTwitter color="FBDAC6" fontSize={24} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer
