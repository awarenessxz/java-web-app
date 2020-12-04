import React, { Fragment, useEffect, useState } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    InfiniteScrollVirtualizedListProps,
    InfiniteScrollVirtualizedListState,
    ListViewItem,
} from './InfiniteScrollVirtualizedList.types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: 400,
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

/**
 * Infinite Scroll List View using React-Window
 */
const InfiniteScrollVirtualizedList = (props: InfiniteScrollVirtualizedListProps): JSX.Element => {
    const classes = useStyles();
    const [localState, setLocalState] = useState<InfiniteScrollVirtualizedListState>({
        error: false,
        hasMoreData: false,
        isLoading: true,
        dataLimit: props.dataFetchAmount,
        dataOffset: props.dataOffset,
        data: [],
    });

    useEffect(() => {
        console.log('Using Effect');
        if (localState.isLoading) {
            console.log('Loading Data');
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

    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const itemCount = localState.hasMoreData ? localState.data.length + 1 : localState.data.length;

    // Every row is loaded except for our loading indicator row.
    const isItemLoaded = (index: number): boolean => {
        console.log(
            'IS Item Loaded? -- ',
            index,
            localState.hasMoreData,
            localState.data.length,
            !localState.hasMoreData || index < localState.data.length,
        );
        return !localState.hasMoreData || index < localState.data.length;
    };

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const loadMoreItems = async (startIndex: number, stopIndex: number) => {
        console.log('Loading More Item Function is called!!', startIndex, stopIndex);
        if (!localState.isLoading) {
            setLocalState({ ...localState, isLoading: true });
        }
    };

    const renderItem = (listChildComponentProps: ListChildComponentProps): JSX.Element => {
        const { index, style } = listChildComponentProps;

        let content;
        if (!isItemLoaded(index)) {
            return <div style={style}>Loading...</div>;
        } else {
            return (
                <Fragment key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemText primary={`${index} is here`} secondary="something" />
                    </ListItem>
                    <Divider component="li" />
                </Fragment>
            );
        }
    };

    return (
        <div style={{ height: '50px' }}>
            <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
                {({ onItemsRendered, ref }) => (
                    <div className={classes.root}>
                        <FixedSizeList
                            className="List"
                            itemCount={itemCount}
                            itemSize={30}
                            height={500}
                            width={500}
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                        >
                            {renderItem}
                        </FixedSizeList>
                    </div>
                )}
            </InfiniteLoader>
            {localState.error && <div style={{ color: '#900' }}>{localState.error}</div>}
        </div>
    );
};

export default InfiniteScrollVirtualizedList;
