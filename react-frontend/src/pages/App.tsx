import React, { useEffect, useState } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import AppHeader from '../components/AppHeader/AppHeader';
import AppContent from '../components/AppContent/AppContent';

const App = (): JSX.Element => {
    const [isSiteReady, setSiteReadyState] = useState(false);

    useEffect(() => {
        // sleep for 5 seconds to show the loading component
        setTimeout(() => {
            setSiteReadyState(true);
        }, 5000);
    }, []);

    if (isSiteReady) {
        return (
            <Router>
                <AppHeader />
                <Switch>
                    <Route exact path="/" component={AppContent} />
                    <Route
                        exact
                        path="/template"
                        render={(props): JSX.Element => <AppContent {...props} position={2} />}
                    />
                    <Route
                        path="/template/:templateId"
                        render={(props): JSX.Element => <AppContent {...props} position={3} />}
                    />
                </Switch>
            </Router>
        );
    }

    return <div>Loading....</div>;
};

export default App;
