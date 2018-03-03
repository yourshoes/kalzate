
const selectSettings = () => (state) => state.get('settings') ? state.get('settings').toJSON() : state.get('settings');

export { selectSettings };
