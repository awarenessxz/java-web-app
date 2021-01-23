import * as React from 'react';
import { render, RenderResult, screen, fireEvent } from '@testing-library/react';

// Import Component
import FilterMultiSelect from './FilterMultiSelect';
import { FilterMultiSelectProps } from './FilterMultiSelect.types';

// function to render Component before each test
type PartialFilterMultiSelectProps = Partial<FilterMultiSelectProps>;
const renderComponent = ({ ...props }: PartialFilterMultiSelectProps = {}): RenderResult => {
    const defaultProps: FilterMultiSelectProps = {
        onMultiSelectChange: jest.fn(),
        selectedOptions: [],
        options: [
            {
                key: 'value1',
                value: 'Value 1',
            },
            {
                key: 'value2',
                value: 'Value 2',
            },
        ],
        showFilter: true,
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

    it('Render Title', () => {
        const title = 'Test Title';
        renderComponent({ title });
        expect(screen.getByText(title)).toBeInTheDocument();
    });

    describe('Render filter input', () => {
        it('filter input is rendered by default', () => {
            renderComponent();
            expect(screen.getByTestId('input-filter')).toBeInTheDocument();
        });

        it('filter input is NOT rendered when showFitler = false', () => {
            renderComponent({ showFilter: false });
            expect(screen.queryByTestId('input-filter')).toBeNull();
        });

        it('custom filter placeholder is shown', () => {
            const placeHolder = 'testing placeholder';
            renderComponent({ filterPlaceHolder: placeHolder });
            expect(screen.getByPlaceholderText(placeHolder)).toBeInTheDocument();
        });

        it('custom default filter is shown', () => {
            const filter = 'testing filter';
            renderComponent({ defaultFilter: filter });
            const input = screen.getByTestId('input-filter') as HTMLInputElement;
            expect(input.value).toBe(filter);
        });
    });

    describe('Render select input', () => {
        it('custom options are shown', () => {
            const value1 = 'Test 1';
            const value2 = 'Test 2';
            const options = [
                { key: 'test1', value: value1 },
                { key: 'test2', value: value2 },
            ];
            renderComponent({ options });
            expect(screen.getByText(value1)).toBeInTheDocument();
            expect(screen.getByText(value2)).toBeInTheDocument();
        });

        it('default selected options is selected', () => {
            const value1 = 'Test 1';
            const value2 = 'Test 2';
            const options = [
                { key: 'test1', value: value1 },
                { key: 'test2', value: value2 },
            ];
            const selectedOptions = [{ key: 'test2', value: value2 }];
            renderComponent({ options, selectedOptions });
            const htmlOptions = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
            expect(htmlOptions[1].selected).toBeTruthy(); // options are all selected
            expect(screen.queryByText('1/2 selected')).toBeTruthy(); // text is displayed correctly
        });
    });

    describe('Render checkbox input', () => {
        it('checkbox is not check by default', () => {
            renderComponent();
            const checkbox = screen.getByTestId('input-checkbox') as HTMLInputElement;
            expect(checkbox.checked).not.toBeTruthy();
        });

        it('checkbox is checked when all options are selected', () => {
            const value1 = 'Test 1';
            const value2 = 'Test 2';
            const options = [
                { key: 'test1', value: value1 },
                { key: 'test2', value: value2 },
            ];
            renderComponent({ options, selectedOptions: options });
            const checkbox = screen.getByTestId('input-checkbox') as HTMLInputElement;
            expect(checkbox.checked).toBeTruthy();
        });
    });
});

