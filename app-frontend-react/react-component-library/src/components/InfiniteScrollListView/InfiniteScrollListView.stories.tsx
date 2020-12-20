import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import InfiniteScrollListView from './InfiniteScrollListView';
import { InfiniteScrollListViewProps, ListViewItem } from './InfiniteScrollListView.types';

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
    onItemClick: (item: ListViewItem) => {
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
    onDeleteBtnClick: undefined, // have to manually undefined it because of storybook actions
    onEditBtnClick: undefined, // have to manually undefined it because of storybook actions
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const ListWithControls: Story = Template.bind({});
ListWithControls.args = {
    ...sampleArgs,
    dataToItemMapping: {
        id: 'id',
        title: 'title',
        message: 'message',
        displayDateTime: 'displayDateTime',
    },
    onDeleteBtnClick: (item: ListViewItem): void => {
        console.log(`${item.title} is deleted`);
    },
    onEditBtnClick: (item: ListViewItem): void => {
        console.log(`${item.title} is edited`);
    },
};
