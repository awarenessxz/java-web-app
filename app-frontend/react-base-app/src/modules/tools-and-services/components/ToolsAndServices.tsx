import React from 'react';
import { useHistory } from 'react-router-dom';
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import AppContent from '../../app/components/AppContent/AppContent';
import { tnsCards } from '../../../config/app-tools-and-services-cards-config';

const ToolsAndServices = (): JSX.Element => {
    const history = useHistory();

    const cardNodes = tnsCards.map((item, index) => {
        return (
            <EuiFlexItem key={index} grow={false}>
                <EuiCard
                    icon={item.iconType ? <EuiIcon size="xxl" type={item.iconType} /> : undefined}
                    title={item.title}
                    description={item.description}
                    betaBadgeLabel={item.betaBadgeLabel}
                    betaBadgeTooltipContent={item.betaBadgeTooltipContent}
                    onClick={(): void => history.push(item.route)}
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
