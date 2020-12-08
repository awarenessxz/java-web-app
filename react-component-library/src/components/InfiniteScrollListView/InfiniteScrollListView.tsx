import React, { Fragment, useEffect, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { InfiniteScrollListViewProps, InfiniteScrollListViewState, ListViewItem } from './InfiniteScrollListView.types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflowY: 'scroll',
            width: '100%',
            maxWidth: '36ch',
        },
        listContent: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }),
);

/**
 * Infinite Scroll List View
 */
const InfiniteScrollListView = (props: InfiniteScrollListViewProps): JSX.Element => {
    const classes = useStyles();
    const [localState, setLocalState] = useState<InfiniteScrollListViewState>({
        error: false,
        hasNewData: false,
        isLoading: true,
        dataOffset: props.dataOffset,
        data: [],
        triggerScrollRegister: false,
    });
    const componentRef = useRef<HTMLDivElement>(null);

    // https://www.geeksforgeeks.org/check-whether-html-element-has-scrollbars-using-javascript/
    const componentHasScrollbar = (): boolean => {
        const div = componentRef.current;
        let result = false;
        if (div !== null) {
            result = !!div.scrollTop;
            if (!result) {
                div.scrollTop = 1;
                result = !!div.scrollTop;
                div.scrollTop = 0;
            }
        }
        return result;
    };

    const loadData = debounce(() => {
        console.log('loading more data');
        setLocalState({ ...localState, hasNewData: false, isLoading: true });
    }, 100);

    useEffect(() => {
        if (localState.isLoading) {
            const url = `${props.dataApiUrl}?limit=${props.dataLimit}&offset=${localState.dataOffset}`;
            fetch(url)
                .then((res) => res.json())
                .then((newData) => {
                    // map the data to item
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                    const nextData: ListViewItem[] = newData.data.map((item: any) => ({
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
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        hasNewData: nextData.length > 0,
                        isLoading: false,
                        dataOffset: localState.dataOffset + props.dataLimit,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        data: [...localState.data, ...nextData],
                        triggerScrollRegister: !localState.triggerScrollRegister,
                    });
                })
                .catch((err) => {
                    setLocalState({
                        ...localState,
                        isLoading: false,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                        error: 'Fail to load data',
                        // error: err.message,
                    });
                });
        } else if (!componentHasScrollbar() && localState.hasNewData) {
            // if there are space, but no scrollbar, and new data have been loaded
            // no new data --> means api return us empty []. Two possible scenarios:
            //      1. something might have went wrong, so don't load more data
            //      2. api has nothing to return
            // no scrollbar --> means div is too large, try to load more data to fill it, so that scrollbar appears
            loadData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localState]);

    const handleOnScroll = (e: Event): void => {
        // Bails early if:
        // * there's an error
        // * it's already loading
        // * there's nothing left to load
        if (localState.error || localState.isLoading || !localState.hasNewData) return;

        // Checks that the page has scrolled to the bottom
        const target = e.target as HTMLDivElement;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            loadData();
        }
    };

    // useEffect to register scroll listener, will be trigger whenever state triggerScrollRegister is updated
    useEffect(() => {
        const div = componentRef.current;
        // subscribe event
        if (div != null) {
            // console.log('registering scroll listener');
            div.addEventListener('scroll', handleOnScroll);
        }
        return (): void => {
            // unsubscribe event
            if (div != null) {
                // console.log('unregistering scroll listener');
                div.removeEventListener('scroll', handleOnScroll);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localState.triggerScrollRegister]);

    const ListContent = (): JSX.Element => {
        return (
            <Fragment>
                <List className={classes.listContent}>
                    {localState.data.map((item, idx) => (
                        <Fragment key={idx}>
                            <ListItem alignItems="flex-start" onClick={(): void => props.onItemClick(item)}>
                                <ListItemText primary={item.title} secondary={item.message} />
                            </ListItem>
                            <Divider component="li" />
                        </Fragment>
                    ))}
                </List>
                {localState.isLoading && <div data-testid="islv_isLoadingDiv">Loading...</div>}
                {!localState.hasNewData && <div data-testid="islv_endDiv"> --- End of List --- </div>}
            </Fragment>
        );
    };

    return (
        <div
            data-testid="islv_rootDiv"
            className={classes.root}
            style={{ height: props.height, width: props.width }}
            ref={componentRef}
        >
            {localState.error ? (
                <div data-testid="islv_errorDiv" style={{ color: '#900' }}>
                    --- {localState.error} ---
                </div>
            ) : (
                <ListContent />
            )}
        </div>
    );
};

export default InfiniteScrollListView;
