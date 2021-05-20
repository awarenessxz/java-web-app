import React, { Fragment, useEffect, useState } from 'react';
// Import External Libraries
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ColGroupDef,
    Column,
    ColumnApi,
    CreateRangeChartParams,
    GridApi,
    GridOptions,
    GridReadyEvent,
    SelectionChangedEvent,
} from 'ag-grid-community';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import InsertChart from '@material-ui/icons/InsertChart';
import GetApp from '@material-ui/icons/GetApp';
import Redo from '@material-ui/icons/Redo';
import Undo from '@material-ui/icons/Undo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltH, faTextWidth } from '@fortawesome/free-solid-svg-icons';
// Import Internal Libraries
import { AgGridWrapperProps, ToolBarProps } from './AgGridWrapper.types';
import { ToolButtonTypes } from './ToolButton/ToolButton.types';
import CreateChartDropdown from './CreateChartDropdown/CreateChartDropdown';
import ToolButton from './ToolButton/ToolButton';
import styles from './AgGridWrapper.module.scss';

/*
 * Custom AgGrid Wrapper for ag-grid-react
 */
const AgGridWrapper = ({
    height = '400px',
    width = '100%',
    enableDownload = false,
    enableCellEdit = false,
    enableColumnResize = false,
    enableCharts = false,
    enableRowSelection,
    enableSimplifiedColumnDefs,
    defaultColDef = {},
    columnDefs,
    rowData = [],
    gridProps = {},
    toolbarProps = {},
}: AgGridWrapperProps): JSX.Element => {
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | null>(null);
    const [mColumnDefs, setmColumnDefs] = useState<(ColDef | ColGroupDef)[]>([]);
    const [mDefaultColDef, setmDefaultColDef] = useState<ColDef>({});
    const [error, setError] = useState('');
    const [isSimplifiedView, setIsSimplifiedView] = useState(false);
    const [isWrapperReady, setIsWrapperReady] = useState(false);
    const [mToolbarProps, setmToolbarProps] = useState<ToolBarProps>({});
    const [numOfSelectedRows, setNumOfSelectedRows] = useState(0);

    // init properties on first load
    useEffect(() => {
        let initSuccess = true;

        // init Toolbar -- merged the toolbar properties with user defined ones [might have better way of handling this...]
        const defaultToolbarProps = { toolbarPosition: 'none' as const, toolbarColor: '#EDEDED' };
        setmToolbarProps({ ...defaultToolbarProps, ...toolbarProps });

        // init Default Column Definitions
        const defaultDefaultColDef = {
            flex: 1,
            minWidth: 110,
            filter: false,
            editable: false,
            resizable: true,
            sortable: true,
        };
        defaultDefaultColDef.editable = enableCellEdit;
        setmDefaultColDef({ ...defaultDefaultColDef, ...defaultColDef });

        // init ColumnDefinitions
        if (columnDefs === undefined) {
            setError('Column Definition must be specified!!');
            initSuccess = false;
        } else {
            const tempColumnDef = columnDefs;
            if (enableRowSelection) {
                if ('checkboxSelection' in tempColumnDef[0]) {
                    tempColumnDef[0].checkboxSelection = enableRowSelection.showCheckbox;
                }
            }
            setmColumnDefs(tempColumnDef);
        }

        // init Simplified ColumnDefinitions
        if (enableSimplifiedColumnDefs) {
            setIsSimplifiedView(enableSimplifiedColumnDefs.showSimplifiedView);
        }

        setIsWrapperReady(initSuccess);
    }, []);

    /** *************************************************
     * Toolbar Functions
     ************************************************** */

    // returns selected row's data to parent component (if selection is enabled)
    const handleSelectedChange = (e: SelectionChangedEvent): void => {
        if (gridApi !== null) {
            const selectedNodes = gridApi.getSelectedNodes();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            const selectedData = selectedNodes.map((node) => node.data);
            setNumOfSelectedRows(selectedData.length);
            if (enableRowSelection) {
                enableRowSelection.onSelectionChange(selectedData);
            }
        }
    };

    // handle selection change when button in toolbar is clicked
    const handleSelectionCheckbox = (e: Event): void => {
        if (numOfSelectedRows < rowData.length) {
            gridApi?.selectAll();
        } else {
            gridApi?.deselectAll();
        }
    };

    // handle change in column definition
    const handleColumnDefinitionChange = (): void => {
        setIsSimplifiedView(!isSimplifiedView);
        if (enableSimplifiedColumnDefs) {
            if (isSimplifiedView) {
                gridApi?.setColumnDefs(mColumnDefs);
            } else {
                gridApi?.setColumnDefs(enableSimplifiedColumnDefs.simplifiedColumnDefs);
            }
        }
    };

    // handle charts event
    const handleCreateChart = (params: CreateRangeChartParams): void => {
        gridApi?.createRangeChart(params);
    };

    // handle download of data when download button in toolbar is clicked
    const handleDownload = (menuIdx: number): void => {
        switch (menuIdx) {
            case 0: // export as csv
                gridApi?.exportDataAsCsv();
                break;
            case 1: // export as excel
                gridApi?.exportDataAsExcel();
                break;
            default:
                break;
        }
    };

    // handle resize of columns when button in toolbar is clicked
    const handleResizeColumnsToFitText = (): void => {
        const colIds = gridColumnApi?.getAllColumns().map((col: Column) => col.getColId());
        if (colIds) {
            gridColumnApi?.autoSizeColumns(colIds);
        }
    };

    // renders selection icon
    const SelectionIcon = (): JSX.Element => {
        if (numOfSelectedRows <= 0) {
            return <CheckBoxOutlineBlank />;
        }
        if (numOfSelectedRows >= rowData.length) {
            return <CheckBox />;
        }
        return <IndeterminateCheckBoxIcon />;
    };

    const renderToolbar = (): JSX.Element => {
        return (
            <Toolbar data-testid="toolbar" style={{ background: mToolbarProps.toolbarColor }}>
                <div style={{ flexGrow: 1 }} />
                <div>
                    {enableCellEdit && (
                        <Fragment>
                            <ToolButton
                                onClick={(): void => gridApi?.undoCellEditing()}
                                icon={<Undo />}
                                tooltipMsg="Undo Edits (Ctrl + Z)"
                                buttonType={ToolButtonTypes.normal}
                            />
                            <ToolButton
                                onClick={(): void => gridApi?.redoCellEditing()}
                                icon={<Redo />}
                                tooltipMsg="Redo Edits (Ctrl + Y)"
                                buttonType={ToolButtonTypes.normal}
                            />
                        </Fragment>
                    )}
                    {enableColumnResize && (
                        <Fragment>
                            <ToolButton
                                onClick={handleResizeColumnsToFitText}
                                icon={<FontAwesomeIcon icon={faTextWidth} />}
                                tooltipMsg="Resize to Fit Content"
                                buttonType={ToolButtonTypes.normal}
                            />
                            <ToolButton
                                onClick={(): void => gridApi?.sizeColumnsToFit()}
                                icon={<FontAwesomeIcon icon={faArrowsAltH} />}
                                tooltipMsg="Resize to Fit Window"
                                buttonType={ToolButtonTypes.normal}
                            />
                        </Fragment>
                    )}
                    {enableRowSelection && (
                        <ToolButton
                            icon={<SelectionIcon />}
                            tooltipMsg={numOfSelectedRows < rowData.length ? 'Select All Rows' : 'Clear All Selection'}
                            onClick={handleSelectionCheckbox}
                            buttonTypeProps={{ badgeCount: numOfSelectedRows }}
                            buttonType={ToolButtonTypes.badge}
                            disabled={rowData.length <= 0}
                        />
                    )}
                    {enableCharts && (
                        <ToolButton
                            onClick={handleCreateChart}
                            icon={<InsertChart />}
                            tooltipMsg="Create Charts"
                            buttonType={ToolButtonTypes.dropdown}
                            buttonTypeProps={{
                                dropdownContent: (
                                    <CreateChartDropdown
                                        defaultColumnNames={mColumnDefs.map((colDef: ColDef) => {
                                            if (colDef.headerName) {
                                                return colDef.headerName;
                                            }
                                            return colDef.field as string;
                                        })}
                                        defaultColumnFields={mColumnDefs.map((colDef: ColDef) => {
                                            return colDef.field as string;
                                        })}
                                        onClick={(): void => {}} // onClick is defined via ToolButton's onClick
                                    />
                                ),
                            }}
                        />
                    )}
                    {enableDownload && (
                        <ToolButton
                            icon={<GetApp />}
                            tooltipMsg="Download"
                            onClick={handleDownload}
                            buttonType={ToolButtonTypes.menu}
                            buttonTypeProps={{
                                menuItems: ['CSV Export', 'Excel Export'],
                            }}
                        />
                    )}
                    {enableSimplifiedColumnDefs && (
                        <ToolButton
                            onClick={handleColumnDefinitionChange}
                            icon={(): void => {}}
                            tooltipMsg={isSimplifiedView ? 'Show original view' : 'Show simplified view'}
                            buttonType={ToolButtonTypes.switch}
                            buttonTypeProps={{
                                switchGroup: 'columnDefinitionSwitch',
                                switchIsChecked: isSimplifiedView,
                            }}
                        />
                    )}
                </div>
            </Toolbar>
        );
    };

    /** *************************************************
     * Ag-Grid Properties / Functions
     ************************************************** */

    const getGridProps = (): GridOptions => {
        const defaultAgGridProps = {
            animateRows: true,
            enableRangeSelection: true,
            enableCellTextSelection: true,
            statusBar: {
                statusPanels: [
                    {
                        statusPanel: 'agTotalRowCountComponent',
                        align: 'left',
                    },
                    { statusPanel: 'agFilteredRowCountComponent' },
                    { statusPanel: 'agSelectedRowCountComponent' },
                    { statusPanel: 'agAggregationComponent' },
                ],
            },
        };
        return { ...defaultAgGridProps, ...gridProps };
    };

    const getRowSelectionProps = (): GridOptions => {
        if (enableRowSelection) {
            return {
                rowSelection: enableRowSelection.multiRowSelection ? 'multiple' : 'single',
                rowMultiSelectWithClick: true,
                onSelectionChanged: (e): void => handleSelectedChange(e),
            };
        }
        return {};
    };

    const getCellEditsProps = (): GridOptions => {
        if (enableCellEdit) {
            return {
                singleClickEdit: true,
                undoRedoCellEditing: true,
                undoRedoCellEditingLimit: 100,
                enableCellChangeFlash: true,
                stopEditingWhenGridLosesFocus: true,
            };
        }
        return {};
    };

    const onGridReady = (params: GridReadyEvent): void => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    /** *************************************************
     * Main Render
     ************************************************** */

    return (
        <Container data-testid="AgGridWrapper" disableGutters maxWidth={false}>
            {error.trim() === '' ? (
                isWrapperReady && (
                    <Fragment>
                        {mToolbarProps.toolbarPosition === 'top' && renderToolbar()}
                        <div className="ag-theme-alpine" style={{ height, width }}>
                            <AgGridReact
                                onGridReady={onGridReady}
                                defaultColDef={mDefaultColDef}
                                columnDefs={
                                    isSimplifiedView ? enableSimplifiedColumnDefs?.simplifiedColumnDefs : mColumnDefs
                                }
                                rowData={rowData}
                                enableCharts={enableCharts}
                                {...getRowSelectionProps()}
                                {...getCellEditsProps()}
                                {...getGridProps()} /* must be at the bottom so that this takes priority */
                            />
                        </div>
                        {mToolbarProps.toolbarPosition === 'bottom' && renderToolbar()}
                    </Fragment>
                )
            ) : (
                <div data-testId="error-msg" className={styles.error}>
                    {error}
                </div>
            )}
        </Container>
    );
};

export default AgGridWrapper;
