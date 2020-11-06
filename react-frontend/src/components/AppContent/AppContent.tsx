import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type AppContentRouterParams = {
    templateId: string;
};

interface AppContentProps extends RouteComponentProps<AppContentRouterParams> {
    position: number;
}

const AppContent = ({ position = 1, ...props }: AppContentProps): JSX.Element => {
    return (
        <div>
            Hello you are at {position} {props.match.params.templateId}
        </div>
    );
};

export default AppContent;
