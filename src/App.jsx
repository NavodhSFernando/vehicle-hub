import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TitleComponent from './components/ui/TitleComponent'
import AdminLayout from './components/admin/Layout'
import FrontLayout from './components/front/Layout'
import Dashboard from './views/admin/Dashboard'
import Home from './views/front/Home'
import Account from './views/front/Account'
import Login from './views/front/Login'
import Signup from './views/front/Signup'
import Password from './views/front/Password'
import ViewReservation from './views/admin/reservation/ViewReservation'
import CreateReservation from './views/admin/reservation/EditReservation'
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
import VehicleFleetSingle from './views/front/VehicleFleetSingle'
import VehicleFleet from './views/front/VehicleFleet'
import ViewOngoingRental from './views/front/OngoingRental/ViewOngoingRental'
import ViewBillingDetails from './views/front/billingDetails/ViewBillingDetails'
import ViewRentalHistory from './views/front/RentalHistory/ViewRentalHistory'
import ViewFeedbackReport from './views/admin/reports/feedback/ViewFeedbackReport'
import ViewRevenueReport from './views/admin/reports/revenue/ViewRevenueReport'
import ViewVehicleUtilizationReport from './views/admin/reports/Vehicle Utilization/ViewVehicleUtilizationReport'
import Viewprofile from './views/front/Viewprofile'
import Bookingconfirmredirect from './views/front/Bookingconfirmredirect'
import FaqPage from './views/front/FaqPage'
import ContactUs from './views/front/ContactUs'
import EditVehicleMake from './views/admin/vehiclemake/EditVehicleMake'
import EditVehicle from './views/admin/vehicle/EditVehicle'
import EditInsurance from './views/admin/insurance/EditInsurance'
import EditMaintenance from './views/admin/maintenance/EditMaintenance'
import EditVehicleType from './views/admin/vehicletype/EditVehicleType'
import EditVehicleLog from './views/admin/vehiclelog/EditVehicleLog'
import EditVehicleModel from './views/admin/vehiclemodel/EditVehicleModel'
import Adminlogin from './views/admin/Adminlogin'
import PasswordReset from './views/front/PasswordReset'
import EditEmployee from './views/admin/employee/EditEmployee'
import VerifyOTP from './views/front/VerifyOTP'
import Notification from './views/admin/Notification'
import Settings from './views/admin/Settings'
import ProfileResetPassword from './views/front/ProfileResetPassword'
import AdminPageNotFound from './components/admin/PageNotFound'
import FrontPageNotFound from './components/front/PageNotFound'
import ProtectedRoute from '../src/components/admin/ProtectedRoute'
import ResetPassword from '../src/views/admin/ResetPassword'
import ProtectedRouteCustomer from './components/front/ProtectedRouteCustomer'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FrontLayout />}>
                    <Route path="/*" element={<FrontPageNotFound />} />
                    <Route index element={<Home />} />

                    <Route
                        path="/vehiclefleet"
                        element={
                            <TitleComponent title="Vehicle Fleet">
                                <VehicleFleet />
                            </TitleComponent>
                        }
                    />
                    <Route
                        path="/vehiclefleet/:id"
                        element={
                            <TitleComponent title="Vehicle Fleet">
                                <VehicleFleetSingle />
                            </TitleComponent>
                        }
                    />
                    <Route
                        path="/account"
                        element={
                            <ProtectedRouteCustomer allowedRoles={['customer']}>
                                <Account />
                            </ProtectedRouteCustomer>
                        }
                    >
                        <Route
                            path="/account/ongoingrental/:customerReservationId"
                            element={
                                <TitleComponent title="Ongoing Rentals">
                                    <Ongoingrentalssingle />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="/account/rentalhistory/:customerReservationId"
                            element={
                                <TitleComponent title="Rental History">
                                    <Rentalhistorysingle />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="viewnotificationcenter"
                            element={
                                <TitleComponent title="Notification Center">
                                    <NotificationCenter />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="viewrentalhistory"
                            element={
                                <TitleComponent title="Rental History">
                                    <ViewRentalHistory />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="viewongoingrentals"
                            element={
                                <TitleComponent title="Ongoing Rentals">
                                    <ViewOngoingRental />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="viewbillingdetails"
                            element={
                                <TitleComponent title="Billing Details">
                                    <ViewBillingDetails />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="viewprofile"
                            element={
                                <TitleComponent title="View Profile">
                                    <Viewprofile />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="/bookingconfirmation/:invoiceId" element={<Bookingconfirmredirect />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/contact" element={<ContactUs />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/password" element={<Password />} />
                <Route path="/passwordreset/:otp" element={<PasswordReset />} />
                <Route path="/verifyotp" element={<VerifyOTP />} />
                <Route path="profileresetpassword" element={<ProfileResetPassword />} />
                <Route
                    path="/feedbackform/:reservationId"
                    element={
                        <ProtectedRouteCustomer allowedRoles={['customer']}>
                            <Feedbackform />
                        </ProtectedRouteCustomer>
                    }
                />
                <Route path="/admin-login" element={<Adminlogin />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={['admin', 'staff']}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/admin/*" element={<AdminPageNotFound />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="notification" element={<Notification />} />
                    <Route path="report">
                        <Route path="feedbackreport" element={<ViewFeedbackReport />} />
                        <Route path="revenuereport" element={<ViewRevenueReport />} />
                        <Route path="vehicleutilizationreport" element={<ViewVehicleUtilizationReport />} />
                    </Route>

                    <Route path="reservation">
                        <Route
                            path="view"
                            element={
                                <TitleComponent title="Reservation">
                                    <ViewReservation />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="create"
                            element={
                                <TitleComponent title="Create Reservation">
                                    <CreateReservation />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="vehicletype">
                        <Route
                            path="/admin/vehicletype/edit/:vehicleTypeId"
                            element={
                                <TitleComponent title="Edit Vehicle Type">
                                    <EditVehicleType />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="view"
                            element={
                                <TitleComponent title="Vehicle Types">
                                    <ViewVehicleType />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="create"
                            element={
                                <TitleComponent title="Create Vehicle Types">
                                    <CreateVehicleType />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="vehiclemake">
                        <Route
                            path="/admin/vehiclemake/edit/:vehicleMakeId"
                            element={
                                <TitleComponent title="Edit Vehicle Make">
                                    <EditVehicleMake />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="view"
                            element={
                                <TitleComponent title="Vehicle Make">
                                    <ViewVehicleMake />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="create"
                            element={
                                <TitleComponent title="Create Vehicle Make">
                                    <CreateVehicleMake />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="vehiclemodel">
                        <Route
                            path="view"
                            element={
                                <TitleComponent title="Vehicle Model">
                                    <ViewVehicleModel />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="create"
                            element={
                                <TitleComponent title="Create Vehicle Model">
                                    <CreateVehicleModel />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="/admin/vehiclemodel/edit/:vehicleModelId"
                            element={
                                <TitleComponent title="Edit Vehicle Model">
                                    <EditVehicleModel />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="vehicle">
                        <Route
                            path="/admin/vehicle/edit/:vehicleId"
                            element={
                                <TitleComponent title="Edit Vehicle">
                                    <EditVehicle />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="view"
                            element={
                                <TitleComponent title="View Vehicle">
                                    <ViewVehicle />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="create"
                            element={
                                <TitleComponent title="Create Vehicle">
                                    <CreateVehicle />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="maintenance">
                        <Route
                            path="/admin/maintenance/edit/:maintenanceId"
                            element={
                                <TitleComponent title="Edit Maintenance">
                                    <EditMaintenance />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="view"
                            element={
                                <TitleComponent title="Maintenances">
                                    <ViewMaintenance />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="/admin/maintenance/create/:vehicleId"
                            element={
                                <TitleComponent title="Create Maintenance">
                                    <CreateMaintenance />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="employee">
                        <Route
                            path="/admin/employee/edit/:employeeId"
                            element={
                                <TitleComponent title="Edit Employee">
                                    <EditEmployee />
                                </TitleComponent>
                            }
                        />
                        <Route path="view" element={<ViewEmployee />} />
                        <Route
                            path="create"
                            element={
                                <TitleComponent title="Create Employee">
                                    <ProtectedRoute allowedRoles={['admin']}>
                                        <CreateEmployee />
                                    </ProtectedRoute>
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="customer">
                        <Route
                            path="view"
                            element={
                                <TitleComponent title="Customer">
                                    <ViewCustomer />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="vehiclelog">
                        <Route
                            path="/admin/vehiclelog/edit/:vehicleLogId"
                            element={
                                <TitleComponent title="Edit Vehicle Log">
                                    <EditVehicleLog />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="view"
                            element={
                                <TitleComponent title="Vehicle Log">
                                    <ViewVehicleLog />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="/admin/vehiclelog/create/:customerReservationId"
                            element={
                                <TitleComponent title="Create Vehicle Log">
                                    <CreateVehicleLog />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route path="insurance">
                        <Route
                            path="/admin/insurance/edit/:insuranceId"
                            element={
                                <TitleComponent title="Edit Insurance">
                                    <EditInsurance />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="view"
                            element={
                                <TitleComponent title="Vehicle Insurance">
                                    <ViewInsurance />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="/admin/insurance/create/:vehicleId"
                            element={
                                <TitleComponent title="Create Insurance">
                                    <CreateInsurance />
                                </TitleComponent>
                            }
                        />
                    </Route>
                    <Route
                        path="/admin/settings"
                        element={
                            <TitleComponent title="Settings">
                                <Settings />
                            </TitleComponent>
                        }
                    />
                    <Route
                        path="/admin/resetpassword"
                        element={
                            <TitleComponent title="Reset Password">
                                <ResetPassword />
                            </TitleComponent>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
