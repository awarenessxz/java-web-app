import React, { Fragment, useEffect, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { InfiniteScrollListViewProps, InfiniteScrollListViewState, ListViewItem } from './InfiniteScrollListView.types';

/**
 * Infinite Scroll List View
 */
const InfiniteScrollListView = (props: InfiniteScrollListViewProps): JSX.Element => {
    const [localState, setLocalState] = useState<InfiniteScrollListViewState>({
        error: false,
        hasMoreData: false,
        isLoading: true,
        dataLimit: props.dataFetchAmount,
        dataOffset: props.dataOffset,
        data: [],
    });
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (localState.isLoading) {
            props
                .onLoadMoreData(localState.dataLimit, localState.dataOffset)
                .then((res) => res.json())
                .then((newData) => {
                    // map the data to item
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                    const nextData: ListViewItem[] = newData.map((item: any) => ({
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                        id: item[props.dataToItemMapping.id],
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                        title: item[props.dataToItemMapping.title],
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                        message: item[props.dataToItemMapping.message],
                    }));

                    // Merges the next data into our existing data
                    setLocalState({
                        ...localState,
                        hasMoreData: localState.data.length < props.totalAmountOfData,
                        isLoading: false,
                        dataOffset: localState.dataOffset + localState.dataLimit,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        data: [...localState.data, ...nextData],
                    });
                })
                .catch((err) => {
                    setLocalState({
                        ...localState,
                        isLoading: false,
                        error: 'Fail to Load More Data.',
                    });
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localState]);

    const loadData = debounce(() => {
        setLocalState({ ...localState, isLoading: true });
    }, 100);

    const handleOnScroll = (e): void => {
        const div = componentRef.current;
        const target = e.target;
        if (div != null) {
            if (target.scrollHeight - target.scrollTop === target.clientHeight) {
                loadData();
            }
        }
    };

    useEffect(() => {
        const div = componentRef.current;
        // subscribe event
        if (div != null) {
            div.addEventListener('scroll', handleOnScroll);
        }
        return (): void => {
            // unsubscribe event
            if (div != null) {
                div.removeEventListener('scroll', handleOnScroll);
            }
        };
    }, []);

    // Binds our scroll event handler
    /* window.onscroll = debounce(() => {
        // Bails early if:
        // * there's an error
        // * it's already loading
        // * there's nothing left to load
        if (localState.error || localState.isLoading || !localState.hasMoreData) return;

        // Checks that the page has scrolled to the bottom
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadData();
        }
    }, 100); */

    return (
        <div style={{ overflowY: 'scroll', height: '300px' }} ref={componentRef}>
            <h1>Infinite Users!</h1>
            <p>Scroll down to load more!!</p>
            {localState.data.map((item, idx) => (
                <Fragment key={idx}>
                    <hr />
                    <div style={{ display: 'flex' }} onClick={(): void => props.onItemClick(item)}>
                        <div>
                            <h2 style={{ marginTop: 0 }}>{item.title}</h2>
                            <p>Email: {item.message}</p>
                        </div>
                    </div>
                </Fragment>
            ))}
            <hr />
            {localState.error && <div style={{ color: '#900' }}>{localState.error}</div>}
            {localState.isLoading && <div>Loading...</div>}
            {!localState.hasMoreData && <div>You did it! You reached the end!</div>}
        </div>
    );
};

export default InfiniteScrollListView;
