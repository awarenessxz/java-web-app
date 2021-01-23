import * as React from 'react';
import { render, RenderResult, fireEvent, screen } from '@testing-library/react';

// Import Component
import AgGridWrapper from './AgGridWrapper';
import { AgGridWrapperProps } from './AgGridWrapper.types';

// function to render component before each test
type PartialAgGridWrapperProps = Partial<AgGridWrapperProps>;
const renderComponent = ({ columnDefs, rowData, ...props }: PartialAgGridWrapperProps = {}): RenderResult => {
    const defaultProps: AgGridWrapperProps = {
        columnDefs: [
            { headerName: 'Test 1', field: 'test1' },
            { headerName: 'Test 2', field: 'test2' },
            { headerName: 'Test 3', field: 'test3' },
        ],
        rowData: [
            { test1: 'aaa', test2: 'snake', test3: 5000 },
            { test1: 'aab', test2: 'dog', test3: 550 },
            { test1: 'bbb', test2: 'cat', test3: 2000 },
            { test1: 'ccc', test2: 'monkey', test3: 10 },
        ],
    };
    const merged = { ...defaultProps, ...props };
    return render(<AgGridWrapper {...merged} />); // returns methods (refer to api)
};

// Suppress console.error (https://til.hashrocket.com/posts/hrhejhqg2n-turn-off-console-error-messages-in-a-test)
let originalError: Console['error'];
beforeEach(() => {
    originalError = console.error;
    console.error = jest.fn();
});
afterEach(() => {
    console.error = originalError;
});

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot Testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    // Testing Dom Elements: check if renders with correct value (Note the usage of data-testid in component)
    describe('component renders with correct state (Testing Dom Elements)', () => {
        describe('Toolbar renders correctly', () => {
            renderComponent({});
        });

        describe('Toolbar renders correctly', () => {
            it('toolbar = "none"', () => {
                renderComponent({ toolbarProps: { toolbarPosition: 'none' } });
                expect(screen.queryByTestId('toolbar')).toBeNull();
            });

            it('toolbar = "top"', () => {
                renderComponent({ toolbarProps: { toolbarPosition: 'top' } });
                expect(screen.getByTestId('toolbar')).toBeInTheDocument();
            });

            it('toolbar = "bottom"', () => {
                renderComponent({ toolbarProps: { toolbarPosition: 'bottom' } });
                expect(screen.getByTestId('toolbar')).toBeInTheDocument();
            });
        });

        describe('Toolbar Buttons renders correctly', () => {
            it('default state, download button is rendered', () => {
                renderComponent({
                    toolbarProps: { toolbarPosition: 'top' },
                    enableDownload: true,
                });
                screen.getByRole('button', { name: 'Download' });
            });

            it('when selection is enabled, "Select all" button is rendered', () => {
                renderComponent({
                    toolbarProps: { toolbarPosition: 'top' },
                    enableRowSelection: {
                        onSelectionChange: jest.fn(),
                        multiRowSelection: true,
                        showCheckbox: true,
                    },
                });
                screen.getByRole('button', { name: 'Select All Rows' });
            });

            it('when cell edit is enabled, redo and undo button is rendered', () => {
                renderComponent({
                    toolbarProps: { toolbarPosition: 'top' },
                    enableCellEdit: true,
                });
                screen.getByRole('button', { name: 'Undo Edits (Ctrl + Z)' });
                screen.getByRole('button', { name: 'Redo Edits (Ctrl + Y)' });
            });

            it('when charts is enabled, create charts button is rendered', () => {
                renderComponent({
                    toolbarProps: { toolbarPosition: 'top' },
                    enableCharts: true,
                });
                screen.getByRole('button', { name: 'Create Charts' });
            });
        });
    });
});
