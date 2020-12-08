import React  from 'react';
import { InfiniteScrollListView } from 'react-component-library';
import { EuiPage, EuiPageBody, EuiPageSideBar } from '@elastic/eui';
import { fetchWithQueryParams } from '../../utils/fetch-util';

const AnnouncementListView = (): JSX.Element => {
    return (
        <EuiPage>
            <EuiPageSideBar>
                <InfiniteScrollListView
                    onLoadMoreData={(limit, offset): Promise<Response> =>
                        fetchWithQueryParams('/announcements/all', { limit, offset })
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
                    height="500px"
                    width="auto"
                />
            </EuiPageSideBar>
            <EuiPageBody component="div">
                <div>Something</div>
            </EuiPageBody>
        </EuiPage>
    );
};

export default AnnouncementListView;
