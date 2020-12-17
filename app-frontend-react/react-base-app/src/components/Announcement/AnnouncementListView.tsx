import React, { useRef } from 'react';
import { InfiniteScrollListView } from 'react-component-library';
import { EuiPage, EuiPageBody, EuiPageSideBar } from '@elastic/eui';
import { Editor } from '@tinymce/tinymce-react';
import { AnnouncementEntity } from '../../types/api/announcement-api.types';

const AnnouncementListView = (): JSX.Element => {
    const editorRef = useRef(null);

    const updateContent = (content: string): void => {
        if (editorRef && editorRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { editor } = editorRef.current;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            editor.setContent(content);
        }
    };

    return (
        <EuiPage style={{ padding: 0 }}>
            <EuiPageSideBar style={{ minWidth: '250px' }}>
                <InfiniteScrollListView
                    dataApiUrl="/api/announcements/all/page"
                    dataLimit={5}
                    dataOffset={0}
                    dataOffsetIncrement={1}
                    onItemClick={(item: AnnouncementEntity): void => updateContent(item.content)}
                    dataToItemMapping={{
                        id: 'id',
                        title: 'announcementType',
                        message: 'title',
                        displayDateTime: 'creationDate',
                        isFlagged: 'activeFlag',
                    }}
                    dataIsFlaggedReadList={[]}
                    height="650px"
                />
            </EuiPageSideBar>
            <EuiPageBody component="div">
                <Editor
                    initialValue=""
                    init={{
                        height: '650px',
                        toolbar: false,
                        menubar: false,
                        statusbar: false,
                        skins: false,
                        readonly: true,
                    }}
                    disabled={true}
                    ref={editorRef}
                />
            </EuiPageBody>
        </EuiPage>
    );
};

export default AnnouncementListView;
