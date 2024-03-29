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
import ViewUser from './views/admin/user/ViewUser'
import CreateUser from './views/admin/user/CreateUser'
import ViewCustomer from './views/admin/customer/ViewCustomer'
import FeedbackReport from './views/admin/reports/FeedbackReport'
import RevenueReport from './views/admin/reports/RevenueReport'
import VehicleUtilizationReport from './views/admin/reports/VehicleUtilizationReport'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FrontLayout />}>
                    <Route index element={<Home />} />
                    <Route path="account" element={<Account />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/password" element={<Password />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="report">
                        <Route path="feedbackreport" element={<FeedbackReport />} />
                        <Route path="revenuereport" element={<RevenueReport />} />
                        <Route path="vehicleutilizationreport" element={<VehicleUtilizationReport />} />
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
                    <Route path="user">
                        <Route path="view" element={<ViewUser />} />
                        <Route path="create" element={<CreateUser />} />
                    </Route>
                    <Route path="customer">
                        <Route path="view" element={<ViewCustomer />} />
                    </Route>
                    <Route path="vehiclelog">
                        <Route path="view" element={<ViewCustomer />} />
                        <Route path="create" element={<CreateUser />} />
                    </Route>
                    <Route path="insurance">
                        <Route path="view" element={<ViewCustomer />} />
                        <Route path="create" element={<CreateUser />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
