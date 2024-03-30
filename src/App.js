import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLayout from './components/admin/Layout'
import FrontLayout from './components/front/Layout'
import Dashboard from './views/admin/Dashboard'
import Home from './views/front/Home'
import Account from './views/front/Account'
import Login from './views/front/Login'
import Signup from './views/front/Signup'
import Password from './views/front/Password'
import ViewReservation from './views/admin/reservation/ViewReservation'
import CreateReservation from './views/admin/reservation/CreateReservation'
import ViewVehicleType from './views/admin/vehicletype/ViewVehicleType'
import CreateVehicleType from './views/admin/vehicletype/CreateVehicleType'
import ViewVehicleMake from './views/admin/vehiclemake/ViewVehicleMake'
import CreateVehicleMake from './views/admin/vehiclemake/CreateVehicleMake'
import ViewVehicleModel from './views/admin/vehiclemodel/ViewVehicleModel'
import CreateVehicleModel from './views/admin/vehiclemodel/CreateVehicleModel'
import ViewVehicle from './views/admin/vehicle/ViewVehicle'
import CreateVehicle from './views/admin/vehicle/CreateVehicle'
import ViewMaintenance from './views/admin/maintenance/ViewMaintenance'
import CreateMaintenance from './views/admin/maintenance/CreateMaintenance'
import ViewMaintenanceType from './views/admin/maintenancetype/ViewMaintenanceType'
import CreateMaintenanceType from './views/admin/maintenancetype/CreateMaintenanceType'
import ViewAvailability from './views/admin/availability/ViewAvailability'
import CreateAvailability from './views/admin/availability/CreateAvailability'
import ViewEmployee from './views/admin/employee/ViewEmployee'
import CreateEmployee from './views/admin/employee/CreateEmployee'
import ViewCustomer from './views/admin/customer/ViewCustomer'
import ViewVehicleLog from './views/admin/vehiclelog/ViewVehicleLog'
import CreateVehicleLog from './views/admin/vehiclelog/CreateVehicleLog'
import ViewInsurance from './views/admin/insurance/ViewInsurance'
import CreateInsurance from './views/admin/insurance/CreateInsurance'
import Ongoingrentalssingle from './views/front/Ongoingrentalssingle'
import Rentalhistorysingle from './views/front/Rentalhistorysingle'
import Feedbackform from './views/front/Feedbackform'
import NotificationCenter from './views/front/NotificationCenter'
import VehicleFleetSingle from './components/front/VehicleFleetingle/VehicleFleetSingle'
import VehicleFleet from './components/front/VehicleFleet'
import OngoingRental from './views/front/OngoingRental/ViewOngoingRental'
import ViewOngoingRental from './views/front/OngoingRental/ViewOngoingRental'
import ViewBillingDetails from './views/front/billingDetails/ViewBillingDetails'
import ViewRentalHistory from './views/front/RentalHistory/ViewRentalHistory'
import ViewFeedbackReport from './views/admin/reports/feedback/ViewFeedbackReport'
import ViewRevenueReport from './views/admin/reports/revenue/ViewRevenueReport'
import ViewVehicleUtilizationReport from './views/admin/reports/Vehicle Utilization/ViewVehicleUtilizationReport'
import Viewprofile from './views/front/Viewprofile'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FrontLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/vehiclefleet" element={<VehicleFleet />} />
                    <Route path="/vehiclefleet/:slug" element={<VehicleFleetSingle />} />
                    <Route path="/account" element={<Account />}>
                        <Route path="/account/ongoingrentalssingle" element={<Ongoingrentalssingle />} />
                        <Route path="/account/rentalhistorysingle" element={<Rentalhistorysingle />} />
                        <Route path="/account/notificationcenter" element={<NotificationCenter />} />
                        <Route path="/account/viewRentalHistory" element={<ViewRentalHistory />} />
                        <Route path="/account/viewOngoingRental" element={<ViewOngoingRental />} />
                        <Route path="/account/viewBillingDetails" element={<ViewBillingDetails />} />
                        <Route path="/account/viewprofile" element={<Viewprofile />} />
                    </Route>
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/password" element={<Password />} />
                <Route path="/ongoingrentalssingle" element={<Ongoingrentalssingle />} />
                <Route path="/rentalhistorysingle" element={<Rentalhistorysingle />} />

                <Route path="/feedbackform" element={<Feedbackform />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="report">
                        <Route path="feedbackreport" element={<ViewFeedbackReport />} />
                        <Route path="revenuereport" element={<ViewRevenueReport />} />
                        <Route path="vehicleutilizationreport" element={<ViewVehicleUtilizationReport />} />
                    </Route>
                    <Route path="reservation">
                        <Route path="view" element={<ViewReservation />} />
                        <Route path="create" element={<CreateReservation />} />
                    </Route>
                    <Route path="availability">
                        <Route path="view" element={<ViewAvailability />} />
                        <Route path="create" element={<CreateAvailability />} />
                    </Route>
                    <Route path="vehicletype">
                        <Route path="view" element={<ViewVehicleType />} />
                        <Route path="create" element={<CreateVehicleType />} />
                    </Route>
                    <Route path="vehiclemake">
                        <Route path="view" element={<ViewVehicleMake />} />
                        <Route path="create" element={<CreateVehicleMake />} />
                    </Route>
                    <Route path="vehiclemodel">
                        <Route path="view" element={<ViewVehicleModel />} />
                        <Route path="create" element={<CreateVehicleModel />} />
                    </Route>
                    <Route path="vehicle">
                        <Route path="view" element={<ViewVehicle />} />
                        <Route path="create" element={<CreateVehicle />} />
                    </Route>
                    <Route path="maintenance">
                        <Route path="view" element={<ViewMaintenance />} />
                        <Route path="create" element={<CreateMaintenance />} />
                    </Route>
                    <Route path="maintenancetype">
                        <Route path="view" element={<ViewMaintenanceType />} />
                        <Route path="create" element={<CreateMaintenanceType />} />
                    </Route>
                    <Route path="employee">
                        <Route path="view" element={<ViewEmployee />} />
                        <Route path="create" element={<CreateEmployee />} />
                    </Route>
                    <Route path="customer">
                        <Route path="view" element={<ViewCustomer />} />
                    </Route>
                    <Route path="vehiclelog">
                        <Route path="view" element={<ViewVehicleLog />} />
                        <Route path="create" element={<CreateVehicleLog />} />
                    </Route>
                    <Route path="insurance">
                        <Route path="view" element={<ViewInsurance />} />
                        <Route path="create" element={<CreateInsurance />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
