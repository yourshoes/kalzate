import * as ActionTypes from './types';

export function exportDatabase() {
    return {
        type: ActionTypes.EXPORT_DATABASE_ACTION
    };
}