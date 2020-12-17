import React, { Fragment, useEffect, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { InfiniteScrollListViewProps, InfiniteScrollListViewState, ListViewItem } from './InfiniteScrollListView.types';
import { getDateFromDateTime } from '../../utils/time-formatter';
import styles from './InfiniteScrollListView.module.scss';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listContent: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        listItem: {
            cursor: 'pointer',
        },
        listIcon: {
            paddingTop: '10px',
        },
        listRightContent: {
            textAlign: 'right',
            flex: '0 0 60px',
            paddingTop: '10px',
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
    const [isDataFlagReadList, setIsDataFlagReadList] = useState<string[]>(props.dataIsFlaggedReadList || []);
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
                    const nextData: ListViewItem[] = newData.map((item: any) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        return {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                            id: item[props.dataToItemMapping.id],
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                            title: item[props.dataToItemMapping.title],
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                            message: item[props.dataToItemMapping.message],
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                            displayDateTime: getDateFromDateTime(item[props.dataToItemMapping.displayDateTime]),
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            isFlagged: props.dataToItemMapping.isFlagged
                                ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                  item[props.dataToItemMapping.isFlagged as string]
                                : false,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            originalData: item,
                        };
                    });

                    // Merges the next data into our existing data
                    setLocalState({
                        ...localState,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        hasNewData: nextData.length > 0,
                        isLoading: false,
                        dataOffset: localState.dataOffset + props.dataOffsetIncrement,
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

    const ListContentItem = (item: ListViewItem): JSX.Element => {
        return (
            <Fragment>
                <ListItem
                    alignItems="flex-start"
                    onClick={(): void => {
                        // update isDataReadList
                        setIsDataFlagReadList([...isDataFlagReadList, item.id]);
                        props.onItemClick(item.originalData);
                    }}
                    className={`${classes.listItem} ${
                        item.isFlagged && !isDataFlagReadList.includes(item.id)
                            ? styles.islvIsFlagged
                            : styles.islvIsNotFlagged
                    }`}
                    data-testid={`islv_${item.id}`}
                >
                    <ListItemText primary={item.title} secondary={item.message} />
                    <ListItemText secondary={item.displayDateTime} className={classes.listRightContent} />
                </ListItem>
                <Divider component="li" />
            </Fragment>
        );
    };

    const ListContent = (): JSX.Element => {
        return (
            <Fragment>
                {localState.data.length > 0 ? (
                    <List className={classes.listContent}>
                        {localState.data.map((item, idx) => (
                            <ListContentItem key={idx} {...item} />
                        ))}
                    </List>
                ) : (
                    <Alert data-testid="islv_emptyDiv" severity="success">
                        No Data Available
                    </Alert>
                )}
                {localState.isLoading && <div data-testid="islv_isLoadingDiv">Loading...</div>}
                {!localState.hasNewData && (
                    <Alert data-testid="islv_endDiv" severity="info">
                        --- End of List ---
                    </Alert>
                )}
            </Fragment>
        );
    };

    return (
        <div
            data-testid="islv_rootDiv"
            className={styles.islvRoot}
            style={{ height: props.height, width: props.width }}
            ref={componentRef}
        >
            {localState.error ? (
                <Alert data-testid="islv_errorDiv" severity="error">
                    {localState.error}
                </Alert>
            ) : (
                <ListContent />
            )}
        </div>
    );
};

export default InfiniteScrollListView;
