import React from 'react';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiTitle,
} from '@elastic/eui';

interface AppContentProps {
    title?: string;
    children?: React.ReactNode;
}

const AppContent = (props: AppContentProps): JSX.Element => {
    const PageHeader = (
        <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
                <EuiTitle>
                    <h2>{props.title}</h2>
                </EuiTitle>
            </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
    );

    return (
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageContent>
                    {props.title && PageHeader}
                    <EuiPageContentBody>{props.children}</EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    );
};

export default AppContent;
