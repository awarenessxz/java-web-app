import React from 'react';
import { EuiEmptyPrompt } from '@elastic/eui';

const PageServerError = (
    message = 'There is an error with the server! Please refresh or try again later!',
): JSX.Element => {
    return (
        <EuiEmptyPrompt
            iconType="faceSad"
            title={<h2>500 - Server Error</h2>}
            titleSize="l"
            body={<div>{message}</div>}
        />
    );
};

export default PageServerError;
