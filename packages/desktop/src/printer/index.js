
const print = require('./native');

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
    console.log('printing ticket');
    print(text, {...defaultOptions, ...options});
  } catch (error) {
    console.error(error);
  }
}

