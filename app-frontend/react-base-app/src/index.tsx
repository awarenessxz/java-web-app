import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './modules/app/components/App';
import './assets/styles/app.scss';

import configureStore from './redux/redux-store';

const reduxStore = configureStore();
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
    module.hot.accept('./modules/app/components/App', () => {
        render(App);
    });
}
