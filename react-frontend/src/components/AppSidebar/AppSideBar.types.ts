export interface MenuItem {
    title: string;
    iconType: string; // EUI Icon Type
    isCollapsible: boolean;
    isOpen: boolean;
    route: string;
    items?: MenuItem[] | undefined;
}
