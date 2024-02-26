import React from 'react'
import LogoIcon from '../../assets/logos/VH-Icon.png'
import LogoType from '../../assets/logos/VH-Type.png'

export default function Sidebar() {
    return (
        <div className="bg-neutral-900 flex flex-col w-60 p-3 text-white">
            <div className="flex items-center justify-center gap-2 px-1 py-3">
                <img src={LogoIcon} alt="logo-icon" className="w-10" />
                <span>
                    <img src={LogoType} alt="logo-type" className="w-32" />
                </span>
            </div>
            <div className="flex-1"></div>
            <div>bottom part</div>
        </div>
    )
}
