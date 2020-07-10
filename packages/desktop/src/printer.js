const electron = require('electron');
// Module to control application life.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const fs = require('fs');
const os = require('os');
const url = require('url');
// const Printer = require('electron-printer');


// function printNative(text, options) {
//   const toBytes = (str) => Array.from(str).map((c) => c.charCodeAt(0));

//   const printData = toBytes(text).concat([0x1B, 0x69, 0x1B, 0x70, 0x00, 0x09, 0x09]);

//   require('kalzate-printer').print({
//     text: new Buffer(printData),
//     printer: 'termica',
//   });
// }

/**
 * This method relies on a native approach, but it limited as it will
 * not work using codes (to open cash drawer or cut the paper) and also
 * it has to be tweak for each printer. It also requires to set the
 * receipt printer as the default printer
 * @param {*} text the ticket to print
 */
function printElectron(text) {
  const printFile = path.resolve(path.normalize(path.join(os.tmpdir(), 'print.html')));

  fs.writeFileSync(printFile, `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
    @media print {
      @page {
        margin: 0;
      }
      body * {
        visibility: hidden;
      }
      #printer-content, #printer-content * {
        visibility: visible;
      }
      #printer-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 71mm
        min-width: 71mm;
        max-width: 71mm;
        font-size: 11px;
        font-family: monospace, "Courier New", Courier !IMPORTANT;
        font-weight: 400;
      }
    }
    </style>
  </head>
  <body><pre id="printer-content">${text}</pre></body>
  </html>
  `);

  const win = new BrowserWindow({ show: false });

  win.loadURL(
    url.format({
      pathname: printFile,
      protocol: 'file:',
      slashes: true,
    })
  );

  win.webContents.on('did-finish-load', () => {
    win.webContents.print({ silent: true });
    setTimeout(() => {
      win.close();
    }, 1000);
  });
}

// function printElectron(text){
//     try {
//     const printFile = path.resolve(path.normalize(path.join(os.tmpdir(), 'print.txt')));
//     fs.writeFileSync(printFile, text);
//     const win = new BrowserWindow({ show: false });
//     win.loadURL(`file://${printFile}`);
//     win.webContents.on('did-finish-load', () => {
//       win.webContents.print({ silent: true });
//       setTimeout(() => {
//         win.close();
//       }, 1000);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

module.exports = exports =  (text, options) => {
  try {
    printElectron(text, options);
  } catch (error) {
    console.error(error);
  }
}

