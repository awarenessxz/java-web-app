export enum UserRoles {
    admin = 'ADMIN_USER',
    normalUser = 'NORMAL_USER',
}

export interface UserInfo {
    userId: string;
    userRole: UserRoles;
}
