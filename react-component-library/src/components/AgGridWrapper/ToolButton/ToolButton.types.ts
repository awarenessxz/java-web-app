export enum ToolButtonTypes {
    normal,
    badge,
    menu,
    dropdown,
    switch,
}

export interface ToolButtonProps {
    tooltipMsg: string;
    icon: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled: boolean;
    buttonType: ToolButtonTypes;
    buttonTypeProps: ToolButtonTypeProps;
}

interface ToolButtonTypeProps {
    badgeCount?: number;
    menuItems?: string[];
    switchGroup?: string;
    switchIsChecked?: boolean;
    dropdownContent?: JSX.Element;
}
