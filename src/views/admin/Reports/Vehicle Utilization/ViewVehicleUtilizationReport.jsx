import React, { useEffect, useState } from 'react'
import VehicleUtilizationTable from './VehicleUtilizationTable' 
import UsageDurationChart from './UsageDurationChart';


const ViewVehicleUtilizationReport = () => {
    return (
        <div>
            <VehicleUtilizationTable />
            <UsageDurationChart />
        </div>
    );
}

export default ViewVehicleUtilizationReport;