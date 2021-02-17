import React from 'react';
import { AgGridWrapper } from 'react-component-library';
import AppContent from '../../app/components/AppContent/AppContent';

const sampleData = {
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

const DemoCompLibrary = (): JSX.Element => {
    return (
        <AppContent title="Demo React Component Library">
            <AgGridWrapper {...sampleData} />
        </AppContent>
    );
};

export default DemoCompLibrary;
