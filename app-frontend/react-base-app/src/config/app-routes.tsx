/*
 * Declares routing configuration for react-router-dom
 */
import React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';

interface AppRouteProps extends RouteProps {
    isAdminRoute?: boolean;
}

export interface AppRoutesMap {
    [path: string]: AppRouteProps; // ['route'] = MenuItem;
}

const SearchForm = React.lazy(() => import('../modules/search/components/SearchForm'));
const SearchTemplateList = React.lazy(() => import('../modules/search/components/SearchTemplateList'));
const SearchResults = React.lazy(() => import('../modules/search/components/SearchResults'));
const ToolsAndServices = React.lazy(() => import('../modules/tools-and-services/components/ToolsAndServices'));
const DemoCompLibrary = React.lazy(() => import('../modules/tools-and-services/components/DemoCompLibrary'));
const DemoMicroFrontend = React.lazy(() => import('../modules/tools-and-services/components/DemoMicroFrontend'));
const AnnouncementsConsole = React.lazy(() => import('../modules/announcement/components/AnnouncementsConsole'));
const AnnouncementPage = React.lazy(() => import('../modules/announcement/components/AnnouncementPage'));

// eslint-disable-next-line import/prefer-default-export
export const routes: AppRouteProps[] = [
    {
        path: '/',
        exact: true,
        // eslint-disable-next-line react/display-name
        render: (props): JSX.Element => <Redirect to="/search" />,
    },
    {
        path: '/search',
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
        path: '/search/templates',
        component: SearchTemplateList,
        exact: true,
    },
    {
        path: '/search/templates/:templateId',
        // eslint-disable-next-line react/display-name
        render: (props): JSX.Element => <SearchForm {...props} loadTemplate />,
    },
    {
        path: '/search/results',
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
