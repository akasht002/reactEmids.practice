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
        title: 'View Requests',
        iconName: 'iconProfile iconProfileServiceRequest',
        link: '/Visitservicelist',
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
        title: 'Settings',
        iconName: 'iconProfile iconProfileMySettings',
        link: '/visitNotificationSettings',
        name: SCREENS.NOTIFICATIONS
    },
];