import { ColDef, ColGroupDef, GridOptions, GridApi, RowNode } from 'ag-grid-community';

export interface AgGridWrapperProps {
    /** height of AgGrid (in px) */
    height?: string;
    /** width of AgGrid (in px or %) */
    width?: string;
    /** enable downloading of data */
    enableDownload?: boolean;
    /** enable row selection (Refer to Docs for EnableRowSelectionProps) */
    enableRowSelection?: EnableRowSelectionProps;
    /** ag-grid rowData (Refer to official ag-grid documentation) */
    rowData: any[];
    /** ag-grid defaultColDef (Refer to official ag-grid documentation) */
    defaultColDef?: ColDef;
    /** ag-grid columnDefs (Refer to official ag-grid documentation) */
    columnDefs: (ColDef | ColGroupDef)[];
    /** ag-grid properties (Refer to official ag-grid documentation) */
    gridProps?: GridApi | GridOptions;
    /** Tool Bar (Refer to Docs for ToolBarProps) */
    toolbarProps?: ToolBarProps;
}

interface EnableRowSelectionProps {
    /** listener for parent component to get selected row's data */
    onSelectionChange: (selectedData: RowNode[]) => void;
    /** allow only single or multi row selection */
    multiRowSelection: boolean;
    /** show checkbox in first column */
    showCheckbox: boolean;
}

export interface ToolBarProps {
    toolbarPosition?: 'top' | 'bottom' | 'none';
    toolbarColor?: string;
}
