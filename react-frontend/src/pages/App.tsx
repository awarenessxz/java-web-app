import React, { useEffect, useState } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import loadingGif from '../../assets/loading.gif';
import AppHeader from '../components/AppHeader/AppHeader';
import SearchForm from './Search/SearchForm';
import SearchResults from './Search/SearchResults';
import SearchTemplateList from './Search/SearchTemplateList';
import ToolsAndServices from './ToolsAndServices/ToolsAndServices';

const App = (): JSX.Element => {
    const [isSiteReady, setSiteReadyState] = useState(false);

    useEffect(() => {
        // sleep for 5 seconds to show the loading component
        setTimeout(() => {
            setSiteReadyState(true);
        }, 1000);
    }, []);

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
                    <Route path="/toolsAndServices" component={ToolsAndServices} />
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
