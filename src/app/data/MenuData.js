import { SCREENS } from '../constants/constants';

export const MenuData = [
    {
        id: 0,
        title: 'Dashboard',
        iconName: 'iconProfile iconProfileDashboard',
        link: '/dashboard',
        name: SCREENS.DASHBOARD
    },
    {
        id: 1,
        title: 'Service Requests',
        iconName: 'iconProfile iconProfileServiceRequest',
        link: '/visitServiceList',
        name: SCREENS.SERVICE_REQUEST
    },
    {
        id: 2, 
        title: 'Visit History',
        iconName: 'iconProfile iconProfileServiceVisits',
        link: '/visitHistory',
        name: SCREENS.VISIT_HISTORY
    },
    {
        id: 3,
        title: 'My Settings',
        iconName: 'iconProfile iconProfileMySettings',
        link: '/visitNotificationSettings',
        name: SCREENS.NOTIFICATIONS
    },
    // {
    //     id: 3,
    //     title: 'Service Providers',        
    //     iconName: 'iconProfile iconProfileServiceProviders',
    //     link:'/'
    // }
];