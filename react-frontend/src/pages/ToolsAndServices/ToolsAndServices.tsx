import React from 'react';
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
    const icons = ['dashboard', 'monitoring', 'watches'];
    const badges = [undefined, 'Beta', 'Lab'];

    const cardNodes = icons.map((item, index) => {
        return (
            <EuiFlexItem key={index}>
                <EuiCard
                    icon={<EuiIcon size="xxl" type={`${item}App`} />}
                    title={`Kibana ${item}`}
                    description="Example of a card's description. Stick to one or two sentences."
                    betaBadgeLabel={badges[index]}
                    betaBadgeTooltipContent={
                        badges[index] ? 'This module is not GA. Please help us by reporting any bugs.' : undefined
                    }
                    onClick={() => {}}
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
