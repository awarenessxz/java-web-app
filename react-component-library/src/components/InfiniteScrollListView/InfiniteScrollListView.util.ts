import { ListViewItem } from './InfiniteScrollListView.types';

export const fakeData: ListViewItem[] = [
    {
        id: '1',
        title: 'Alan1',
        message:
            'this is just a previewthis is just a previewthis is just a preview this is just a preview ' +
            'this is just a preview this is just a preview this is just a preview',
        displayDateTime: '2020-12-04T04:53:51.822Z',
    },
    {
        id: '2',
        title: 'Alan2',
        message:
            'this is just a preview this is just a preview this is just a preview this is just a preview t' +
            'his is just a preview this is just a preview this is just a preview',
        displayDateTime: '2020-12-04T04:53:51.822Z',
    },
    {
        id: '3',
        title: 'Alan3',
        message: 'this is just a preview',
        displayDateTime: '2020-11-04T04:53:51.822Z',
    },
    {
        id: '4',
        title: 'Alan4',
        message: 'this is just a preview',
        displayDateTime: '2020-11-04T04:53:51.822Z',
    },
    {
        id: '5',
        title: 'Alan5',
        message: 'this is just a preview',
        displayDateTime: '2020-11-04T04:53:51.822Z',
    },
    {
        id: '6',
        title: 'Alan6',
        message: 'this is just a preview',
        displayDateTime: '2020-11-04T04:53:51.822Z',
    },
    {
        id: '7',
        title: 'Alan7',
        message: 'this is just a preview',
        displayDateTime: '2020-11-04T04:53:51.822Z',
    },
    {
        id: '8',
        title: 'Alan8',
        message: 'this is just a preview',
        displayDateTime: '2020-11-04T04:53:51.822Z',
    },
    {
        id: '9',
        title: 'Alan9',
        message: 'this is just a preview',
        displayDateTime: '2020-11-04T04:53:51.822Z',
    },
    {
        id: '10',
        title: 'Alan10',
        message: 'this is just a preview',
        displayDateTime: '2020-10-04T04:53:51.822Z',
    },
    {
        id: '11',
        title: 'Alan11',
        message: 'this is just a preview',
        displayDateTime: '2020-08-04T04:53:51.822Z',
    },
    {
        id: '12',
        title: 'Alan12',
        message: 'this is just a preview',
        displayDateTime: '2020-07-04T04:53:51.822Z',
    },
    {
        id: '13',
        title: 'Alan13',
        message: 'this is just a preview',
        displayDateTime: '2020-12-04T04:53:51.822Z',
    },
    {
        id: '14',
        title: 'Alan14',
        message: 'this is just a preview',
        displayDateTime: '2020-12-04T04:53:51.822Z',
    },
    {
        id: '15',
        title: 'Alan15',
        message: 'this is just a preview',
        displayDateTime: '2020-12-04T04:53:51.822Z',
    },
    {
        id: '16',
        title: 'Alan16',
        message: 'this is just a preview',
        displayDateTime: '2020-12-04T04:53:51.822Z',
    },
    {
        id: '17',
        title: 'Alan17',
        message: 'this is just a preview',
        displayDateTime: '2020-12-04T04:53:51.822Z',
    },
    {
        id: '18',
        title: 'Alan18',
        message: 'this is just a preview',
        displayDateTime: '2020-12-04T04:53:51.822Z',
    },
    {
        id: '19',
        title: 'Alan19',
        message: 'this is just a preview',
        displayDateTime: '2019-11-04T04:53:51.822Z',
    },
    {
        id: '20',
        title: 'Alan20',
        message: 'this is just a preview',
        displayDateTime: '2019-12-04T04:53:51.822Z',
    },
];

export const getFakeData = (limit: number, offset: number): ListViewItem[] => {
    const results: ListViewItem[] = [];
    if (offset < fakeData.length) {
        let i;
        for (i = 0; i < limit; i += 1) {
            const idx = offset + i;
            if (idx < fakeData.length) {
                results.push(fakeData[idx]);
            } else {
                break;
            }
        }
    }
    return results;
};

/*
export const mockFetchRequest = (limit: number, offset: number): Promise<Response> => {
    return new Promise<Response>((resolve, reject) => {
        const results = getFakeData(limit, offset);
        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
        const init = { status: 200, statusText: 'Super!' };
        resolve(new Response(blob, init));
    });
};
 */
