import { SCREENS } from '../constants/constants';
export const EntityMenuData = [
    {
        id: 0,
        title: 'Dashboard',     
        iconName: 'iconProfile iconProfileDashboard',
        link:'/dashboard',
        name: SCREENS.DASHBOARD
    },
    {
        id: 1,
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
    }
];