import * as React from 'react';
import { render } from '@testing-library/react';

// Import Component
import TestComponent from './TestComponent';
import { TestComponentProps } from './TestComponent.types';

// function to render Component before each test
const renderComponent = (props = {}) => {
    const defaultProps: TestComponentProps = {
        theme: 'primary',
    };
    const merged = { ...defaultProps, ...props };
    return render(<TestComponent {...merged} />);
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot Testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    // Testing Dom Elements: check if renders with correct value (Note: the usage of data-testid in component)
    describe('Testing if component renders with correct state/value', () => {
        it('should have primary className with default props', () => {
            const { getByTestId } = renderComponent();
            const testComponent = getByTestId('test-component');
            expect(testComponent).not.toHaveClass('testComponentSecondary');
        });

        it('should have secondary className with theme set as secondary', () => {
            const { getByTestId } = renderComponent({ theme: 'secondary' });
            const testComponent = getByTestId('test-component');
            expect(testComponent).toHaveClass('testComponentSecondary');
        });
    });
});
