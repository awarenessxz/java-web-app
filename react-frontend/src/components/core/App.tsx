import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppContent from './AppContent';

const App = (): JSX.Element => {
    return (
        <Router>
            <AppHeader />
            <Switch>
                <Route exact path="/" component={AppContent} />
            </Switch>
        </Router>
    );
};

export default App;
