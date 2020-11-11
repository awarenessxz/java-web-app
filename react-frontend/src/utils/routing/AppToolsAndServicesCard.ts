import { EuiCardProps } from "@elastic/eui";

export interface tnsCardDetail extends EuiCardProps {
    route: string;
    iconType?: string | undefined; // EUI Icon Type
}

export const tnsCards: tnsCardDetail[] = [
    {
        route: '/tns/componentLibrary',
        title: 'React Component Library',
        iconType: 'canvasApp',
        description: 'Demonstrations of component library capability',
        betaBadgeLabel: 'Beta',
        betaBadgeTooltipContent: 'Still experimenting...'
    },
    {
        route: '/tns/microFrontend',
        title: 'Micro Frontend',
        iconType: 'emsApp',
        description: 'Demonstrations of micro frontend possibility',
        betaBadgeLabel: 'Beta',
        betaBadgeTooltipContent: 'Still experimenting...'
    }
];