export interface ListViewItem {
    id: string;
    title: string;
    message: string;
}

export type DataToItemMapping = ListViewItem;

export interface InfiniteScrollVirtualizedListProps {
    /** Promise<Response> simply refers to the return result of a fetch command in javascript */
    onLoadMoreData: (limit: number, offset: number) => Promise<Response>;
    /** Data to Item Mapping (Refer to Documentation) */
    dataToItemMapping: DataToItemMapping;
    /** The total amount of data to track if data have reached the end */
    totalAmountOfData: number;
    /** Amount of data to fetch per load -- refer to sql LIMIT */
    dataFetchAmount: number; // refer to sql LIMIT (Amount to fetch)
    /** data fetch position -- refer to sql OFFSET */
    dataOffset: number; // refer to sql OFFSET
    /** handler for when item in list is clicked */
    onItemClick: (item: ListViewItem) => void;
}

export interface InfiniteScrollVirtualizedListState {
    error: string | boolean;
    hasMoreData: boolean;
    isLoading: boolean;
    dataLimit: number; // refer to sql LIMIT (Amount to fetch)
    dataOffset: number; // refer to sql OFFSET
    data: ListViewItem[];
}
