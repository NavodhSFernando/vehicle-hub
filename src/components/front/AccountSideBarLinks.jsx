// const { customerId } = Cookies.get('customerId')
// if (!customerId) {
//     console.error('customer Id is not available')
//     return
// }

export const ACCOUNT_SIDEBAR_LINKS = [
    {
        key: 'account details',
        label: 'Account Details',
        path: `/account/viewprofile`
    },
    {
        key: 'ongoing rentals',
        label: 'Ongoing Rentals',
        path: `/account/viewongoingrentals`
    },
    {
        key: 'rental history',
        label: 'Rental History',
        path: `/account/viewrentalhistory`
    },
    {
        key: 'billing details',
        label: 'Billing Details',
        path: `/account/viewbillingdetails`
    },
    {
        key: 'notifications',
        label: 'Notifications',
        path: `/account/viewnotificationcenter`
    },
    {
        key: 'log out',
        label: 'Log Out',
        path: '/account/logout'
    }
]
