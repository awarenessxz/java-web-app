import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { Message } from '@stomp/stompjs';
import loadingGif from '../../assets/loading.gif';
import AppHeader from '../components/AppHeader/AppHeader';
import AnnouncementsConsole from './Admin/AnnouncementsConsole';
import SearchForm from './Search/SearchForm';
import SearchResults from './Search/SearchResults';
import SearchTemplateList from './Search/SearchTemplateList';
import ToolsAndServices from './ToolsAndServices/ToolsAndServices';
import DemoCompLibrary from './ToolsAndServices/DemoCompLibrary';
import DemoMicroFrontend from './ToolsAndServices/DemoMicroFrontend';
import AnnouncementPage from './General/AnnouncementPage';
import ToastHandler from '../utils/ToastHandler';
import { getBrokerUrl } from '../utils/routing/navigation-utils';
import useWebSocket from '../utils/hooks/UseWebSocket';
import { RootState } from '../redux/root-reducer';
import { initBaseApplication } from '../redux/app/app-action';

const App = (): JSX.Element => {
    const isSiteReady = useSelector((state: RootState) => state.app.isSiteReady);
    const dispatch = useDispatch();
    const [stompClient, isWebSocketConnected] = useWebSocket(getBrokerUrl('/websocket'));

    // initial load (load base application state)
    useEffect(() => {
        // sleep for 2 seconds to show the loading component
        setTimeout(() => {
            // initialize base application state
            dispatch(initBaseApplication());
        }, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // connect websocket
    useEffect(() => {
        if (isWebSocketConnected && stompClient !== null) {
            stompClient.subscribe('/topic/announcements', (message: Message) => {
                console.log(message);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWebSocketConnected]);

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
                    <Route exact path="/admin/announcements" component={AnnouncementsConsole} />
                    <Route exact path="/announcements" component={AnnouncementPage} />
                </Switch>
                <ToastHandler />
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
