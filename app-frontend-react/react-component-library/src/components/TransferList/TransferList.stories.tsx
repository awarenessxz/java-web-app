import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import TransferList from './TransferList';
import { TransferListProps } from './TransferList.types';
import { SelectOption } from '../FilterMultiSelect/FilterMultiSelect.types';

export default {
    title: 'Components/TransferList',
    component: TransferList,
    excludeStories: /.*Data$/,
} as Meta;

// create a template
const Template: Story<TransferListProps> = (args) => {
    return <TransferList {...args} />;
};

/** *************************************************
 * Data
 ************************************************** */

const sampleArgs: TransferListProps = {
    options: [
        {
            key: 'value1',
            value: 'Value 1',
        },
        {
            key: 'value2',
            value: 'Value 2',
        },
        {
            key: 'test3',
            value: 'Test 3',
        },
        {
            key: 'test4',
            value: 'Test 4',
        },
        {
            key: 'test5',
            value: 'Test 5',
        },
    ],
    selectedOptions: [
        {
            key: 'test4',
            value: 'Test 4',
        },
    ],
    onTransfer(srcList: SelectOption[], destList: SelectOption[]): void {},
};

/** *************************************************
 * Stories
 ************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const Basic: Story = Template.bind({});
Basic.args = { ...sampleArgs };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const WithFilter: Story = Template.bind({});
WithFilter.args = { ...sampleArgs, showFilter: true };
