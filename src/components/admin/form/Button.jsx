import React from 'react'

const Button = ({ content }) => {
    const handleClick = () => {
        console.log('Button clicked!')
    }

    return (
        <div>
            <button
                onClick={handleClick}
                className="bg-indigo-800 hover:bg-blue-800 text-yellow-100 font-bold py-2 px-6 rounded-xl mt-4 mb-3"
            >
                {content}
            </button>
        </div>
    )
}

export default Button
