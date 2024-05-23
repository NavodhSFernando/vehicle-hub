import React from 'react'
import DashboardStatsGrid from './Dashboard/DashboardStatsGrid'
import TotalSalesChart from './Dashboard/TotalSalesChart'
import HireCancelPieChart from './Dashboard/HireCancelPieChart'

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4 p-[10px]">
            <DashboardStatsGrid />

            <div className="flex flex-row gap-4 w-full">
                <TotalSalesChart />
                <HireCancelPieChart />
            </div>
        </div>
    )
}
