export interface IUser {
    name: string;
    isAdmin: boolean;
    background: string;
    menuItems: MenuItem[];
}

export interface MenuItem {
    label: string;
    icon: string;
    route: string;
}