// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import HomePage from 'containers/HomePage';
import SettingsPage from 'containers/SettingsPage';
import DiscoverPage from 'containers/DiscoverPage';
import TicketsPage from 'containers/TicketsPage';
import NotFoundPage from 'containers/NotFoundPage';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule && componentModule.default ? componentModule.default : componentModule);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        // const importModules = Promise.all([import('containers/HomePage')]);

        const renderRoute = loadModule(cb);

        // importModules.then(([component]) => {
          renderRoute(HomePage);
        // });

        // importModules.catch(errorLoading);
      },
    },
    {
      path: '/settings',
      name: 'settings',
      getComponent(nextState, cb) {
        // const importModules = Promise.all([import('containers/SettingsPage')]);

        const renderRoute = loadModule(cb);

        // importModules.then(([component]) => {
          renderRoute(SettingsPage);
        // });

        // importModules.catch(errorLoading);
      },
    },
    {
      path: '/discover',
      name: 'discover',
      getComponent(nextState, cb) {
        // const importModules = Promise.all([import('containers/DiscoverPage')]);

        const renderRoute = loadModule(cb);

        // importModules.then(([component]) => {
          renderRoute(DiscoverPage);
        // });

        // importModules.catch(errorLoading);
      },
    },
    {
      path: '/tickets(/:id)',
      name: 'tickets',
      getComponent(nextState, cb) {
        // const importModules = Promise.all([import('containers/TicketsPage')]);

        const renderRoute = loadModule(cb);

        // importModules.then(([component]) => {
          renderRoute(TicketsPage);
        // });

        // importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        const renderRoute = loadModule(cb);

        renderRoute(NotFoundPage)
        // import('containers/NotFoundPage')
        //   .then(loadModule(cb))
        //   .catch(errorLoading);
      },
    },
  ];
}
