import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import axios from 'axios'

export default function FeedBack({ id }) {

    const [reviewDatas, setReviewDatas] = useState([]);
    const reservationId = id;

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`http://localhost:5062/api/Feedback/vehicle/${reservationId}`);
            console.log(response.data)
            setReviewDatas(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <>
            <div className="w-[584px] h-auto bg-white rounded-[10px] p-[30px]">
                <div className="flex flex-col">
                    <div className="flex gap-[10px] items-center">
                        <div className="font-[500] text-[20px]">Reviews</div>
                        <div className="w-[44px] h-[28px] bg-[#283280] text-white text-center rounded-[4px]">
                            {reviewDatas.length}
                        </div>
                    </div>
                    <div className="flex flex-col p-[20px]">
                    {reviewDatas.slice(0, 3).map((reviewData, index) => (
                            <div key={index} className="p-[20px] flex flex-col gap-[5px]">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-[20px] font-bold">{reviewData.customerName}</div>
                                        <div className="text-[14px] text-[#C7C7C7] font-[400]">
                                            {reviewData.feedback.designation}
                                        </div>
                                    </div>
                                    <div>
                                        <div>{reviewData.feedback.feedback_Date}</div>
                                        {/* Render stars based on rating */}
                                        <div className="flex">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <FaStar
                                                    key={starIndex}
                                                    color={starIndex < reviewData.feedback.ratingNo ? 'yellow' : 'grey'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[395px] text-[14px] text-[#596780] font-[400]">
                                    {reviewData.feedback.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
