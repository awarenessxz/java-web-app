/*
 * Menu Configuration for Tools and Services Cards in ToolAndServices.tsx
 */
import { EuiCardProps } from '@elastic/eui';

export interface TnsCardDetail extends EuiCardProps {
    route: string;
    iconType?: string | undefined; // EUI Icon Type
}

export const tnsCards: TnsCardDetail[] = [
    {
        route: '/tns/componentLibrary',
        title: 'React Component Library',
        iconType: 'canvasApp',
        description: 'Demonstrations of component library capability',
        betaBadgeLabel: 'Beta',
        betaBadgeTooltipContent: 'Still experimenting...',
    },
    {
        route: '/tns/microFrontend',
        title: 'Micro Frontend',
        iconType: 'emsApp',
        description: 'Demonstrations of micro frontend possibility',
        betaBadgeLabel: 'Beta',
        betaBadgeTooltipContent: 'Still experimenting...',
    },
];
