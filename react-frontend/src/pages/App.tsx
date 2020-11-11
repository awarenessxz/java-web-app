// ******************************************************************************* React
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
// ******************************************************************************* Redux Actions
import { RootState } from '../redux/root-reducer';
import { initMenuItems } from '../redux/app/app-action';
// ******************************************************************************* Utility Functions
import { generateMenuItemMapping } from '../utils/routing/AppMenuItems';
// ******************************************************************************* Components / Pages
import loadingGif from '../../assets/loading.gif';
import AppHeader from '../components/AppHeader/AppHeader';
import SearchForm from './Search/SearchForm';
import SearchResults from './Search/SearchResults';
import SearchTemplateList from './Search/SearchTemplateList';
import ToolsAndServices from './ToolsAndServices/ToolsAndServices';
import DemoCompLibrary from './ToolsAndServices/DemoCompLibrary';
import DemoMicroFrontend from './ToolsAndServices/DemoMicroFrontend';

const App = (): JSX.Element => {
    const [isSiteReady, setSiteReadyState] = useState(false);
    const isMenuLoaded = useSelector((state: RootState) => state.app.isMenuLoaded);
    const dispatch = useDispatch();

    const getCurrentRoute = (): string => {
        const route = window.location.hash.replace(/#/, '');
        if (route === '') {
            return '/'; // "website.com/#/" ---> this will give empty string
        }
        return route;
    };

    // initial load (set application state)
    useEffect(() => {
        // initialize menu items
        const menuItemMapping = generateMenuItemMapping();
        const selectedMenuItem = menuItemMapping[getCurrentRoute()];
        dispatch(initMenuItems(menuItemMapping, selectedMenuItem));
    }, []);

    // listener to wait for base application state to be fully loaded
    useEffect(() => {
        // sleep for 5 seconds to show the loading component
        setTimeout(() => {
            const isReady = isMenuLoaded;
            if (isReady) {
                setSiteReadyState(true);
            }
        }, 1000);
    }, [isMenuLoaded]);

    if (isSiteReady) {
        return (
            <Router>
                <AppHeader />
                <Switch>
                    <Route exact path="/" component={SearchForm} />
                    <Route exact path="/templates" component={SearchTemplateList} />
                    <Route
                        path="/templates/:templateId"
                        render={(props): JSX.Element => <SearchForm {...props} loadTemplate />}
                    />
                    <Route exact path="/searchResults" component={SearchResults} />
                    <Route exact path="/tns" component={ToolsAndServices} />
                    <Route exact path="/tns/componentLibrary" component={DemoCompLibrary} />
                    <Route exact path="/tns/microFrontend" component={DemoMicroFrontend} />
                </Switch>
            </Router>
        );
    }

    return (
        <div className="loader-container">
            <img src={loadingGif} alt="Loading Website..." />
        </div>
    );
};

export default App;
