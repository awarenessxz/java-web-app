import React, { Component, Fragment } from 'react';

// Import Material UI
import Container from '@material-ui/core/Container';

// Import Ag-Grid
import { AgGridReact } from 'ag-grid-react';

// Import Type Definitions
import { AgGridWrapperProps, AgGridWrapperStates } from './AgGridWrapper.types';

/*
 * AgGrid Wrapper
 */
class AgGridWrapper extends Component<AgGridWrapperProps, AgGridWrapperStates> {
    static defaultProps: AgGridWrapperProps = {
        height: '400px',
        width: '100%',
        gridProps: {},
    };

    constructor(props: AgGridWrapperProps) {
        super(props);
        this.state = {
            numOfSelectedRows: 0,
            isWrapperReady: false,
            error: '',
            agGridDefaultProps: {
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
            },
        };
    }

    render(): JSX.Element {
        const gridProps = { ...this.state.agGridDefaultProps, ...this.props.gridProps };
        return (
            <Container data-testid="AgGridWrapper" disableGutters maxWidth={false}>
                {this.state.error.trim() === '' ? (
                    this.state.isWrapperReady && (
                        <Fragment>
                            <div
                                className="ag-theme-alpine"
                                style={{ height: this.props.height, width: this.props.width }}
                            >
                                <AgGridReact
                                    onGridReady={(params) => {
                                        this.gridApi = params.api;
                                        this.columnApi = params.columnApi;
                                        if (this.props.onGridReady) {
                                            this.props.onGridReady(params);
                                        }
                                    }}
                                    defaultColDef={this.props.defaultColDef}
                                    columnDefs={this.props.columnDefs}
                                    rowData={this.props.rowData}
                                    {...gridProps}
                                />
                            </div>
                        </Fragment>
                    )
                ) : (
                    <div data-testId="errorMsg" className={styles.error}>
                        {this.state.error}
                    </div>
                )}
            </Container>
        );
    }
}

export default AgGridWrapper;
