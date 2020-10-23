import React, { Fragment } from 'react';

// MaterialUI - Styles
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

// Import Types Definitions / Enums
import { ToolButtonProps, ToolButtonTypes } from './ToolButton.types';

/** *************************************************
 * Main Code
 ************************************************** */

/**
 * Generic Button for Toolbar
 */
const ToolButton = ({
    tooltipMsg = '',
    icon,
    onClick,
    disabled = false,
    buttonType = ToolButtonTypes.normal,
    buttonTypeProps,
}: ToolButtonProps): JSX.Element => {
    const renderButtonWithBadge = (): JSX.Element => {
        return (
            <Tooltip title={tooltipMsg}>
                <span>
                    <IconButton aria-label={tooltipMsg} onClick={onClick} disabled={disabled}>
                        <Badge badgeContent={buttonTypeProps.badgeCount} color="primary">
                            {icon}
                        </Badge>
                    </IconButton>
                </span>
            </Tooltip>
        );
    };

    const renderNormalButton = (): JSX.Element => {
        return (
            <Tooltip title={tooltipMsg}>
                <span>
                    <IconButton aria-label={tooltipMsg} onClick={onClick} disabled={disabled}>
                        {icon}
                    </IconButton>
                </span>
            </Tooltip>
        );
    };

    const renderButton = (): JSX.Element => {
        switch (buttonType) {
            case ToolButtonTypes.badge:
                return renderButtonWithBadge();
            /* case ToolButtonTypes.menu:
                return renderButtonWithMenu();
            case ToolButtonTypes.dropdown:
                return renderButtonWithDropdown();
            case ToolButtonTypes.switch:
                return renderSwitchButton; */
            case ToolButtonTypes.normal:
            default:
                return renderNormalButton();
        }
    };

    return <Fragment>{renderButton()}</Fragment>;
};

export default ToolButton;
