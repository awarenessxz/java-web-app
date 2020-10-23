import React, { Fragment, useEffect, useRef, useState } from 'react';
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
import {PropTypes} from "@material-ui/core";

interface ToolButtonProps {}

/** *************************************************
 * Main Code
 ************************************************** */

/**
 * Generic Button for Toolbar
 */
const ToolButton = (props: ToolButtonProps) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);

    // return focus to the button when we transitioned from !open -> open
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleDropdownToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleCloseDropdown = (e) => {
        if (e) {
            if (anchorRef.current && anchorRef.current.contains(e.target)) {
                return;
            }
        }
        setOpen(false);
    };

    const handleMenuItemClick = (menuItem) => (e) => {
        props.onClick(menuItem);
        handleCloseDropdown(e);
    };

    const handleOnClickEventFromDropDownContent = (params) => {
        props.onClick(params);
        handleCloseDropdown();
    };

    const renderIcon = () => {
        const Icon = props.icon;
        return <Icon />;
    };

    const renderButtonWithBadge = () => {
        return (
            <Tooltip title={props.tooltipMsg}>
                <span>
                    <IconButton aria-label={props.tooltipMsg} onClick={props.onClick} disabled={props.disabled}>
                        <Badge badgeContent={props.badgeCount} color="primary">
                            {renderIcon()}
                        </Badge>
                    </IconButton>
                </span>
            </Tooltip>
        );
    };

    const renderButtonWithMenu = () => {
        return (
            <Fragment>
                <Tooltip title={props.tooltipMsg}>
                    <span>
                        <IconButton
                            ref={anchorRef}
                            aria-label={props.tooltipMsg}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            onClick={handleDropdownToggle}
                            disabled={props.disabled}
                        >
                            {renderIcon()}
                        </IconButton>
                    </span>
                </Tooltip>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseDropdown}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow">
                                        {props.menuItems.map((item, idx) => {
                                            return (
                                                <MenuItem key={idx} onClick={handleMenuItemClick(item)}>
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

    const renderButtonWithDropdown = () => {
        const id = open ? 'transitions-popper' : undefined;
        return (
            <Fragment>
                <Tooltip title={props.tooltipMsg}>
                    <span>
                        <IconButton
                            ref={anchorRef}
                            aria-label={props.tooltipMsg}
                            aria-describedby={id}
                            aria-haspopup="true"
                            onClick={handleDropdownToggle}
                            disabled={props.disabled}
                        >
                            {renderIcon()}
                        </IconButton>
                    </span>
                </Tooltip>
                <Popper id={id} open={open} anchorEl={anchorRef.current} transition>
                    <Paper elevation={3} style={{ padding: '20px', border: '1px solid' }}>
                        {React.cloneElement(props.dropdownContent, {
                            onClick: handleOnClickEventFromDropDownContent,
                        })}
                    </Paper>
                </Popper>
            </Fragment>
        );
    };

    const renderSwitchButton = () => {
        return (
            <Tooltip title={props.tooltipMsg}>
                <span>
                    <Switch
                        color="primary"
                        name={props.switchGroup}
                        onChange={props.onClick}
                        checked={props.switchIsChecked}
                        disabled={props.disabled}
                    />
                </span>
            </Tooltip>
        );
    };

    const renderNormalButton = () => {
        return (
            <Tooltip title={props.tooltipMsg}>
                <span>
                    <IconButton aria-label={props.tooltipMsg} onClick={props.onClick} disabled={props.disabled}>
                        {renderIcon()}
                    </IconButton>
                </span>
            </Tooltip>
        );
    };

    const renderButton = () => {
        switch (props.buttonType) {
            case 'badge':
                return renderButtonWithBadge();
            case 'menu':
                return renderButtonWithMenu();
            case 'dropdown':
                return renderButtonWithDropdown();
            case 'switch':
                return renderSwitchButton;
            case 'normal':
            default:
                return renderNormalButton();
        }
    };

    return <Fragment>{renderButton()}</Fragment>;
};

ToolButton.defaultProps = {
    buttonType: 'normal',
    disabled: false,
    dropdownContent: <span>Empty</span>,
    switchIsChecked: false,
};

ToolButton.propTypes = {
    /** tool tip message if there is any */
    tooltipMsg: PropTypes.string.isRequired,
    /** icon */
    icon: PropTypes.object.isRequired,
    /** callback */
    onClick: PropTypes.func.isRequired,
    /** disable button */
    disabled: PropTypes.bool,
    /** Button Type */
    buttonType: PropTypes.oneOf(['normal', 'badge', 'menu', 'dropdown']),
    /** badge counter (is Required when buttonType = "badge") */
    badgeCount: PropTypes.number,
    /** menu items (is Required when buttonType = "menu") */
    menuItems: PropTypes.arrayOf(PropTypes.string),
    /** switch group (is required when buttonType = 'switch' */
    switchGroup: PropTypes.string,
    /** switch checked state (is Required when buttonType = 'switch' */
    switchIsChecked: PropTypes.bool,
    /** dropdown Content -- Eg. <ReactComponent /> (is Required when buttonType = "dropdown") */
    dropdownContent: PropTypes.object,
};

export default ToolButton;
