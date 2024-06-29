import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/logos/VH-Type.png'
import { FaInstagram } from 'react-icons/fa'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'

export const Footer = () => {
    const [showFooter, setShowFooter] = useState(false)
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const { pathname } = useLocation()

    const toggleFooter = () => {
        setShowFooter(!showFooter)
    }

    const isHomePage = pathname === '/'

    return (
        <div>
            <footer
                style={{ backgroundColor: isHomePage ? 'transparent' : '#283280' }}
                className={`bottom-0 inset-x-0 z-20 px-4 text-white ${isHomePage ? 'bg-transparent py-10 absolute' : 'bg-primary py-20 relative'}`}
            >
                <div className="max-w-7xl mx-auto flex flex-col justify-center">
                    <div className={`flex flex-col md:flex-row justify-between ${isHomePage ? 'hidden' : 'block'}`}>
                        <div className="flex flex-col">
                            <img className="w-[200px]" src={Logo} alt="Vehicle Hub Logo" />
                            <p className="mt-2 opacity-50 w-[307px]">
                                Our vision is to provide convenience and help increase your sales business.
                            </p>
                        </div>
                        <div className="flex flex-wrap flex-col sm:flex-row sm:justify-end mt-3 gap-6">
                            <Link to="/" className="text-white sm:px-4 py-2 hover:text-gray-300">
                                Home
                            </Link>
                            <Link to="/vehiclefleet" className="text-white sm:px-4 py-2 hover:text-gray-300">
                                Vehicle Fleet
                            </Link>
                            <Link to="/faq" className="text-white sm:px-4 py-2 hover:text-gray-300">
                                FAQ
                            </Link>
                            <Link to="/contact" className="text-white sm:px-4 py-2 hover:text-gray-300">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col md:flex-row w-full">
                        <div className="justify-start">© {currentYear} SprintSphere. All Rights Reserved </div>
                        <div
                            className={`mt-4 md:mt-0 md:ml-auto flex justify-center space-x-4 ${isHomePage ? 'text-black' : ''}`}
                        >
                            <p>Reach us on:</p>
                            <a href="#" className="text-white hover:text-gray-300">
                                <span>
                                    <FaFacebookF color={isHomePage ? '000000' : 'FBDAC6'} fontSize={24} />
                                </span>
                            </a>
                            <a href="#" className="text-white hover:text-gray-300">
                                <span>
                                    <FaInstagram color={isHomePage ? '000000' : 'FBDAC6'} fontSize={24} />
                                </span>
                            </a>
                            <a href="#" className="text-white hover:text-gray-300">
                                <span>
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
