import React from 'react'

const TextInputField = ({ label, placeholder, ...rest }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm text-gray-800 font-semibold mb-1" htmlFor={rest.id || rest.name}>
                {label}
            </label>
            <input
                className="appearance-none w-3/4 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline p-2 bg-white border border-gray-300 rounded-lg text-s text-gray-500"
                type="text"
                placeholder={placeholder}
                {...rest}
            />
        </div>
    )
}

export default TextInputField
