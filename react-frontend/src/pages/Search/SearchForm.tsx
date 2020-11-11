import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiTitle,
} from '@elastic/eui';

type SearchFormRouterParams = {
    templateId: string;
};

interface SearchFormProps extends RouteComponentProps<SearchFormRouterParams> {
    loadTemplate?: boolean;
}

const SearchForm = ({ loadTemplate = false, ...props }: SearchFormProps): JSX.Element => {
    const content = (): JSX.Element => {
        if (loadTemplate) {
            return <div>Showing Template -- {props.match.params.templateId}</div>;
        }
        return <div>Base Search Form</div>;
    };

    return (
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageContent>
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiTitle>
                                <h2>Search Form</h2>
                            </EuiTitle>
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiPageContentBody>{content()}</EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    );
};

export default SearchForm;
