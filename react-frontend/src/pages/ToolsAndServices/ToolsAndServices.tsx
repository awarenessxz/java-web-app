import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSelectedMenuItem } from '../../redux/app/app-action';
import { RootState } from '../../redux/root-reducer';
import { tnsCards } from '../../utils/routing/AppToolsAndServicesCard';
import {
    EuiCard,
    EuiIcon,
    EuiFlexGroup,
    EuiFlexItem,
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageContentBody,
    EuiTitle,
} from '@elastic/eui';

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
                    onClick={() => {
                        goToRoute(item.route);
                    }}
                />
            </EuiFlexItem>
        );
    });

    return (
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageContent>
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiTitle>
                                <h2>Tools & Services</h2>
                            </EuiTitle>
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiPageContentBody>
                        <EuiFlexGroup gutterSize="l">{cardNodes}</EuiFlexGroup>
                    </EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    );
};

export default ToolsAndServices;
