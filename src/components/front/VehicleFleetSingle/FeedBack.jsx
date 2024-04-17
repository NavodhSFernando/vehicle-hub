import React from 'react'
import { FaStar } from 'react-icons/fa'

export default function FeedBack() {
    const reviewDatas = [
        {
            name: 'Alex Fernando',
            position: 'CEO at Bukalapak',
            date: '2 Jun 2023',
            rating: 3,
            comment: 'The vehicle looks good and runs good. Very economical.'
        },
        {
            name: 'John Doe',
            position: 'CTO at Amazon',
            date: '5 Mar 2023',
            rating: 4,
            comment: 'Excellent service. Highly recommended.'
        }
    ]

    return (
        <>
            <div className="w-[584px] h-[384px] bg-white rounded-[10px] p-[30px]">
                <div className="flex flex-col">
                    <div className="flex gap-[10px] items-center">
                        <div className="font-[500] text-[20px]">Reviews</div>
                        <div className="w-[44px] h-[28px] bg-[#283280] text-white text-center rounded-[4px]">
                            {reviewDatas.length}
                        </div>
                    </div>
                    <div className="flex flex-col p-[20px]">
                        {reviewDatas.map((reviewData, index) => (
                            <div key={index} className="p-[20px] flex flex-col gap-[20px]">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-[20px] font-bold">{reviewData.name}</div>
                                        <div className="text-[14px] text-[#C7C7C7] font-[400]">
                                            {reviewData.position}
                                        </div>
                                    </div>
                                    <div>
                                        <div>{reviewData.date}</div>
                                        {/* Render stars based on rating */}
                                        <div className="flex">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <FaStar
                                                    key={starIndex}
                                                    color={starIndex < reviewData.rating ? 'yellow' : 'grey'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[395px] text-[14px] text-[#596780] font-[400]">
                                    {reviewData.comment}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
