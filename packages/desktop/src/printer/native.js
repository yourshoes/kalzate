const Printer = require('printer');

module.exports = exports = function(text, options){

    const toBytes = (str) => Array.from(str).map((c) => c.charCodeAt(0));

    const printData = toBytes(text).concat([0x1B, 0x69, 0x1B, 0x70, 0x00, 0x09, 0x09]);

    Printer.printDirect({
      data: new Buffer(printData),
      error: function(error) {
          console.error('error', error)
      },
      success: function(){
          console.log('printed!')
      }
    });
};