import * as React from 'react';
import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, RenderResult, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';

// Import Component
import InfiniteScrollListView from './InfiniteScrollListView';
import { InfiniteScrollListViewProps } from './InfiniteScrollListView.types';
import { getFakeData } from './InfiniteScrollListView.util';

// set up mock server for rest api end point
const server = setupServer(
    rest.get('/test/infinitescrolllistview/fakedata', (req, res, ctx) => {
        const data = getFakeData(1, 0);
        return res(ctx.json({ data }));
    }),
    rest.get('/test/infinitescrolllistview/empty', (req, res, ctx) => {
        return res(ctx.json({ data: [] }));
    }),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// function to render Component before each test
const renderComponent = (props = {}): RenderResult => {
    const defaultProps: InfiniteScrollListViewProps = {
        onItemClick: (item) => {
            alert(`${item.title} Clicked`);
        },
        dataToItemMapping: {
            id: 'id',
            title: 'title',
            message: 'message',
        },
        dataApiUrl: '/test/infinitescrolllistview/fakedata',
        dataLimit: 5,
        dataOffset: 0,
        height: '400px',
    };
    const merged = { ...defaultProps, ...props };
    return render(<InfiniteScrollListView {...merged} />);
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot Testing
    it('Snapshot Testing', async () => {
        const { asFragment } = renderComponent();
        await waitForElementToBeRemoved(screen.getByTestId('islv_isLoadingDiv'));
        expect(asFragment()).toMatchSnapshot();
    });
});

// 2. Test API
describe('Testing API Fetch Logic', () => {
    // fail to load data as end point can't be hit
    it('Invalid API', async () => {
        console.error = jest.fn(); // disable console.error
        renderComponent({ dataApiUrl: '/test/infinitescrolllistview/invalid' });
        await waitForElementToBeRemoved(screen.getByTestId('islv_isLoadingDiv'));
        expect(screen.getByTestId('islv_errorDiv')).toBeInTheDocument();
    });

    // api returns empty list
    it('Empty List', async () => {
        renderComponent({ dataApiUrl: '/test/infinitescrolllistview/empty' });
        await waitForElementToBeRemoved(screen.getByTestId('islv_isLoadingDiv'));
        expect(screen.getByTestId('islv_endDiv')).toBeInTheDocument();
    });

    // api returns result
    it('default with results', async () => {
        // only renders the first data in the list
        renderComponent({ dataApiUrl: '/test/infinitescrolllistview/fakedata', dataLimit: 1, dataOffset: 0 });
        await waitForElementToBeRemoved(screen.getByTestId('islv_isLoadingDiv'));
        expect(screen.getByText('Alan1')).toBeInTheDocument();
    });
});

// 3. Test Scrolling -- NOT WORKING, seems to have limitation for such testing
// https://github.com/testing-library/react-testing-library/issues/671
// https://github.com/testing-library/react-testing-library/issues/353
describe('Testing API Fetch Logic', () => {
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');

    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 2000 });
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 2000 });
    });

    afterEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
    });

    it('scroll for more data', async () => {
        renderComponent({ dataApiUrl: '/test/infinitescrolllistview/fakedata', dataLimit: 2, dataOffset: 0 });
        await waitForElementToBeRemoved(screen.getByTestId('islv_isLoadingDiv'));
        const div = screen.getByTestId('islv_rootDiv');
        fireEvent.scroll(div, { target: { scrollY: 800 } });
    });
});
