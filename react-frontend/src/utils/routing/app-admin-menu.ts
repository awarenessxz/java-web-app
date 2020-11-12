import { EuiListGroupItemProps } from '@elastic/eui';

export interface AdminMenuItem extends EuiListGroupItemProps {
    route: string;
    parent?: AdminMenuItem | undefined;
}

export const adminConsoleMenuItems: AdminMenuItem[] = [
    {
        route: '/admin/announcements',
        label: 'Announcements',
        iconType: 'cheer',
        size: 's',
    },
];
