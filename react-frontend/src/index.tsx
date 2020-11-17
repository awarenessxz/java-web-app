import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages/App';
import './styles/app.scss';

import store from './redux/redux-store';

const reduxStore = store();
const render = (AppComponent: React.FC): void => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <AppComponent />
        </Provider>,
        document.getElementById('app'),
    );
};

// renders application on first load
render(App);

// webpack dev server : Hot Module Replacement
if (module.hot) {
    module.hot.accept('./pages/App', () => {
        render(App);
    });
}
