export interface SelectOption {
    key: string;
    value: string;
}

export interface FilterMultiSelectProps {
    /** Options in list */
    options: SelectOption[];
    /** Selected options in list */
    selectedOptions: SelectOption[];
    /** callback function when selected options changes */
    onSelectChange: (selected: SelectOption[]) => void;
    /** Title */
    title?: string;
    /** default filter for select */
    defaultFilter?: string;
    /** text in filter place holder */
    filterPlaceHolder?: string;
    /** enable filtering of select -- default = false */
    showFilter?: boolean;
    /** disable component */
    disabled?: boolean;
}
