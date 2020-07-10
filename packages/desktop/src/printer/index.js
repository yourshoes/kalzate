const {BrowserWindow, ipcMain} = require('electron');
const path = require('path');
// const Printer = require('@kalzate/printer');

// function printRawNative(text, options) {
//   const toBytes = (str) => Array.from(str).map((c) => c.charCodeAt(0));

//   const printData = toBytes(text).concat([0x1B, 0x69, 0x1B, 0x70, 0x00, 0x09, 0x09]);

//   Printer.printDirect({
//     data: new Buffer(printData)
//         //data: printData
//         // , printer: 'termica'
//         , type: "RAW"
//         , success:function(){
//             res.send(200);
//         }
//         , error:function(err){

//             console.error(err);
//             res.send(404);

//         }
//   });
// }

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

const defaultOptions = {
  printerName:  '',        // printerName: string, check it at webContent.getPrinters()
  printerWidth: '58mm',               //  width of content body
  printerIp: '127.0.0.1',
  preview: false,               // Preview in window or print
  margin: '0 0 0 0',            // margin of content body
  copies: 1,                    // Number of copies to print
  image: null,
  silent: true
}

module.exports = exports =  (text, options) => {
  try {
    printWindow(text, {...defaultOptions, ...options});
    // printRawNative(text);
  } catch (error) {
    console.error(error);
  }
}

