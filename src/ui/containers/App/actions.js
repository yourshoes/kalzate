/*
 *
 * WorkSpacePage actions
 *
 */

import { CHANGE_TAKE_AMOUNT, DOWNLOAD_FILE_ACTION, PRINT_ACTION } from './constants';

export function setTicketTakeAmount(amount) {
  return {
    type: CHANGE_TAKE_AMOUNT,
    amount,
  };
}

export function downloadFile({ content, fileName }) {
  return {
    type: DOWNLOAD_FILE_ACTION,
    content,
    fileName,
  };
}

export function print({ content }) {
  return {
    type: PRINT_ACTION,
    content,
  };
}
