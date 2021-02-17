/*
 * Declares routing configuration for react-router-dom
 */
import React from 'react';
import { RouteProps } from 'react-router-dom';

interface AppRouteProps extends RouteProps {
    isAdminRoute?: boolean;
}

const SearchForm = React.lazy(() => import('../../../search/pages/SearchForm'));
const SearchTemplateList = React.lazy(() => import('../../../search/pages/SearchTemplateList'));
const SearchResults = React.lazy(() => import('../../../search/pages/SearchResults'));
const ToolsAndServices = React.lazy(() => import('../../../tools-and-services/Pages/ToolsAndServices'));
const DemoCompLibrary = React.lazy(() => import('../../../tools-and-services/Pages/DemoCompLibrary'));
const DemoMicroFrontend = React.lazy(() => import('../../../tools-and-services/Pages/DemoMicroFrontend'));
const AnnouncementsConsole = React.lazy(() => import('../../../announcement/pages/AnnouncementsConsole'));
const AnnouncementPage = React.lazy(() => import('../../../announcement/pages/AnnouncementPage'));

// eslint-disable-next-line import/prefer-default-export
export const routes: AppRouteProps[] = [
    {
        path: '/',
        component: SearchForm,
        exact: true,
    },
    {
        isAdminRoute: true,
        path: '/admin/announcements',
        component: AnnouncementsConsole,
        exact: true,
    },
    {
        path: '/templates',
        component: SearchTemplateList,
        exact: true,
    },
    {
        path: '/templates/:templateId',
        // eslint-disable-next-line react/display-name
        render: (props): JSX.Element => <SearchForm {...props} loadTemplate />,
    },
    {
        path: '/searchResults',
        component: SearchResults,
        exact: true,
    },
    {
        path: '/tns',
        component: ToolsAndServices,
        exact: true,
    },
    {
        path: '/tns/componentLibrary',
        component: DemoCompLibrary,
        exact: true,
    },
    {
        path: '/tns/microFrontend',
        component: DemoMicroFrontend,
        exact: true,
    },
    {
        path: '/announcements',
        component: AnnouncementPage,
        exact: true,
    },
];
