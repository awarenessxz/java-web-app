import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AppContent from '../../components/AppContent/AppContent';

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

    return <AppContent title="Search Form">{content()}</AppContent>;
};

export default SearchForm;
