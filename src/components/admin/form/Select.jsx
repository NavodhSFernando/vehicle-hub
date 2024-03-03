import React from 'react'

const Select = ({ options, value, onChange, className }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={` selectOption flex flex-row justify-between items-start p-4 w-2/3 h-13 border border-gray-300 bg-white rounded-md text-gray-500  appearance-none  hover:border-gray-500 px-4 py-2 pr-8 shadow leading-tight focus:outline-none focus:border-gray-500 ${className} `}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Select
