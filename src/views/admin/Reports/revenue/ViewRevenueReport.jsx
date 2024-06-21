import React from 'react'
import RevenueTable from './RevenueTable'
import RevenueChart from './RevenueChart'
import RevenueComparisonTable from './RevenueComparisonTable'
import RevenueGrowthRateDashboard from './RevenueGrowthRateDashboard'


const RevenueReport = () => {
    return (
        <div className="revenue-report-page">
            <RevenueTable />

            <RevenueChart />

            <RevenueComparisonTable />

            <RevenueGrowthRateDashboard />

        </div>
    )
}

export default RevenueReport
