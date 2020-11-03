import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    EuiCollapsibleNav,
    EuiCollapsibleNavGroup,
    EuiFlexItem,
    EuiHeaderSectionItemButton,
    EuiShowFor,
    EuiListGroupItem,
    EuiIcon,
    EuiSideNav,
} from '@elastic/eui';
import { RootState } from '../../redux/root-reducer';

const AppSidebar = (): JSX.Element => {
    const [navIsOpen, setIsNavOpen] = useState(false);
    const [navIsDocked, setIsNavDocked] = useState(false);
    const selectedMenuItem = useSelector((state: RootState) => state.app.selectedMenuItem);

    const createItem = (name, data = {}) => {
        // NOTE: Duplicate `name` values will cause `id` collisions.
        return {
            ...data,
            id: name,
            name,
            isSelected: selectedMenuItem === name,
            // onClick: () => selectItem(name),
        };
    };

    const sideNav = [
        createItem('Elasticsearch', {
            icon: <EuiIcon type="logoElasticsearch" />,
            items: [
                createItem('Data sources'),
                createItem('Users'),
                createItem('Roles'),
                createItem('Watches'),
                createItem('Extremely long title will become truncated when the browser is narrow enough'),
            ],
        }),
        createItem('Kibana', {
            icon: <EuiIcon type="logoKibana" />,
            items: [
                createItem('Advanced settings', {
                    items: [
                        createItem('General'),
                        createItem('Timelion', {
                            items: [
                                createItem('Time stuff', {
                                    icon: <EuiIcon type="clock" />,
                                }),
                                createItem('Lion stuff', {
                                    icon: <EuiIcon type="stats" />,
                                }),
                            ],
                        }),
                        createItem('Visualizations'),
                    ],
                }),
                createItem('Index Patterns'),
                createItem('Saved Objects'),
                createItem('Reporting'),
            ],
        }),
        createItem('Logstash', {
            icon: <EuiIcon type="logoLogstash" />,
            items: [createItem('Pipeline viewer')],
        }),
    ];

    return (
        <EuiCollapsibleNav
            id="collapsibleNavSideBar"
            aria-label="Main navigation"
            isOpen={navIsOpen}
            isDocked={navIsDocked}
            button={
                <EuiHeaderSectionItemButton
                    aria-label="Toggle main navigation"
                    onClick={(): void => setIsNavOpen(!navIsOpen)}
                >
                    <EuiIcon type={'menu'} size="m" aria-hidden="true" />
                </EuiHeaderSectionItemButton>
            }
            showCloseButton={false}
        >
            <EuiFlexItem className="eui-yScroll">
                <EuiSideNav items={sideNav} style={{ padding: '16px' }} />

                <EuiShowFor sizes={['l', 'xl']}>
                    <EuiCollapsibleNavGroup>
                        <EuiListGroupItem
                            size="xs"
                            color="subdued"
                            label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
                            onClick={(): void => {
                                setIsNavDocked(!navIsDocked);
                            }}
                            iconType={navIsDocked ? 'lock' : 'lockOpen'}
                        />
                    </EuiCollapsibleNavGroup>
                </EuiShowFor>
            </EuiFlexItem>
        </EuiCollapsibleNav>
    );
};

export default AppSidebar;
