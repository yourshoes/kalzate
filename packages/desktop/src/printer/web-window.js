const {BrowserWindow, ipcMain} = require('electron');
const path = require('path');

/**
 * This method relies on a native approach, but it limited as it will
 * not work using codes (to open cash drawer or cut the paper) and also
 * it has to be tweak for each printer. See printRawNative for that case
 * @param {*} text the ticket to print
 */
function printWindow(text, options) {

    let window = new BrowserWindow({
      width: 210,
      height: 1200,
      show: !!options.preview,
      webPreferences: {
          nodeIntegration: true,  
      }
    });
  
    window.on('closed', () => {
        window = null;
    });
  
    window.loadFile(path.join(__dirname, 'template.html'));
  
    window.webContents.on('did-finish-load', async () => {
      // mainWindow.webContents.getPrinters();
     await sendEvent('render', window.webContents, {text, options});
   
      window.webContents.print({
        silent: !!options.silent,
        printBackground: true,
        copies: options.copies
      }, () => window.close());
  
    })
  
  }
  
  function sendEvent(channel, webContents, args) {
    return new Promise((resolve,reject)=>{
        ipcMain.once(`${channel}-reply`, function(_, result) {
            if (result.status) {
                resolve(result);
            } else {
                reject(result.error);
            }
        });
        webContents.send(channel, args);
    });
  }
  
  
module.exports = exports = function(text, options){
    printWindow(text, options);
};