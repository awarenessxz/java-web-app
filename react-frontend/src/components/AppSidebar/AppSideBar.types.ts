export interface MenuItem {
    title: string;
    route: string;
    iconType?: string | undefined; // EUI Icon Type
    items?: MenuItem[] | undefined;
}
