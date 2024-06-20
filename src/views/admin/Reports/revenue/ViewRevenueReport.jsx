import React from 'react'
import RevenueTable from './RevenueTable'
import RevenueChart from './RevenueChart'
import RevenueTrendChart from './RevenueTrendChart'

const RevenueReport = () => {
    return (
        <div className="revenue-report-page">
            <RevenueTable />

            <RevenueChart />

            <RevenueTrendChart />
        </div>
    )
}

export default RevenueReport
