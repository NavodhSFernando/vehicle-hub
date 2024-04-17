import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from '../../assets/logos/VH-Type.png'
import { FaInstagram } from 'react-icons/fa6'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'

export const Footer = () => {
    const [showFooter, setShowFooter] = useState(false)
    const { pathname } = useLocation()

    const toggleFooter = () => {
        setShowFooter(!showFooter)
    }

    const isHomePage = pathname === '/'

    return (
        <div>
            <footer
                className={`bottom-0 inset-x-0 z-20 px-4 text-white ${isHomePage ? 'bg-transparent py-10 absolute' : 'bg-primary py-20 relative'}`}
            >
                <div className="w-[1224px] mx-auto flex flex-col justify-center">
                    <div className={`flex justify-between ${isHomePage ? 'hidden' : 'block'}`}>
                        <div className="flex flex-col">
                            <img className="w-[200px]" src={Logo} alt="Vehicle Hub Logo" />
                            <p className="mt-2 opacity-50 w-[307px]">
                                Our vision is to provide convenience and help increase your sales business.
                            </p>
                        </div>
                        <div className="flex flex-wrap flex-col sm:flex-row sm:justify-end md:w-auto mt-3 gap-6">
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
                    </div>

                    <div className="mt-16 flex flex-row w-full">
                        <div className="justify-start">© 2023 SprintSphere. All Rights Reserved </div>
                        <div className={`md:ml-auto justify-center space-x-4 flex ${isHomePage ? 'text-black' : ''}`}>
                            <p>Reach us on:</p>
                            <a href="#" className="text-white hover:text-gray-300">
                                <span className="">
                                    <FaFacebookF color={isHomePage ? '000000' : 'FBDAC6'} fontSize={24} />
                                </span>
                            </a>
                            <a href="#" className="text-white hover:text-gray-300">
                                <span className="">
                                    <FaInstagram color={isHomePage ? '000000' : 'FBDAC6'} fontSize={24} />
                                </span>
                            </a>
                            <a href="#" className="text-white hover:text-gray-300">
                                <span className="">
                                    <FaTwitter color={isHomePage ? '000000' : 'FBDAC6'} fontSize={24} />
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
