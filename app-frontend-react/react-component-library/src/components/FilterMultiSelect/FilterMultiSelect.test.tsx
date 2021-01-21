import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';

// Import Component
import FilterMultiSelect from './FilterMultiSelect';
import { FilterMultiSelectProps } from './FilterMultiSelect.types';

// function to render Component before each test
const renderComponent = (props = {}): RenderResult => {
    const defaultProps: FilterMultiSelectProps = {
        title: 'FilterMultiSelect',
    };
    const merged = { ...defaultProps, ...props };
    return render(<FilterMultiSelect {...merged} />);
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot Testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });
});

