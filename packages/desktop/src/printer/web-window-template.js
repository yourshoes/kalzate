const ipcRender = require('electron').ipcRenderer;

const body = $('#main');

ipcRender.on('render', function (event, {text, options}) {
  try{
    setStyles(options)
    renderDataToHTML(text, options);
    event.sender.send('render-reply', {status: true, error: null});
  }
  catch(error){
    event.sender.send('render-reply', {status: false, error});
  }
});

function setStyles(options){
  body.css({
    width: options.printerWidth ? options.printerWidth : 170 , 
    margin: options.margin ? options.margin : 0
  });
}

function renderDataToHTML(text, options) {
  if(typeof text === 'string'){
    body.append($(`<pre class="font">${text}</pre>`));
  }
  else {
    text.forEach(line => body.append(generatePageText(line)));
  }

  if(options.image){
    switch (options.image.type) {
      case 'qrcode':
        body.append(`<div id="qrcode"></div>`);
        new QRCode(document.getElementById(`qrcode`), {
          text: options.image.value,
          width: options.image.width ? options.image.width : 1,
          height: options.image.height ? options.image.height : 15,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
        return;
      case 'barcode':
        body.append(`<div style="text-align: center;width: 100%;">
            <img id="barcode"
        jsbarcode-value="${options.image.value}"
        jsbarcode-width="${options.image.width ? options.image.width : 1}"
        jsbarcode-height="${options.image.height ? options.image.height : 15}"
        jsbarcode-fontsize="${options.image.fontsize ? options.image.fontsize : 12}"
        jsbarcode-margin="0"
        jsbarcode-displayvalue="${!!options.image.displayValue}"/></div>`);
        JsBarcode(`#barcode`).init();
        return;
    }
  }
   
}

/**
* @function
 * @name generatePageText
 * @param arg {pass argumet of type PosPrintData}
 * @description used for type text, used to generate type text
* */
function generatePageText(arg) {
    const text = arg.value;
    const css = arg.css;
    arg.style = arg.style ? arg.style : '';
    const div = $(`<div class="font" style="${arg.style}">${text}</div>`);
    if (css) {
        for (const key in css) {
            const item = css[key];
            div.css(key, item);
        }
    }
    return div;
}
