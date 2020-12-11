export interface ListViewItem {
    id: string;
    title: string;
    message: string;
    displayDateTime: string;
    isFlagged?: string | boolean;
    originalData?: any;
}

export type DataToItemMapping = ListViewItem;

export interface InfiniteScrollListViewProps {
    /** Data to Item Mapping (Refer to Documentation) */
    dataToItemMapping: DataToItemMapping;
    /** Data API URL eg. /api/something (Refer to Documentation) */
    dataApiUrl: string;
    /** Amount of data to fetch per load -- refer to sql LIMIT or Spring Pagination PAGE_SIZE */
    dataLimit: number;
    /** data fetch position -- refer to sql OFFSET or Spring Pagination PAGE_NO */
    dataOffset: number;
    /** data offset increment amount -- refer to sql OFFSET increment or Spring Pagination PAGE_NO increment */
    dataOffsetIncrement: number;
    /** [OPTIONAL] list of data id which indicates if isFlag should be disabled (typically for read/unread behaviour) */
    dataIsFlaggedReadList?: string[];
    /** message for user when there is no data retrieved from api */
    noDataMsg?: string;
    /** handler for when item in list is clicked */
    onItemClick: (item: any) => void;
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
