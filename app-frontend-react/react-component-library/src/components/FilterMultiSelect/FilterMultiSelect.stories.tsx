import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import FilterMultiSelect from './FilterMultiSelect';
import { FilterMultiSelectProps } from './FilterMultiSelect.types';

export default {
    title: 'Components/FilterMultiSelect',
    component: FilterMultiSelect,
    excludeStories: /.*Data$/,
} as Meta;

// create a template
const Template: Story<FilterMultiSelectProps> = (args) => {
    return <FilterMultiSelect {...args} />;
};

/** *************************************************
 * Data
 ************************************************** */

const sampleArgs: FilterMultiSelectProps = {
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
            key: 'value3',
            value: 'Value 3',
        },
        {
            key: 'value4',
            value: 'Value 4',
        },
        {
            key: 'value5',
            value: 'Value 5',
        },
    ],
    selectedOptions: [
        {
            key: 'value4',
            value: 'Value 4',
        },
    ],
    onSelected: () => {
        console.log('Selected!!');
    },
    showFilter: true,
};

/** *************************************************
 * Stories
 ************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const Basic: Story = Template.bind({});
Basic.args = { ...sampleArgs };
