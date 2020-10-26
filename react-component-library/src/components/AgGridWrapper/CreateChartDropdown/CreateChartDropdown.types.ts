import { CreateRangeChartParams } from 'ag-grid-community';

export interface CreateChartDropdownProps {
    /** list of all column header in grid */
    defaultColumnNames: string[];
    /** list of all column header field in grid */
    defaultColumnFields: string[];
    /** callback */
    onClick: (params: CreateRangeChartParams) => void;
}
