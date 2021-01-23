import * as React from 'react';
import { render, RenderResult, screen, fireEvent, within } from '@testing-library/react';

// Import Component
import TransferList from './TransferList';
import { TransferListProps } from './TransferList.types';

// function to render Component before each test
const renderComponent = (props = {}): RenderResult => {
    const defaultProps: TransferListProps = {
        onTransfer: jest.fn(),
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
    };
    const merged = { ...defaultProps, ...props };
    return render(<TransferList {...merged} />);
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot Testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    describe('Title is rendered correctly for list', () => {
        it('Left list title is correct', () => {
            const title = 'Left Title';
            renderComponent({ leftListTitle: title });
            const leftList = screen.getByTestId('filtermultiselect-left');
            expect(within(leftList).getByText(title)).toBeInTheDocument();
        });

        it('Right list title is correct', () => {
            const title = 'Right Title';
            renderComponent({ rightListTitle: title });
            const rightList = screen.getByTestId('filtermultiselect-right');
            expect(within(rightList).getByText(title)).toBeInTheDocument();
        });
    });

    describe('Render List', () => {
        it('no selected options --> left list is populated, right list is empty', () => {
            const value1 = 'Test 1';
            const value2 = 'Test 2';
            const options = [
                { key: 'test1', value: value1 },
                { key: 'test2', value: value2 },
            ];
            renderComponent({ options });
            // assert that left list is populated
            const leftList = screen.getByTestId('filtermultiselect-left');
            expect(within(leftList).getByText(value1)).toBeInTheDocument();
            expect(within(leftList).getByText(value2)).toBeInTheDocument();
            // assert that right list is empty
            const rightList = screen.getByTestId('filtermultiselect-right');
            const htmlOptions = within(rightList).queryAllByTestId('select-multiple-option') as HTMLOptionElement[];
            expect(htmlOptions.length).toBe(0);
        });

        it('some selected options --> left list is populated, right list is populated', () => {
            const value1 = 'Test 1';
            const value2 = 'Test 2';
            const options = [
                { key: 'test1', value: value1 },
                { key: 'test2', value: value2 },
            ];
            const selectedOptions = [{ key: 'test1', value: 'Test 1' }];
            renderComponent({ options, selectedOptions });
            // assert that left list is populated
            const leftList = screen.getByTestId('filtermultiselect-left');
            expect(within(leftList).getByText(value2)).toBeInTheDocument();
            // assert that right list is populated
            const rightList = screen.getByTestId('filtermultiselect-right');
            expect(within(rightList).getByText(value1)).toBeInTheDocument();
        });

        it('all selected options --> left list is empty, right list is populated', () => {
            const value1 = 'Test 1';
            const value2 = 'Test 2';
            const options = [
                { key: 'test1', value: value1 },
                { key: 'test2', value: value2 },
            ];
            renderComponent({ options, selectedOptions: options });
            // assert that left list is populated
            const leftList = screen.getByTestId('filtermultiselect-left');
            const htmlOptions = within(leftList).queryAllByTestId('select-multiple-option') as HTMLOptionElement[];
            expect(htmlOptions.length).toBe(0);
            // assert that right list is populated
            const rightList = screen.getByTestId('filtermultiselect-right');
            expect(within(rightList).getByText(value1)).toBeInTheDocument();
            expect(within(rightList).getByText(value2)).toBeInTheDocument();
        });
    });
});

