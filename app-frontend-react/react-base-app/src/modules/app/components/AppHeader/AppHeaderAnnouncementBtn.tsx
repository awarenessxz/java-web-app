import React from 'react';
import { EuiHeaderSectionItemButton, EuiIcon } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSelectedMenuItem } from '../../redux/app-action';
import { RootState } from '../../../../redux/root-reducer';

const AppHeaderAnnouncementBtn = (): JSX.Element => {
    const menuItemsMap = useSelector((state: RootState) => state.app.menuItemsMapping);
    const dispatch = useDispatch();
    const history = useHistory();

    const goToRoute = (route: string): void => {
        if (route in menuItemsMap) {
            const menuItem = menuItemsMap[route];
            dispatch(setSelectedMenuItem(menuItem));
            history.push(route);
        }
    };

    return (
        <EuiHeaderSectionItemButton aria-label="Announcement Menu" onClick={(): void => goToRoute('/announcements')}>
            <EuiIcon type="cheer" size="m" />
        </EuiHeaderSectionItemButton>
    );
};

export default AppHeaderAnnouncementBtn;
