import { takeEvery, put } from 'redux-saga/effects';
// import * as Constants from 'config';
import { DOWNLOAD_FILE_ACTION, DOWNLOAD_FILE_ERROR_ACTION } from 'containers/App/constants';

function* downloadFile(action) {
  try {
    // content should come in as an string
    const { content, fileName, mime = 'text/json' } = action;
    const blob = new Blob([content], { type: mime });
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', window.URL.createObjectURL(blob));
    dlAnchorElem.setAttribute('download', fileName);
    dlAnchorElem.click(); // if not working, try with dlAnchorElem.dispatchEvent(new MouseEvent(....))
    dlAnchorElem.remove();
  } catch (e) {
    yield put({ type: DOWNLOAD_FILE_ERROR_ACTION, message: e.message });
  }
}

export default takeEvery(DOWNLOAD_FILE_ACTION, downloadFile);
