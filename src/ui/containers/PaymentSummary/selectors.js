import { createSelector } from 'reselect';

const selectBlog = () => (state) => state.get('cashDrawer');

const selectBlogPostVisibility = () =>
  createSelector(selectBlog(), (globalState) => globalState.getIn(['visible']));

export { selectBlogPostVisibility };
