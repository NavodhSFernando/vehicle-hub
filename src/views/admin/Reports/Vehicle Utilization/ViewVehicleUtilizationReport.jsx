import React, { useEffect, useState } from 'react'
import VehicleUtilizationTable from './VehicleUtilizationTable' 
import UsageDurationChart from './UsageDurationChart';
import ReservationsChart from './ReservationsChart';


const ViewVehicleUtilizationReport = () => {
    return (
        <div>
            <VehicleUtilizationTable />
            <UsageDurationChart />
            <ReservationsChart />
        </div>
    );
}

export default ViewVehicleUtilizationReport;