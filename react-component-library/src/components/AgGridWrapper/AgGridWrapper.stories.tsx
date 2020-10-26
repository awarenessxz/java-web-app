import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { RowNode } from 'ag-grid-community';
import AgGridWrapper from './AgGridWrapper';
import { AgGridWrapperProps } from './AgGridWrapper.types';

export default {
    title: 'Components/AgGridWrapper',
    component: AgGridWrapper,
    excludeStories: /.*Data$/,
} as Meta;

// create a template
const Template: Story<AgGridWrapperProps> = (args) => <AgGridWrapper {...args} />;

/** *************************************************
 * Data
 ************************************************** */

export const sampleData = {
    columnDefs: [
        {
            headerName: 'Make',
            field: 'make',
        },
        {
            headerName: 'Model',
            field: 'model',
            filter: true,
        },
        {
            headerName: 'Price',
            field: 'price',
            sortable: true,
        },
    ],
    rowData: [
        {
            make: 'Toyota',
            model: 'Celica',
            price: 35000,
        },
        {
            make: 'Ford',
            model: 'Mondeo',
            price: 32000,
        },
        {
            make: 'Porsche',
            model: 'Boxter',
            price: 72000,
        },
    ],
};

// just for showing simplified view
export const simplifiedColumnDefsData = [
    {
        headerName: 'Simplified',
        field: 'make',
    },
    {
        headerName: 'Column Definitions',
        field: 'model',
        filter: true,
    },
    {
        headerName: 'View',
        field: 'price',
        sortable: true,
    },
];

/** *************************************************
 * Stories
 ************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const Basic: Story = Template.bind({});
Basic.args = { ...sampleData };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const EnableDownload: Story = Template.bind({});
EnableDownload.args = { ...Basic.args, enableDownload: true, toolbarProps: { toolbarPosition: 'top' } };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const EnableRowSelection: Story = Template.bind({});
EnableRowSelection.args = {
    ...Basic.args,
    enableRowSelection: {
        onSelectionChange: (selectedData: RowNode[]): void => {
            console.log(selectedData);
        },
        multiRowSelection: true,
        showCheckbox: true,
    },
    toolbarProps: { toolbarPosition: 'top' },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const EnableCellEdit: Story = Template.bind({});
EnableCellEdit.args = { ...Basic.args, enableCellEdit: true, toolbarProps: { toolbarPosition: 'top' } };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const EnableColumnResize: Story = Template.bind({});
EnableColumnResize.args = { ...Basic.args, enableColumnResize: true, toolbarProps: { toolbarPosition: 'top' } };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const EnableCharts: Story = Template.bind({});
EnableCharts.args = { ...Basic.args, enableCharts: true, toolbarProps: { toolbarPosition: 'top' } };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const EnableSimplifiedView: Story = Template.bind({});
EnableSimplifiedView.args = {
    ...Basic.args,
    enableSimplifiedColumnDefs: {
        simplifiedColumnDefs: simplifiedColumnDefsData,
        showSimplifiedView: true,
    },
    toolbarProps: { toolbarPosition: 'top' },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const AllTools: Story = Template.bind({});
AllTools.args = {
    ...Basic.args,
    ...EnableDownload.args,
    ...EnableCellEdit.args,
    ...EnableColumnResize.args,
    ...EnableCharts.args,
    ...EnableSimplifiedView.args,
};
