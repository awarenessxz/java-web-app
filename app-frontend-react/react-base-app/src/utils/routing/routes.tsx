/*
 * Declares routing configuration for react-router-dom
 */
import React from 'react';
import { RouteProps } from 'react-router-dom';

interface AppRouteProps extends RouteProps {
    isAdminRoute?: boolean;
}

const SearchForm = React.lazy(() => import('../../pages/Search/SearchForm'));
const SearchTemplateList = React.lazy(() => import('../../pages/Search/SearchTemplateList'));
const SearchResults = React.lazy(() => import('../../pages/Search/SearchResults'));
const ToolsAndServices = React.lazy(() => import('../../pages/ToolsAndServices/ToolsAndServices'));
const DemoCompLibrary = React.lazy(() => import('../../pages/ToolsAndServices/DemoCompLibrary'));
const DemoMicroFrontend = React.lazy(() => import('../../pages/ToolsAndServices/DemoMicroFrontend'));
const AnnouncementsConsole = React.lazy(() => import('../../pages/Admin/AnnouncementsConsole'));
const AnnouncementPage = React.lazy(() => import('../../pages/General/AnnouncementPage'));

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
