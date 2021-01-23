import React from 'react';
import { SelectOption } from '../FilterMultiSelect/FilterMultiSelect.types';

export interface BooleanHashMap {
    [key: string]: boolean;
}

export interface ItemProps {
    children: React.ReactNode;
}

export interface TransferListProps {
    /** Options in list */
    options: SelectOption[];
    /** Selected options in list */
    selectedOptions: SelectOption[];
    /** callback function when selected options changes */
    onTransfer: (srcList: SelectOption[], destList: SelectOption[]) => void;
    /** Source List Title */
    leftListTitle?: string;
    /** Destination List Title */
    rightListTitle?: string;
    /** enable filtering of select -- default = false */
    showFilter?: boolean;
    /** disable component */
    disabled?: boolean;
}
