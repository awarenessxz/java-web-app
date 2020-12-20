// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */
import React from 'react';
import { EuiLink, EuiLinkButtonProps } from '@elastic/eui';
import { useHistory } from 'react-router-dom';

interface EuiCustomLinkProps extends EuiLinkButtonProps {
    to: string;
}

// Most of the content of this files are from https://github.com/elastic/eui/blob/master/wiki/react-router.md.
const isModifiedEvent = (event: any): boolean => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const isLeftClickEvent = (event: any): boolean => event.button === 0;

const EuiCustomLink = ({ to, ...props }: EuiCustomLinkProps): JSX.Element => {
    const history = useHistory();

    const onClick = (event: any): void => {
        if (event.defaultPrevented) {
            return;
        }

        // If target prop is set (e.g. to "_blank"), let browser handle link.
        if (event.target.getAttribute('target')) {
            return;
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        // Prevent regular link behavior, which causes a browser refresh.
        event.preventDefault();
        history.push(to);
    };

    return <EuiLink {...props} href={to} onClick={onClick} />;
};

export default EuiCustomLink;
