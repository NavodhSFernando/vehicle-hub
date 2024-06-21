import React, { useEffect, useState } from 'react'
import FeedbackTable from './FeedbackTable';
import RatingDistributionChart from './RatingDistributionChart';
import CustomerFeedbackSummary from './CustomerFeedbackSummary';

const ViewFeedbackReport = () => {
    return (
        <div>
            <FeedbackTable />
            <RatingDistributionChart />
            <CustomerFeedbackSummary />
        </div>
    );
};

export default ViewFeedbackReport;

