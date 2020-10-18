import React, { useReducer, useEffect, useCallback } from 'react';

import thunk from '/app/middleware';
import { hydrate } from '/app/actions/app';
import reducer, { init } from '/app/reducers';

// import RouterService from '/services/Router';

const GlobalStateContext = React.createContext(null);

export function GlobalStateProvider(props) {
  const [globalState, dispatch] = useReducer(reducer, props, init);

  const asyncDispatcher = useCallback(
    (action) => {
      dispatch(action);
      thunk(dispatch, action);
    },
    [dispatch]
  );

  useEffect(() => {
    // Hydrate action will fetch state from db and will populate initial state with that
    // const unSubscribe = AuthService.subscribe(
    //   (userId) => asyncDispatcher(hydrate({userId})),
    //   () => RouterService.errorPage()
    // );
    // return () => unSubscribe();
    asyncDispatcher(hydrate());
  }, [asyncDispatcher]); // asyncDispatcher is guaranteed to not change by React

  // Every time we call dispatch is going to re-render everything in props.children
  // so let use it carefully
  return (
    <GlobalStateContext.Provider value={[globalState, asyncDispatcher]}>
      {globalState.ready && props.children}
    </GlobalStateContext.Provider>
  );
}

export default GlobalStateContext;