// 2. Testing Event Listener
describe('Testing OnClick Events', () => {
    describe('Clicking checkbox input', () => {
        it('no selection at first --> checked --> all selected', () => {
            renderComponent();
            const checkbox = screen.getByTestId('input-checkbox') as HTMLInputElement;
            fireEvent.click(checkbox);
            // options are all selected
            const htmlOptions = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
            expect(htmlOptions[0].selected).toBeTruthy();
            expect(htmlOptions[1].selected).toBeTruthy();
            // text is displayed correctly
            expect(screen.queryByText('2/2 selected')).toBeTruthy();
        });

        it('checked --> unchecked --> no selection', () => {
            renderComponent();
            const checkbox = screen.getByTestId('input-checkbox') as HTMLInputElement;
            fireEvent.click(checkbox);
            fireEvent.click(checkbox);
            // options are all selected
            const htmlOptions = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
            expect(htmlOptions[0].selected).not.toBeTruthy();
            expect(htmlOptions[1].selected).not.toBeTruthy();
            // text is displayed correctly
            expect(screen.queryByText('0/2 selected')).toBeTruthy();
        });

        it('some selection at first --> checked --> all selected', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
            ];
            const selectedOptions = [{ key: 'test1', value: 'Test 1' }];
            renderComponent({ options, selectedOptions });
            const htmlOptions = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
            // before
            expect(htmlOptions[0].selected).toBeTruthy();
            expect(htmlOptions[1].selected).not.toBeTruthy();
            expect(screen.queryByText('1/2 selected')).toBeTruthy();
            // click checkbox
            const checkbox = screen.getByTestId('input-checkbox') as HTMLInputElement;
            fireEvent.click(checkbox);
            // after
            expect(htmlOptions[0].selected).toBeTruthy();
            expect(htmlOptions[1].selected).toBeTruthy();
            expect(screen.queryByText('2/2 selected')).toBeTruthy();
        });

        it('all is selected at first --> unchecked --> no selection', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
            ];
            renderComponent({ options, selectedOptions: options });
            const htmlOptions = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
            // before
            expect(htmlOptions[0].selected).toBeTruthy();
            expect(htmlOptions[1].selected).toBeTruthy();
            expect(screen.queryByText('2/2 selected')).toBeTruthy();
            // click checkbox
            const checkbox = screen.getByTestId('input-checkbox') as HTMLInputElement;
            fireEvent.click(checkbox);
            // after
            expect(htmlOptions[0].selected).not.toBeTruthy();
            expect(htmlOptions[1].selected).not.toBeTruthy();
            expect(screen.queryByText('0/2 selected')).toBeTruthy();
        });

        it('some selected with filter at first --> checked --> all selected', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
                { key: 'hidden1', value: 'Hidden 1' },
            ];
            const selectedOptions = [
                { key: 'hidden1', value: 'Hidden 1' },
                { key: 'test2', value: 'Test 2' },
            ];
            renderComponent({ options, selectedOptions, defaultFilter: 'Test' });
            const htmlOptions = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
            // before
            expect(htmlOptions[0].selected).not.toBeTruthy();
            expect(htmlOptions[1].selected).toBeTruthy();
            expect(screen.queryByText('2/3 selected')).toBeTruthy();
            // click checkbox
            const checkbox = screen.getByTestId('input-checkbox') as HTMLInputElement;
            fireEvent.click(checkbox);
            // after
            expect(htmlOptions[0].selected).toBeTruthy();
            expect(htmlOptions[1].selected).toBeTruthy();
            expect(screen.queryByText('3/3 selected')).toBeTruthy();
        });

        it('all selected with filter at first --> unchecked --> hidden selected option is still selected', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
                { key: 'hidden1', value: 'Hidden 1' },
            ];
            renderComponent({ options, selectedOptions: options, defaultFilter: 'Test' });
            const htmlOptions = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
            // before
            expect(htmlOptions[0].selected).toBeTruthy();
            expect(htmlOptions[1].selected).toBeTruthy();
            expect(screen.queryByText('3/3 selected')).toBeTruthy();
            // click checkbox
            const checkbox = screen.getByTestId('input-checkbox') as HTMLInputElement;
            fireEvent.click(checkbox);
            // after
            expect(htmlOptions[0].selected).not.toBeTruthy();
            expect(htmlOptions[1].selected).not.toBeTruthy();
            expect(screen.queryByText('1/3 selected')).toBeTruthy();
        });
    });

    describe('Clicking select input', () => {
        it('no selection --> click one --> 1 selected', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
            ];
            renderComponent({ options });
            const htmlOptions = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
            // before
            expect(htmlOptions[1].selected).not.toBeTruthy(); // second option is not selected
            expect(screen.queryByText('0/2 selected')).toBeTruthy();
            // click on second option
            const selectInput = screen.getByTestId('select-multiple') as HTMLSelectElement;
            fireEvent.change(selectInput, { target: { value: 'test2' } });
            // after
            expect(htmlOptions[1].selected).toBeTruthy(); // second option is selected
            expect(screen.queryByText('1/2 selected')).toBeTruthy(); // text is displayed correctly
        });

        it('no selection --> click one --> callback is expected', () => {
            const callback = jest.fn();
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
            ];
            renderComponent({ options, onMultiSelectChange: callback });
            // click on something
            const selectInput = screen.getByTestId('select-multiple') as HTMLSelectElement;
            fireEvent.change(selectInput, { target: { value: 'test2' } });
            // assert
            expect(callback).toBeCalled();
        });
    });

    describe('Typing filter input', () => {
        const options = [
            { key: 'test1', value: 'Test 1' },
            { key: 'test2', value: 'Test 2' },
            { key: 'hidden3', value: 'Hidden 3' },
        ];
        renderComponent({ options });
        const input = screen.getByTestId('input-filter') as HTMLInputElement;
        // before
        expect(input.value).toBe('');
        const htmlOptionsBefore = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
        expect(htmlOptionsBefore.length).toBe(3);
        // type filter
        const filter = 'Test';
        fireEvent.change(input, { target: { value: filter } });
        // after
        expect(input.value).toBe(filter);
        const htmlOptionsAfter = screen.getAllByTestId('select-multiple-option') as HTMLOptionElement[];
        expect(htmlOptionsAfter.length).toBe(2);
    });
});
