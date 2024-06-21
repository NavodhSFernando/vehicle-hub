import React, { useEffect, useState } from 'react'
import FeedbackTable from './FeedbackTable';
import RatingDistributionChart from './RatingDistributionChart';
import CustomerFeedbackSummary from './CustomerFeedbackSummary';
import FeedbackOverTimeChart from './FeedbackOverTimeChart';

const ViewFeedbackReport = () => {
    return (
        <div>
            <FeedbackTable />
            <RatingDistributionChart />
            <CustomerFeedbackSummary />
            <FeedbackOverTimeChart />
        </div>
    );
};

export default ViewFeedbackReport;