// 2. Testing Event Listener
describe('Testing OnClick Events', () => {
    describe('Testing Transfer', () => {
        it('all options on left, 0 options on right --> transfer all to right', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
            ];
            renderComponent({ options });
            // before
            let leftList = screen.getByTestId('filtermultiselect-left');
            let rightList = screen.getByTestId('filtermultiselect-right');
            let selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            let selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            expect(selectInputLeft.options.length).toBe(2);
            expect(selectInputRight.options.length).toBe(0);
            // action
            expect(within(leftList).queryByText('0/2 selected')).toBeTruthy(); // verify
            fireEvent.click(within(leftList).getByTestId('input-checkbox')); // check all in left list
            expect(within(leftList).queryByText('2/2 selected')).toBeTruthy(); // verify
            fireEvent.click(screen.getByRole('button', { name: '>' })); // transfer to right
            // after
            leftList = screen.getByTestId('filtermultiselect-left');
            rightList = screen.getByTestId('filtermultiselect-right');
            selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            expect(selectInputLeft.options.length).toBe(0);
            expect(selectInputRight.options.length).toBe(2);
        });

        it('0 options on left, all options on right --> transfer all to right -- nothing happens', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
            ];
            renderComponent({ options, selectedOptions: options });
            // before
            let leftList = screen.getByTestId('filtermultiselect-left');
            let rightList = screen.getByTestId('filtermultiselect-right');
            let selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            let selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            expect(selectInputLeft.options.length).toBe(0);
            expect(selectInputRight.options.length).toBe(2);
            // action
            expect(within(leftList).queryByText('0/0 selected')).toBeTruthy(); // verify
            fireEvent.click(within(leftList).getByTestId('input-checkbox')); // check all in left list
            expect(within(leftList).queryByText('0/0 selected')).toBeTruthy(); // verify
            fireEvent.click(screen.getByRole('button', { name: '>' })); // transfer to right
            // after
            leftList = screen.getByTestId('filtermultiselect-left');
            rightList = screen.getByTestId('filtermultiselect-right');
            selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            expect(selectInputLeft.options.length).toBe(0);
            expect(selectInputRight.options.length).toBe(2);
        });

        it('0 options on left, all options on right --> transfer all to left', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
            ];
            renderComponent({ options, selectedOptions: options });
            // before
            let leftList = screen.getByTestId('filtermultiselect-left');
            let rightList = screen.getByTestId('filtermultiselect-right');
            let selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            let selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            expect(selectInputLeft.options.length).toBe(0);
            expect(selectInputRight.options.length).toBe(2);
            // action
            expect(within(rightList).queryByText('0/2 selected')).toBeTruthy(); // verify
            fireEvent.click(within(rightList).getByTestId('input-checkbox')); // check all in right list
            expect(within(rightList).queryByText('2/2 selected')).toBeTruthy(); // verify
            fireEvent.click(screen.getByRole('button', { name: '<' })); // transfer to left
            // after
            leftList = screen.getByTestId('filtermultiselect-left');
            rightList = screen.getByTestId('filtermultiselect-right');
            selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            expect(selectInputLeft.options.length).toBe(2);
            expect(selectInputRight.options.length).toBe(0);
        });

        it('0 options on left, all options on right --> transfer all to right --> nothing happens', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
            ];
            renderComponent({ options, selectedOptions: options });
            // before
            let leftList = screen.getByTestId('filtermultiselect-left');
            let rightList = screen.getByTestId('filtermultiselect-right');
            let selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            let selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            expect(selectInputLeft.options.length).toBe(0);
            expect(selectInputRight.options.length).toBe(2);
            // action
            expect(within(leftList).queryByText('0/0 selected')).toBeTruthy(); // verify
            fireEvent.click(within(leftList).getByTestId('input-checkbox')); // check all in left list
            expect(within(leftList).queryByText('0/0 selected')).toBeTruthy(); // verify
            fireEvent.click(screen.getByRole('button', { name: '>' })); // transfer to right
            // after
            leftList = screen.getByTestId('filtermultiselect-left');
            rightList = screen.getByTestId('filtermultiselect-right');
            selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            expect(selectInputLeft.options.length).toBe(0);
            expect(selectInputRight.options.length).toBe(2);
        });

        it('transfer some options to right', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
                { key: 'test3', value: 'Test 3' },
            ];
            const selectedOptions = [{ key: 'test2', value: 'Test 2' }];
            renderComponent({ options, selectedOptions });
            // before
            let leftList = screen.getByTestId('filtermultiselect-left');
            let rightList = screen.getByTestId('filtermultiselect-right');
            expect(within(leftList).queryByText('0/2 selected')).toBeTruthy(); // verify
            expect(within(rightList).queryByText('0/1 selected')).toBeTruthy(); // verify
            // action
            const selectInput = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            fireEvent.change(selectInput, { target: { value: 'test3' } });
            expect(within(leftList).queryByText('1/2 selected')).toBeTruthy(); // verify
            fireEvent.click(screen.getByRole('button', { name: '>' })); // transfer to right
            // before
            leftList = screen.getByTestId('filtermultiselect-left');
            rightList = screen.getByTestId('filtermultiselect-right');
            expect(within(leftList).queryByText('0/1 selected')).toBeTruthy(); // verify
            expect(within(rightList).queryByText('0/2 selected')).toBeTruthy(); // verify
        });

        it('transfer some options to left', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
                { key: 'test3', value: 'Test 3' },
            ];
            const selectedOptions = [
                { key: 'test2', value: 'Test 2' },
                { key: 'test3', value: 'Test 3' },
            ];
            renderComponent({ options, selectedOptions });
            // before
            let leftList = screen.getByTestId('filtermultiselect-left');
            let rightList = screen.getByTestId('filtermultiselect-right');
            expect(within(leftList).queryByText('0/1 selected')).toBeTruthy(); // verify
            expect(within(rightList).queryByText('0/2 selected')).toBeTruthy(); // verify
            // action
            const selectInput = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            fireEvent.change(selectInput, { target: { value: 'test3' } });
            expect(within(rightList).queryByText('1/2 selected')).toBeTruthy(); // verify
            fireEvent.click(screen.getByRole('button', { name: '<' })); // transfer to right
            // before
            leftList = screen.getByTestId('filtermultiselect-left');
            rightList = screen.getByTestId('filtermultiselect-right');
            expect(within(leftList).queryByText('0/2 selected')).toBeTruthy(); // verify
            expect(within(rightList).queryByText('0/1 selected')).toBeTruthy(); // verify
        });

        it('transfer some options to right when right have some selection already', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
                { key: 'test3', value: 'Test 3' },
            ];
            const selectedOptions = [{ key: 'test2', value: 'Test 2' }];
            renderComponent({ options, selectedOptions });
            // before
            let leftList = screen.getByTestId('filtermultiselect-left');
            let rightList = screen.getByTestId('filtermultiselect-right');
            const selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            fireEvent.change(selectInputRight, { target: { value: 'test2' } }); // check one of item in right list
            expect(within(leftList).queryByText('0/2 selected')).toBeTruthy(); // verify
            expect(within(rightList).queryByText('1/1 selected')).toBeTruthy(); // verify
            // action
            leftList = screen.getByTestId('filtermultiselect-left');
            const selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            fireEvent.change(selectInputLeft, { target: { value: 'test3' } }); // check one of the item in left list
            expect(within(leftList).queryByText('1/2 selected')).toBeTruthy(); // verify
            fireEvent.click(screen.getByRole('button', { name: '>' })); // transfer to right
            // before
            leftList = screen.getByTestId('filtermultiselect-left');
            rightList = screen.getByTestId('filtermultiselect-right');
            expect(within(leftList).queryByText('0/1 selected')).toBeTruthy(); // verify
            expect(within(rightList).queryByText('1/2 selected')).toBeTruthy(); // verify
        });

        it('transfer some options to left when left have some selection already', () => {
            const options = [
                { key: 'test1', value: 'Test 1' },
                { key: 'test2', value: 'Test 2' },
                { key: 'test3', value: 'Test 3' },
            ];
            const selectedOptions = [
                { key: 'test2', value: 'Test 2' },
                { key: 'test3', value: 'Test 3' },
            ];
            renderComponent({ options, selectedOptions });
            // before
            let leftList = screen.getByTestId('filtermultiselect-left');
            let rightList = screen.getByTestId('filtermultiselect-right');
            const selectInputLeft = within(leftList).getByTestId('select-multiple') as HTMLSelectElement;
            fireEvent.change(selectInputLeft, { target: { value: 'test1' } }); // check one of item in left list
            expect(within(leftList).queryByText('1/1 selected')).toBeTruthy(); // verify
            expect(within(rightList).queryByText('0/2 selected')).toBeTruthy(); // verify
            // action
            rightList = screen.getByTestId('filtermultiselect-right');
            const selectInputRight = within(rightList).getByTestId('select-multiple') as HTMLSelectElement;
            fireEvent.change(selectInputRight, { target: { value: 'test3' } }); // check one of the item in right list
            expect(within(rightList).queryByText('1/2 selected')).toBeTruthy(); // verify
            fireEvent.click(screen.getByRole('button', { name: '<' })); // transfer to left
            // before
            leftList = screen.getByTestId('filtermultiselect-left');
            rightList = screen.getByTestId('filtermultiselect-right');
            expect(within(leftList).queryByText('1/2 selected')).toBeTruthy(); // verify
            expect(within(rightList).queryByText('0/1 selected')).toBeTruthy(); // verify
        });
    });
});
