import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'

import { RiStackLine } from 'react-icons/ri'
import { LuDot } from 'react-icons/lu'
import { AiOutlineHome } from 'react-icons/ai'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <AiOutlineHome />,
        heading: 'Dashboard'
    },
    {
        key: 'report',
        label: 'Report',
        path: '/admin/report',
        icon: <HiOutlineDocumentText />,
        subLinks: [
            {
                key: 'feedback report',
                label: 'Feedback Report',
                path: '/admin/report/feedbackreport',
                icon: <LuDot />
            },
            {
                key: 'revenue report',
                label: 'Revenue Report',
                path: '/admin/report/revenuereport',
                icon: <LuDot />
            },
            {
                key: 'vehicle utilization report',
                label: 'Vehicle Utilization Report',
                path: '/admin/report/vehicleutilizationreport',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'reservation',
        label: 'Reservation',
        path: '/admin/reservation',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all reservations',
                label: 'View All Reservation',
                path: '/admin/reservation/view',
                icon: <LuDot />
            },
            {
                key: 'create reservations',
                label: 'Create Reservations',
                path: '/admin/reservation/create',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'vehicle type',
        label: 'Vehicle Type',
        path: '/admin/vehicletype',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all vehicle type',
                label: 'View All Vehicle Type',
                path: '/admin/vehicletype/view',
                icon: <LuDot />
            },
            {
                key: 'create vehicle type',
                label: 'Create Vehicle Type',
                path: '/admin/vehicletype/create',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'vehicle make',
        label: 'Vehicle Make',
        path: '/admin/vehiclemake',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all vehicle make',
                label: 'View All Vehicle make',
                path: '/admin/vehiclemake/view',
                icon: <LuDot />
            },
            {
                key: 'create vehicle make',
                label: 'Create Vehicle Make',
                path: '/admin/vehiclemake/create',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'vehicle model',
        label: 'Vehicle Model',
        path: '/admin/vehiclemodel',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all vehicle model',
                label: 'View All Vehicle Model',
                path: '/admin/vehiclemodel/view',
                icon: <LuDot />
            },
            {
                key: 'create vehicle model',
                label: 'Create Vehicle Model',
                path: '/admin/vehiclemodel/create',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'vehicle',
        label: 'Vehicle',
        path: '/admin/vehicle',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all vehicle',
                label: 'View All Vehicle',
                path: '/admin/vehicle/view',
                icon: <LuDot />
            },
            {
                key: 'create vehicle',
                label: 'Create Vehicle',
                path: '/admin/vehicle/create',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'maintenance',
        label: 'Maintenance',
        path: '/admin/maintenance',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all maintenance',
                label: 'View All Maintenance',
                path: '/admin/maintenance/view',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'employee',
        label: 'Employee',
        path: '/admin/employee',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all employee',
                label: 'View All Employee',
                path: '/admin/employee/view',
                icon: <LuDot />
            },
            {
                key: 'create employee',
                label: 'Create Employee',
                path: '/admin/employee/create',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'customer',
        label: 'Customer',
        path: '/admin/customer',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all customer',
                label: 'View All Customer',
                path: '/admin/customer/view',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'vehicle log',
        label: 'Vehicle Log',
        path: '/admin/vehiclelog',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all vehicle log',
                label: 'View All vehicle Log',
                path: '/admin/vehiclelog/view',
                icon: <LuDot />
            },
            {
                key: 'create vehicle log',
                label: 'Create Vehicle Log',
                path: '/admin/vehiclelog/create',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'insurance',
        label: 'Insurance',
        path: '/admin/insurance',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all insurance',
                label: 'View All Insurance',
                path: '/admin/insurance/view',
                icon: <LuDot />
            }
        ]
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/admin/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
