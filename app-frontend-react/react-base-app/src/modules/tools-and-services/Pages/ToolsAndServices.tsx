import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import AppContent from '../../app/components/AppContent/AppContent';
import { setSelectedMenuItem } from '../../app/redux/app-action';
import { RootState } from '../../../redux/root-reducer';
import { tnsCards } from '../../common/utils/routing/app-tools-and-services-cards-config';

const ToolsAndServices = (): JSX.Element => {
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

    const cardNodes = tnsCards.map((item, index) => {
        return (
            <EuiFlexItem key={index} grow={false}>
                <EuiCard
                    icon={item.iconType ? <EuiIcon size="xxl" type={item.iconType} /> : undefined}
                    title={item.title}
                    description={item.description}
                    betaBadgeLabel={item.betaBadgeLabel}
                    betaBadgeTooltipContent={item.betaBadgeTooltipContent}
                    onClick={(): void => {
                        goToRoute(item.route);
                    }}
                />
            </EuiFlexItem>
        );
    });

    return (
        <AppContent title="Tools & Services">
            <EuiFlexGroup gutterSize="l">{cardNodes}</EuiFlexGroup>
        </AppContent>
    );
};

export default ToolsAndServices;
