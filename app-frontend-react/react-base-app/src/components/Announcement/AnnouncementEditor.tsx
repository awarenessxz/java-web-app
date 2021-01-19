import React, { Fragment, useRef, useState } from 'react';
import moment, { Moment } from 'moment';
import { Editor } from '@tinymce/tinymce-react';
import {
    EuiButton,
    EuiDatePicker,
    EuiFieldText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiForm,
    EuiFormRow,
    EuiPanel,
    EuiSelect,
    EuiSpacer,
} from '@elastic/eui';
// Tinymce Imports
import 'tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';

import { AnnouncementEntity } from '../../api/announcement-api.types';
import { fetchBasic, fetchWithJsonBody } from '../../utils/fetch-util';

interface AnnouncementEditorProps {
    announcementInput?: AnnouncementEntity;
}

interface AnnouncementActionResult {
    message: string;
    isError: boolean;
}

const AnnouncementEditor = ({ announcementInput }: AnnouncementEditorProps): JSX.Element => {
    const editorRef = useRef(null);
    const [editMode, setEditMode] = useState<boolean>(!!announcementInput);
    const selectOptions = [
        { value: '[Advisory]', text: 'System Advisory' },
        { value: '[Upgrade/Maintenance]', text: 'System Upgrade / Maintenance' },
    ];
    const [aSelectedType, setSelectedType] = useState(selectOptions[0].value);
    const [aStartDate, setStartDate] = useState<Moment>(
        announcementInput ? moment(announcementInput.startDate) : moment(),
    );
    const [aEndDate, setEndDate] = useState<Moment>(announcementInput ? moment(announcementInput.endDate) : moment());
    const [aTitle, setTitle] = useState(announcementInput ? announcementInput.title : '');
    const [emptyTitleError, setEmptyTitleError] = useState(false);
    const [actionResult, setActionResult] = useState<AnnouncementActionResult>({ message: '', isError: false });

    const resetEditorValues = (): void => {
        setTitle('');
        setStartDate(moment());
        setEndDate(moment());
        setEmptyTitleError(false);
        setSelectedType(selectOptions[0].value);
        setEditMode(false);
        if (editorRef !== null && editorRef.current !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { editor } = editorRef.current;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            editor.setContent('');
        }
    };

    const deleteAnnouncement = (): void => {
        if (announcementInput && announcementInput.id) {
            fetchBasic(`/api/web/announcements/${announcementInput.id}`, 'DELETE')
                .then(() => {
                    setActionResult({ message: 'Announcement Deleted!', isError: false });
                    resetEditorValues();
                })
                .catch(() => {
                    setActionResult({ message: 'Delete Announcement Failed!!', isError: true });
                });
        } else {
            setActionResult({ message: 'Delete Announcement Failed!!', isError: true });
        }
    };

    const updateAnnouncement = (content: string): void => {
        if (editMode && announcementInput && announcementInput.id) {
            const reqBody: AnnouncementEntity = {
                id: announcementInput.id,
                content,
                title: aTitle,
                author: 'authorId',
                announcementType: aSelectedType,
                startDate: aStartDate,
                endDate: aEndDate,
            };
            fetchWithJsonBody(`/api/web/announcements/${announcementInput.id}`, 'PUT', reqBody)
                .then(() => {
                    setActionResult({ message: 'Announcement Modified!', isError: false });
                    resetEditorValues();
                })
                .catch(() => {
                    setActionResult({ message: 'Modifying Announcement Failed!!', isError: true });
                });
        } else {
            setActionResult({ message: 'Modifying Announcement Failed!!', isError: true });
        }
    };

    const createAnnouncement = (content: string): void => {
        const reqBody: AnnouncementEntity = {
            content,
            title: aTitle,
            author: 'authorId',
            announcementType: aSelectedType,
            startDate: aStartDate,
            endDate: aEndDate,
        };
        fetchWithJsonBody('/api/web/announcements/new', 'POST', reqBody)
            .then(() => {
                setActionResult({ message: 'Announcement created!', isError: false });
                resetEditorValues();
            })
            .catch(() => {
                setActionResult({ message: 'Creation of Announcement Failed!!', isError: true });
            });
    };

    const submitAnnouncement = (): void => {
        // validation
        let content = '';
        let isValid = true;
        if (editorRef !== null && editorRef.current !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { editor } = editorRef.current;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
            content = editor.getContent();

            if (!aTitle) {
                isValid = false;
                setEmptyTitleError(true);
            }
        } else {
            isValid = false;
        }

        if (isValid) {
            if (editMode) {
                // update
                updateAnnouncement(content);
            } else {
                createAnnouncement(content);
            }
        } else {
            setActionResult({ message: 'Creation of Announcement Failed!!', isError: true });
        }
    };

    return (
        <div>
            {actionResult.message && (
                <Fragment>
                    <EuiPanel color={actionResult.isError ? 'danger' : 'success'} borderRadius="none" hasShadow={false}>
                        <p>{actionResult.message}</p>
                    </EuiPanel>
                    <EuiSpacer size="l" />
                </Fragment>
            )}
            <EuiFlexGroup>
                <EuiFlexItem grow={1}>
                    <EuiButton
                        title={`${editMode ? 'Modify' : 'Create'} Announcement`}
                        aria-label={`${editMode ? 'Modify' : 'Create'} Announcement`}
                        iconType="push"
                        onClick={submitAnnouncement}
                        style={{ height: '100%' }}
                    >
                        {`${editMode ? 'Modify' : 'Create'} Announcement`}
                    </EuiButton>
                    {editMode && (
                        <Fragment>
                            <EuiSpacer size="l" />
                            <EuiButton
                                size="s"
                                color="danger"
                                title="Delete Announcement"
                                aria-label="Delete Announcement"
                                iconType="crossInACircleFilled"
                                onClick={deleteAnnouncement}
                            >
                                Delete Announcement
                            </EuiButton>
                        </Fragment>
                    )}
                </EuiFlexItem>
                <EuiFlexItem grow={8}>
                    <EuiForm>
                        <EuiFormRow label="Announcement Title" fullWidth={true}>
                            <EuiFieldText
                                fullWidth={true}
                                isInvalid={emptyTitleError}
                                value={aTitle}
                                onChange={(e): void => setTitle(e.target.value)}
                            />
                        </EuiFormRow>

                        <EuiSpacer size="l" />

                        <EuiFormRow label="Announcement Type" fullWidth={true}>
                            <EuiSelect
                                id="selectType"
                                options={selectOptions}
                                value={aSelectedType}
                                onChange={(e): void => setSelectedType(e.target.value)}
                                aria-label="select announcement type"
                            />
                        </EuiFormRow>

                        <EuiSpacer size="l" />

                        <EuiFlexGroup>
                            <EuiFlexItem>
                                <EuiFormRow label="Notifications Period (Start)">
                                    <EuiDatePicker
                                        selected={aStartDate}
                                        onChange={(date): void => {
                                            if (date !== null) {
                                                setStartDate(date);
                                            }
                                        }}
                                    />
                                </EuiFormRow>
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <EuiFormRow label="Notifications Period (End)">
                                    <EuiDatePicker
                                        selected={aEndDate}
                                        onChange={(date): void => {
                                            if (date !== null) {
                                                setEndDate(date);
                                            }
                                        }}
                                    />
                                </EuiFormRow>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiForm>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            <Editor
                initialValue={editMode && announcementInput ? announcementInput.content : ''}
                init={{
                    height: 500,
                    menubar: false,
                    skins: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                }}
                ref={editorRef}
            />
        </div>
    );
};

export default AnnouncementEditor;
