export interface IUser {
    name: string;
    isAdmin: boolean;
    background: string;
    theme: string;
    menuItems: IMenuItem[];
}

export interface IMenuItem {
    id: number;
    name: string;
    iconName: string | null;
    application: IApplication | null;
    subItems: IMenuItem[];
}

export interface IApplication {
    id: number;
    name: string;
}