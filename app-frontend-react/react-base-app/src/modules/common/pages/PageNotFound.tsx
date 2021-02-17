import React from 'react';
import { EuiEmptyPrompt } from '@elastic/eui';
import EuiCustomLink from '../utils/routing/EuiCustomLink';

const PageNotFound = (): JSX.Element => {
    return (
        <EuiEmptyPrompt
            iconType="faceSad"
            title={<h2>404 - Page Not Found</h2>}
            titleSize="l"
            body={
                <div>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    The page you were looking for doesn't exists.
                    <p> You may have mistyped the web address or the page may have moved.</p>
                </div>
            }
            actions={<EuiCustomLink to="/">Go back to home page</EuiCustomLink>}
            data-testid="pageNotFound"
        />
    );
};

export default PageNotFound;
