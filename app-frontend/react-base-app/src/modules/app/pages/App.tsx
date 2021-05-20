import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { Message } from '@stomp/stompjs';
import loadingGif from '../../../assets/loading.gif';
import AppHeader from '../components/AppHeader/AppHeader';
import PageNotFound from '../../common/pages/PageNotFound';
import ToastHandler from '../../common/utils/ToastHandler';
import { getBrokerUrl } from '../utils/routing/navigation-utils';
import { routes as localRoutes } from '../utils/routing/app-routes';
import ProtectedRoute from '../utils/routing/ProtectedRoute';
import useWebSocket from '../../common/utils/hooks/UseWebSocket';
import { RootState } from '../../../redux/root-reducer';
import { initBaseApplicationAction } from '../redux/app-action';
import { receiveNewAnnouncementAction } from '../../announcement/redux/announcement-action';
import { AnnouncementEntity } from '../../announcement/api/announcement-api.types';

const App = (): JSX.Element => {
    const isSiteReady = useSelector((state: RootState) => state.app.isSiteReady);
    const dispatch = useDispatch();
    const [stompClient, isWebSocketConnected] = useWebSocket(getBrokerUrl('/websocket'));
    const routes = [...localRoutes];

    // initial load (load base application state)
    useEffect(() => {
        // sleep for 2 seconds to show the loading component
        setTimeout(() => {
            // initialize base application state
            dispatch(initBaseApplicationAction());
        }, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // connect websocket
    useEffect(() => {
        if (isWebSocketConnected && stompClient !== null) {
            stompClient.subscribe('/topic/announcement/new', (message: Message) => {
                if (message.body) {
                    const announcement: AnnouncementEntity = JSON.parse(message.body);
                    dispatch(receiveNewAnnouncementAction(announcement));
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWebSocketConnected]);

    if (isSiteReady) {
        return (
            <Router>
                <AppHeader />
                <React.Suspense fallback={<div>Loading Routes....</div>}>
                    <Switch>
                        {routes.map((route, idx) => {
                            const { isAdminRoute, ...routerProps } = route;
                            if (isAdminRoute) {
                                return <ProtectedRoute key={idx} {...routerProps} />;
                            }
                            return <Route key={idx} {...routerProps} />;
                        })}
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </React.Suspense>
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
