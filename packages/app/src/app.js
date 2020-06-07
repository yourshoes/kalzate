/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
// import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
// import { hot } from 'react-hot-loader';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';
// import App from 'containers/AppDesktop';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Import Theme Provider
import ThemeProvider from 'containers/ThemeProvider';

// // Load the favicon, the manifest.json file and the .htaccess file
// /* eslint-disable import/no-unresolved, import/extensions */
// import '!file-loader?name=[name].[ext]!./favicon.ico';
// import '!file-loader?name=[name].[ext]!./manifest.json';
// import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';
// import configureStore from './store.desktop';

// Import CSS reset and Global Styles
import './global-styles';

// Import root routes
import createRoutes from './routes';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const routerHistory = browserHistory;
const store = configureStore(initialState, routerHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(routerHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

export default class Main extends React.Component {
  render() {
    const messages = this.props.messages;

    return (
      <Provider store={store}>
        <ThemeProvider>
          <LanguageProvider messages={messages}>
            <Router
              history={history}
              routes={rootRoute}
              render={
                // Scroll to top when going to a new page, imitating default browser
                // behaviour
                applyRouterMiddleware(useScroll())
              }
            />
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

// export default (process.env.NODE_ENV === 'development' ? hot(module)(Main) : Main);
