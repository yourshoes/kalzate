const { ipcRenderer, remote } = require('electron');
window.ipcRenderer = ipcRenderer;
window.remote = remote;
window.isElectron = true;
