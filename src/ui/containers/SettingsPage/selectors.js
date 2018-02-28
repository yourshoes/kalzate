// import { createSelector } from 'reselect';

const selectSettings = () => (state) => state.get('settings').toJSON();

// const selectSettings = () =>
//   createSelector(selectGlobal(), (globalState) =>
//     globalState.get('settings').toJSON()
//   );

export { selectSettings };
