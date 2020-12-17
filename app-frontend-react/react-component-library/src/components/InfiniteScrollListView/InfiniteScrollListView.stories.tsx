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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        alert(`${item.title} Clicked`);
    },
    dataToItemMapping: {
        id: 'id',
        title: 'title',
        message: 'message',
        displayDateTime: 'displayDateTime',
    },
    dataApiUrl: '/api/infinitescrolllistview/fakedata',
    dataLimit: 4,
    dataOffset: 0,
    dataOffsetIncrement: 4,
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const ListWithFlag: Story = Template.bind({});
ListWithFlag.args = {
    ...sampleArgs,
    dataToItemMapping: {
        id: 'id',
        title: 'title',
        message: 'message',
        displayDateTime: 'displayDateTime',
        isFlagged: 'isFlagged',
    },
};
