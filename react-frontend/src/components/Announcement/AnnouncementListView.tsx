import React from 'react';
import { InfiniteScrollListView } from 'react-component-library';
import { EuiPage, EuiPageBody, EuiPageSideBar } from '@elastic/eui';
import { fetchWithQueryParams } from '../../utils/fetch-util';

const AnnouncementListView = (): JSX.Element => {
    return (
        <EuiPage>
            <EuiPageSideBar>
                <InfiniteScrollListView
                    onLoadMoreData={(): Promise<Response> =>
                        fetchWithQueryParams('/announcements/all', { limit: 5, offset: 5 })
                    }
                    totalAmountOfData={20}
                    dataFetchAmount={5}
                    dataOffset={5}
                    onItemClick={(item): void => console.log('clicked')}
                    dataToItemMapping={{
                        id: 'id',
                        title: 'author',
                        message: 'snippets',
                    }}
                />
            </EuiPageSideBar>
            <EuiPageBody component="div">
                <div>Something</div>
            </EuiPageBody>
        </EuiPage>
    );
};

export default AnnouncementListView;
