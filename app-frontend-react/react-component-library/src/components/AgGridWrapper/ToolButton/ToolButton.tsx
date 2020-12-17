import React, { Fragment, useEffect, useRef, useState } from 'react';

// MaterialUI
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';

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
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleDropdownToggle = (): void => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleCloseDropdown = (event?: React.MouseEvent<EventTarget>): void => {
        if (event) {
            if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
                return;
            }
        }
        setOpen(false);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current && !open) {
            if (anchorRef.current !== null) {
                anchorRef.current.focus();
            }
        }
        prevOpen.current = open;
    }, [open]);

    const renderButtonWithBadge = (): JSX.Element => {
        if (buttonTypeProps === undefined || buttonTypeProps.badgeCount === undefined) {
            throw new Error('Please provide buttonTypeProps.badgeCount properties');
        }

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

    const renderButtonWithMenu = (): JSX.Element => {
        if (buttonTypeProps === undefined || buttonTypeProps.menuItems === undefined) {
            throw new Error('Please provide buttonTypeProps.menuItems properties');
        }

        return (
            <Fragment>
                <Tooltip title={tooltipMsg}>
                    <span>
                        <IconButton
                            ref={anchorRef}
                            aria-label={tooltipMsg}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            onClick={handleDropdownToggle}
                            disabled={disabled}
                        >
                            {icon}
                        </IconButton>
                    </span>
                </Tooltip>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                    {({ TransitionProps, placement }): JSX.Element => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseDropdown}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow">
                                        {buttonTypeProps.menuItems !== undefined &&
                                            buttonTypeProps.menuItems.map((item, idx) => {
                                                return (
                                                    <MenuItem
                                                        key={idx}
                                                        onClick={(e): void => {
                                                            onClick(idx);
                                                            handleCloseDropdown(e);
                                                        }}
                                                    >
                                                        {item}
                                                    </MenuItem>
                                                );
                                            })}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Fragment>
        );
    };

    const renderButtonWithDropdown = (): JSX.Element => {
        if (buttonTypeProps === undefined || buttonTypeProps.dropdownContent === undefined) {
            throw new Error('Please provide buttonTypeProps.dropdownContent properties');
        }

        const id = open ? 'transitions-popper' : undefined;
        return (
            <Fragment>
                <Tooltip title={tooltipMsg}>
                    <span>
                        <IconButton
                            ref={anchorRef}
                            aria-label={tooltipMsg}
                            aria-describedby={id}
                            aria-haspopup="true"
                            onClick={handleDropdownToggle}
                            disabled={disabled}
                        >
                            {icon}
                        </IconButton>
                    </span>
                </Tooltip>
                <Popper id={id} open={open} anchorEl={anchorRef.current} transition>
                    <Paper elevation={3} style={{ padding: '20px', border: '1px solid' }}>
                        {React.cloneElement(buttonTypeProps.dropdownContent, {
                            onClick: (params: any) => {
                                onClick(params);
                                handleCloseDropdown();
                            },
                        })}
                    </Paper>
                </Popper>
            </Fragment>
        );
    };

    const renderSwitchButton = (): JSX.Element => {
        if (
            buttonTypeProps === undefined ||
            buttonTypeProps.switchGroup === undefined ||
            buttonTypeProps.switchIsChecked === undefined
        ) {
            throw new Error(
                'Please provide buttonTypeProps.switchGroup and buttonTypeProps.switchIsChecked properties',
            );
        }

        return (
            <Tooltip title={tooltipMsg}>
                <span>
                    <Switch
                        color="primary"
                        name={buttonTypeProps.switchGroup}
                        onChange={onClick}
                        checked={buttonTypeProps.switchIsChecked}
                        disabled={disabled}
                    />
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
            case ToolButtonTypes.menu:
                return renderButtonWithMenu();
            case ToolButtonTypes.dropdown:
                return renderButtonWithDropdown();
            case ToolButtonTypes.switch:
                return renderSwitchButton();
            case ToolButtonTypes.normal:
            default:
                return renderNormalButton();
        }
    };

    return <Fragment>{renderButton()}</Fragment>;
};

export default ToolButton;
