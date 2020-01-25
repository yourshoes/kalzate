const electron = require('electron');
// Module to control application life.
const app = electron.app;
// IPC communication
const ipc = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');
// const Printer = require('electron-printer');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    frame: true,
    height: 600,
    width: 800,
    'min-height': 500,
    'min-width': 900,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});


// function print(text, options) {
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
function printNative(text) {
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
        font-size: 10px;
        font-family: monospace, "Courier New", Courier !IMPORTANT;
        font-weight: 600;
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


ipc.on('print-ticket', (event, text, options) => {
  try {
    // print(text, options);
    printNative(text, options);
  } catch (error) {
    console.error(error);
    // printNative(text, options);
  }
});
