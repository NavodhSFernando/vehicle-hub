import React from 'react'

const WhiteFlexContainer = ({ children, width, height }) => {
    const containerStyle = {
        width: width || '100vw',
        height: height || '100%'
    }

    return (
        <div
            className="flex flex-col items-center justify-center shadow-md  p-2 md:p-2 lg:p-2 gap-4 md:gap-6 lg:gap-6 max-w-screen-lg mx-auto bg-white rounded-lg"
            style={containerStyle}
        >
            {children}
        </div>
    )
}

export default WhiteFlexContainer
