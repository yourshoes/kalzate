import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStateProvider } from '/app/state';
import RouterService from '/services/router';
import ThemeService from '/services/theme';
import CssBaseline  from '/global-styles';
import Router from '/components/Router';

export default function App() {
  return (
    <GlobalStateProvider>
      <CssBaseline  />
      <ThemeProvider theme={ThemeService.getDefault()}>
        <Router routes={RouterService.routes} fallback="Loading ..." />
      </ThemeProvider>
    </GlobalStateProvider>
  );
}