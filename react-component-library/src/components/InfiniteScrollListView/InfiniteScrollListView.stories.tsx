import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import InfiniteScrollListView from './InfiniteScrollListView';
import { InfiniteScrollListViewProps } from './InfiniteScrollListView.types';

export default {
    title: 'Components/InfiniteScrollListView',
    component: InfiniteScrollListView,
    excludeStories: /.*Data$/,
} as Meta;

// create a template
const Template: Story<InfiniteScrollListViewProps> = (args) => {
    return <InfiniteScrollListView {...args} />;
};

/** *************************************************
 * Data
 ************************************************** */

const sampleArgs: InfiniteScrollListViewProps = {
    onItemClick: (item) => {
        alert(`${item.title} Clicked`);
    },
    dataToItemMapping: {
        id: 'id',
        title: 'title',
        message: 'message',
    },
    dataApiUrl: '/api/infinitescrolllistview/fakedata',
    dataLimit: 1,
    dataOffset: 0,
    height: '400px',
};

/** *************************************************
 * Stories
 ************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const Basic: Story = Template.bind({});
Basic.args = { ...sampleArgs };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const EmptyList: Story = Template.bind({});
EmptyList.args = { ...Basic.args, dataApiUrl: '/api/emptydata' };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const InvalidAPIEndPoint: Story = Template.bind({});
InvalidAPIEndPoint.args = { ...Basic.args, dataApiUrl: '/api/invalid' };
