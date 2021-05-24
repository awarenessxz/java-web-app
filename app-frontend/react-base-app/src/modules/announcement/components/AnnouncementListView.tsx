import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InfiniteScrollListView } from 'react-component-library';
import {
    EuiButton,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageSideBar,
    EuiTitle,
} from '@elastic/eui';
import { Editor } from '@tinymce/tinymce-react';
import { AnnouncementEntity } from '../../../types/announcement-api.types';
import { fetchBasic } from '../../common/utils/fetch-util';
import useLocalStorageState from '../../common/hooks/UseLocalStorageState';
import { setShowAnnouncementAction } from '../redux/announcement-action';

interface AnnouncementListViewProps {
    isAdminView?: boolean;
    handleChangeTab?: (idx: number, announcement?: AnnouncementEntity) => void; // used by AnnouncementConsole for admin users only... (very specific)
}

const AnnouncementListView = ({ isAdminView = false, handleChangeTab }: AnnouncementListViewProps): JSX.Element => {
    const [readAnnouncementIds, setAnnouncementIdsInLocalStorage] = useLocalStorageState('readAnnouncementIds', '[]');
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementEntity | undefined>(undefined);
    const editorRef = useRef(null);
    const dispatch = useDispatch();

    const updateContent = (item: AnnouncementEntity): void => {
        // display content
        if (editorRef && editorRef.current) {
            // @ts-ignore
            const { editor } = editorRef.current;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            editor.setContent(item.content);
        }
        setSelectedAnnouncement(item);
        // update readAnnouncementIds in localstorage
        if (item.activeFlag) {
            if (readAnnouncementIds !== null && item.id !== undefined) {
                const readAnnouncementIdsArr: string[] = JSON.parse(readAnnouncementIds) as string[];
                if (!readAnnouncementIdsArr.includes(item.id)) {
                    readAnnouncementIdsArr.push(item.id);
                    setAnnouncementIdsInLocalStorage(JSON.stringify(readAnnouncementIdsArr));
                    dispatch(setShowAnnouncementAction(false)); // close announcement pop up (hackish fix)
                }
            }
        }
    };

    const deleteAnnouncement = (item: AnnouncementEntity): void => {
        if (item.id) {
            fetchBasic(`/api/web/announcements/${item.id}`, 'DELETE').catch((e) => console.log(e));
        }
    };

    const editAnnouncement = (item: AnnouncementEntity): void => {
        if (handleChangeTab) {
            handleChangeTab(1, item);
        }
    };

    return (
        <EuiPage style={{ padding: 0 }}>
            <EuiPageSideBar style={{ minWidth: '250px' }}>
                <InfiniteScrollListView
                    dataApiUrl="/api/web/announcements/all/page"
                    dataLimit={5}
                    dataOffset={0}
                    dataOffsetIncrement={1}
                    onItemClick={(item: AnnouncementEntity): void => updateContent(item)}
                    dataToItemMapping={{
                        id: 'id',
                        title: 'announcementType',
                        message: 'title',
                        displayDateTime: 'creationDate',
                        isFlagged: 'activeFlag',
                    }}
                    dataIsFlaggedReadList={
                        readAnnouncementIds !== null ? (JSON.parse(readAnnouncementIds) as string[]) : []
                    }
                    height="670px"
                    onDeleteBtnClick={isAdminView ? deleteAnnouncement : undefined}
                    onEditBtnClick={isAdminView ? editAnnouncement : undefined}
                />
            </EuiPageSideBar>
            <EuiPageBody component="div">
                <EuiPageContent paddingSize="l">
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiTitle>
                                <h2>
                                    {selectedAnnouncement &&
                                        `${selectedAnnouncement.announcementType} ${selectedAnnouncement.title}`}
                                </h2>
                            </EuiTitle>
                        </EuiPageContentHeaderSection>
                        {isAdminView && selectedAnnouncement && (
                            <EuiPageContentHeaderSection>
                                <EuiFlexGroup gutterSize="s" alignItems="center">
                                    <EuiFlexItem grow={false}>
                                        <EuiButton fill onClick={(): void => editAnnouncement(selectedAnnouncement)}>
                                            Edit
                                        </EuiButton>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiPageContentHeaderSection>
                        )}
                    </EuiPageContentHeader>
                    <EuiPageContentBody>
                        <Editor
                            id="tinymceEditor"
                            initialValue=""
                            init={{
                                height: '550px',
                                toolbar: false,
                                menubar: false,
                                statusbar: false,
                                skins: false,
                                readonly: true,
                                setup: (ed): void => {
                                    // https://github.com/tracim/tracim/blob/develop/frontend/src/util/tinymceInit.js
                                    // this is a hack to allow cypress testing for tinymce as tinymce is not loaded in time for the test
                                    ed.on('init', (args) => {
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                        const event = new CustomEvent('tinymceViewLoaded', { detail: {} });
                                        document.dispatchEvent(event);
                                        // @ts-ignore
                                        window.testTinymceView = editorRef.current;
                                    });
                                },
                            }}
                            disabled={true}
                            ref={editorRef}
                        />
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    );
};

export default AnnouncementListView;
