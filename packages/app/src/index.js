import React from 'react';
import ReactDOM from 'react-dom';
// import { register as registerServiceWorker } from 'lib/serviceWorker';
import { unregister as registerServiceWorker } from 'lib/serviceWorker';
import App from './app';
import { translationMessages } from './i18n';

function initApplication() {
  const render = (messages) =>
    ReactDOM.render(<App messages={messages} />, document.getElementById('root'));

  // Hot reloadable translation json files
  if (module.hot) {
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept('./i18n', () => {
      render(translationMessages);
    });
  }

  // Chunked polyfill for browsers without Intl support
  if (!window.Intl) {
    new Promise((resolve) => {
      resolve(import('intl'));
    })
      .then(() =>
        Promise.all([
          import('intl/locale-data/jsonp/en.js'),
          import('intl/locale-data/jsonp/es.js'),
        ])
      )
      .then(() => render(translationMessages))
      .catch((err) => {
        throw err;
      });
  } else {
    render(translationMessages);
  }

  registerServiceWorker();
}

initApplication();
