import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6'

export default function StarRating({ color = 'gray' }) {
    const [rating, setRating] = useState(null)

    return (
        <div className="flex gap-[10px] mb-6">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1
                return (
                    <label key={index} className="flex">
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            style={{ display: 'none' }}
                            onClick={() => setRating(currentRating)}
                        />
                        <FaStar size={30} color={currentRating <= rating ? '#fcee4e' : '#bfbebb'} />
                    </label>
                )
            })}
        </div>
    )
}
