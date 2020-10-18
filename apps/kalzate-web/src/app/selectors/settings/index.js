import { createSelector } from 'reselect';

export const settingsDomain = (state) => state.settings;

export const settings =
    createSelector(
        settingsDomain,
        (settings) =>
            settings
    );