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
                    <Route
                        path="/*"
                        element={
                            <TitleComponent title="404">
                                <FrontPageNotFound />
                            </TitleComponent>
                        }
                    />
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
                    <Route
                        path="/bookingconfirmation/:invoiceId"
                        element={
                            <TitleComponent title="Payment redirect">
                                <Bookingconfirmredirect />
                            </TitleComponent>
                        }
                    />
                    <Route
                        path="/faq"
                        element={
                            <TitleComponent title="FAQ">
                                <FaqPage />
                            </TitleComponent>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <TitleComponent title="Contact Us">
                                <ContactUs />
                            </TitleComponent>
                        }
                    />
                </Route>

                <Route
                    path="/login"
                    element={
                        <TitleComponent title="Login">
                            <Login />
                        </TitleComponent>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <TitleComponent title="Signup">
                            <Signup />
                        </TitleComponent>
                    }
                />
                <Route
                    path="/password"
                    element={
                        <TitleComponent title="Forgot Password">
                            <Password />
                        </TitleComponent>
                    }
                />
                <Route
                    path="/passwordreset/:otp"
                    element={
                        <TitleComponent title="Reset Password">
                            <PasswordReset />
                        </TitleComponent>
                    }
                />
                <Route
                    path="/verifyotp"
                    element={
                        <TitleComponent title="Verify OTP">
                            <VerifyOTP />
                        </TitleComponent>
                    }
                />
                <Route
                    path="profileresetpassword"
                    element={
                        <TitleComponent title="Reset Password">
                            <ProfileResetPassword />
                        </TitleComponent>
                    }
                />
                <Route
                    path="/feedbackform/:customerReservationId"
                    element={
                        <ProtectedRouteCustomer allowedRoles={['customer']}>
                            <TitleComponent title="Feedback Form">
                                <Feedbackform />
                            </TitleComponent>
                        </ProtectedRouteCustomer>
                    }
                />
                <Route
                    path="/admin-login"
                    element={
                        <TitleComponent title="Admin Login">
                            <Adminlogin />
                        </TitleComponent>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={['admin', 'staff']}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/admin/*"
                        element={
                            <TitleComponent title="404">
                                <AdminPageNotFound />
                            </TitleComponent>
                        }
                    />
                    <Route
                        path="dashboard"
                        element={
                            <TitleComponent title="Dashboard">
                                <Dashboard />
                            </TitleComponent>
                        }
                    />
                    <Route path="report" element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route
                            path="feedbackreport"
                            element={
                                <TitleComponent title="Feedback Report">
                                    <ViewFeedbackReport />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="revenuereport"
                            element={
                                <TitleComponent title="Revenue Report">
                                    <ViewRevenueReport />
                                </TitleComponent>
                            }
                        />
                        <Route
                            path="vehicleutilizationreport"
                            element={
                                <TitleComponent title="Vehicle Utilization Report">
                                    <ViewVehicleUtilizationReport />
                                </TitleComponent>
                            }
                        />
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
                                <TitleComponent title="Vehicle">
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
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <TitleComponent title="Edit Employee">
                                        <EditEmployee />
                                    </TitleComponent>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="view"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <TitleComponent title="Employee">
                                        <ViewEmployee />
                                    </TitleComponent>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="create"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <TitleComponent title="Create Employee">
                                        <CreateEmployee />
                                    </TitleComponent>
                                </ProtectedRoute>
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
                                    <ProtectedRoute allowedRoles={['admin']}>
                                        <EditVehicleLog />
                                    </ProtectedRoute>
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
                                <TitleComponent title="Insurance">
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
                        path="notification"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <TitleComponent title="Notification">
                                    <Notification />
                                </TitleComponent>
                            </ProtectedRoute>
                        }
                    />
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
