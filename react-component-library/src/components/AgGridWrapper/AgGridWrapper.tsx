import React, { Fragment, useEffect, useState } from 'react';
// Import External Libraries
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import {
    ColDef,
    ColGroupDef,
    ColumnApi,
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
import ToolButton from './ToolButton/ToolButton';
import styles from './AgGridWrapper.module.scss';

// Temporary fix for default props
const mDefaultColDef = {
    flex: 1,
    minWidth: 110,
    filter: false,
    editable: false,
    resizable: true,
    sortable: true,
};

/*
 * Custom AgGrid Wrapper for ag-grid-react
 */
const AgGridWrapper = ({
    height = '400px',
    width = '100%',
    enableDownload = false,
    enableRowSelection,
    defaultColDef = mDefaultColDef,
    columnDefs,
    rowData = [],
    gridProps = {},
    toolbarProps = {},
}: AgGridWrapperProps): JSX.Element => {
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | null>(null);
    const [mColumnDefs, setmColumnDefs] = useState<(ColDef | ColGroupDef)[]>([]);
    const [error, setError] = useState('');
    const [isWrapperReady, setIsWrapperReady] = useState(false);
    const [mToolbarProps, setmToolbarProps] = useState<ToolBarProps>({});
    const [numOfSelectedRows, setNumOfSelectedRows] = useState(0);

    // init properties on first load
    useEffect(() => {
        console.log('useEffect is running');
        let initSuccess = true;

        // init Toolbar -- merged the toolbar properties with user defined ones [might have better way of handling this...]
        const defaultToolbarProps = { toolbarPosition: 'none' as const, toolbarColor: '#EDEDED' };
        setmToolbarProps({ ...defaultToolbarProps, ...toolbarProps });

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

        setIsWrapperReady(initSuccess);
    }, []);

    /** *************************************************
     * Toolbar Functions
     ************************************************** */

    // returns selected row's data to parent component (if selection is enabled)
    const handleSelectedChange = (e: SelectionChangedEvent): void => {
        if (gridApi !== null) {
            const selectedNodes = gridApi.getSelectedNodes();
            const selectedData = selectedNodes.map((node) => node.data);
            setNumOfSelectedRows(selectedData.length);
            if (enableRowSelection) {
                enableRowSelection.onSelectionChange(selectedData);
            }
        }
    };

    const handleSelectionCheckbox = (e: Event): void => {
        if (numOfSelectedRows < rowData.length) {
            gridApi?.selectAll();
        } else {
            gridApi?.deselectAll();
        }
    };

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
                                defaultColDef={defaultColDef}
                                columnDefs={mColumnDefs}
                                rowData={rowData}
                                {...getRowSelectionProps()}
                                {...getGridProps()}
                            />
                        </div>
                        {mToolbarProps.toolbarPosition === 'bottom' && renderToolbar()}
                    </Fragment>
                )
            ) : (
                <div data-testId="errorMsg" className={styles.error}>
                    {error}
                </div>
            )}
        </Container>
    );
};

export default AgGridWrapper;
