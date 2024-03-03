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
        heading: 'Dashboard',
        subLinks: [
            {
                key: 'home',
                label: 'Home',
                path: '/admin/dashboard',
                icon: <LuDot />
            },
            {
                key: 'reports',
                label: 'Reports',
                path: '/admin/dashboard/reports',
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
        key: 'availability',
        label: 'Availability',
        path: '/admin/availability',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all availability',
                label: 'View All Availability',
                path: '/admin/availability/view',
                icon: <LuDot />
            },
            {
                key: 'create availability',
                label: 'Create Availability',
                path: '/admin/availability/create',
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
            },
            {
                key: 'create maintenance',
                label: 'Create Maintenance',
                path: '/admin/maintenance/create',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'maintenance type',
        label: 'Maintenance Type',
        path: '/admin/maintenancetype',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all maintenance type',
                label: 'View All Maintenance Type',
                path: '/admin/maintenancetype/view',
                icon: <LuDot />
            },
            {
                key: 'create maintenance type',
                label: 'Create Maintenance Type',
                path: '/admin/maintenancetype/create',
                icon: <LuDot />
            }
        ]
    },
    {
        key: 'user',
        label: 'User',
        path: '/admin/user',
        icon: <RiStackLine />,
        subLinks: [
            {
                key: 'view all user',
                label: 'View All User',
                path: '/admin/user/view',
                icon: <LuDot />
            },
            {
                key: 'create user',
                label: 'Create User',
                path: '/admin/user/create',
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
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />
    }
]
