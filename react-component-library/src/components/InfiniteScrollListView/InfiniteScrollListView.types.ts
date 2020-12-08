export interface ListViewItem {
    id: string;
    title: string;
    message: string;
}

export type DataToItemMapping = ListViewItem;

export interface InfiniteScrollListViewProps {
    /** Data to Item Mapping (Refer to Documentation) */
    dataToItemMapping: DataToItemMapping;
    /** Data API URL eg. /api/something (Refer to Documentation) */
    dataApiUrl: string;
    /** Amount of data to fetch per load -- refer to sql LIMIT */
    dataLimit: number; // refer to sql LIMIT (Amount to fetch)
    /** data fetch position -- refer to sql OFFSET */
    dataOffset: number; // refer to sql OFFSET
    /** handler for when item in list is clicked */
    onItemClick: (item: ListViewItem) => void;
    /** height */
    height: string;
    /** width */
    width?: string;
}

export interface InfiniteScrollListViewState {
    dataOffset: number; // refer to sql OFFSET
    isLoading: boolean; // loading new data
    hasNewData: boolean; // new data loaded -- determines if there are more data
    error: string | boolean; // loading error
    data: ListViewItem[];
    triggerScrollRegister: boolean; // toggle to trigger useEffect to register scroll event
}
