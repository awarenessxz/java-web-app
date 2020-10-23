import { GridOptions, GridApi } from 'ag-grid-community';

export interface AgGridWrapperProps {
    height: string;
    width: string;
    gridProps: GridApi | GridOptions;
}

export interface AgGridWrapperStates {
    numOfSelectedRows: number;
    isWrapperReady: boolean;
    error: string;
    agGridDefaultProps: GridApi | GridOptions;
}
