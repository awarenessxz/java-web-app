import React from 'react';

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
    onClick: (param: any) => void;
    disabled?: boolean;
    buttonType: ToolButtonTypes;
    buttonTypeProps?: ToolButtonTypeProps;
}

interface ToolButtonTypeProps {
    badgeCount?: number;
    menuItems?: string[];
    switchGroup?: string;
    switchIsChecked?: boolean;
    dropdownContent?: JSX.Element;
}
