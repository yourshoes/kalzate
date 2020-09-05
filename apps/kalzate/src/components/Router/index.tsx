import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from '/components/Layout';

const AppRoute = ({ component: Component, ...rest }) => {
  return ( 
    <Route
        {...rest}
        render={(props) => {
        return <Layout>
                <Component {...rest} {...props} />
            </Layout>
            
        }}
    />
  );
}

export default function AppRouter({ routes, fallback }) {
    return ( 
        <Router>
            <Suspense fallback={fallback}>
            <Switch>
                {routes.map((route) => (
                <AppRoute key={route.id} {...route} />
                ))}
            </Switch>
            </Suspense>
        </Router>
    );
}