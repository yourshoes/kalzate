/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { safeLoad as fromYAML } from 'js-yaml';
import fromCSV from 'csvtojson';
import Tooltip from 'components/Tooltip';
import messages from '../messages';
import { DottedContainer } from '../atoms/ModalContainer';
import { ImportStockInfoTooltip } from '../atoms/ImportStockInfoTooltip';
import { FILE_EXTENSIONS_ALLOWED } from '../constants';
export class ModalDropZone extends React.Component {

  static SAMPLE_FILE = `reference, brand, desc, price, amount
  400, SanDisk, 256GB USB 3.0, 64.95, 10
  401, Toshiba, 1TB Canvio Basics 2.5, 69.99, 15
  402, Kingston, DT100G3, 44, 5
  403, HUIJON,New 1060 Plus Graphic Tablet, 86.99, 5
  404, Faith, SSD NvMe m.2 1TB, 77.77, 7
  410, Xiaomi, Redmi note 5 Case, 5.90, 15
  411, Ryzen, 1600x 3.6GHz, 135.95, 5`;

  constructor(props) {
    super(props);
    this.state = { loading: false, items: null, filename: '' };
  }

  componentDidMount() {
    this.props.onApproved(() => this.saveData());
  }

  saveData() {
    if (!this.state.items.length) return true;
    // Emit action to save items taking into account options (remove current stock & run in background)
    this.props.createStock(this.state.items, {
      batch: true,
      remove: this.props.removeStockOption,
      // remove: this.props.removeOption,
      archive: this.props.archiveStockOption,
      filename: this.state.filename,
      // background: this.props.backgroundOption,
    });

    return true;
  }

  // @todo move to a saga ?
  toJS(str, extension, cb) {
    try {
      switch (extension) {
        case FILE_EXTENSIONS_ALLOWED[0]:
          return cb(null, JSON.parse(str));
        case FILE_EXTENSIONS_ALLOWED[1]:
          return cb(null, fromYAML(str));
        case FILE_EXTENSIONS_ALLOWED[2]:
          return fromCSV({
            colParser: {
              price: 'number',
              amount: 'number',
            },
          })
            .fromString(str)
            .on('end_parsed', (data) => cb(null, data))
            .on('error', (error) => cb(error));
        default:
          return str;
      }
    } catch (error) {
      return cb(error);
    }
  }

  // @todo move to a saga ?
  processFile(file) {
    const [, fileExtension] = file.name.split('.');
    if (!FILE_EXTENSIONS_ALLOWED.includes(fileExtension.toLowerCase())) return;

    const fileAPISupport =
      window.File && window.FileReader && window.FileList && window.Blob;
    // @todo display no file api support notification
    if (!fileAPISupport) return;

    const fileReader = new FileReader();
    fileReader.onerror = ({ target }) => {
      this.setState({ loading: false, items: [] });
      console.error('could not read file, error code', target.error);
    };
    fileReader.onloadstart = () => {
      this.setState({ loading: true });
    };

    fileReader.onload = () => {
      // Conver to JSON here from YAML or CSV
      this.toJS(
        fileReader.result,
        fileExtension.toLowerCase(),
        (error, jsContent) =>
          this.setState(
            { loading: false, items: jsContent, filename: file.name },
            () => this.props.enable()
          )
      );
    };

    // fileReader.readAsArrayBuffer(file);
    fileReader.readAsText(file, 'UTF-8');
  }

  openFileContext(target) {
    if (this.fileInput) {
      this.fileInput.click();
    }
  }

  dropHandler(event) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
        const item = event.dataTransfer.items[i];
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          this.processFile(item.getAsFile());
        }
      }
    }

    // Pass event to removeDragData for cleanup
    this.removeDragData(event);
  }

  dragOverHandler(event) {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  }

  removeDragData(event) {
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to remove the drag data
      event.dataTransfer.items.clear();
    } else {
      // Use DataTransfer interface to remove the drag data
      event.dataTransfer.clearData();
    }
  }

  downloadSample(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.downloadFile(ModalDropZone.SAMPLE_FILE, 'sample_stock_file.csv', 'text/csv');
  }

  render() {
    return (
      <DottedContainer
        draggable="true"
        onClick={({ target }) => this.openFileContext(target)}
        onDrop={(event) => this.dropHandler(event)}
        onDragOver={(event) => this.dragOverHandler(event)}
      >
        <input
          ref={(element) => (this.fileInput = element)}
          type="file"
          multiple="false"
          accept=".csv,.json,.yaml,text/csv, application/json, application/x-yaml, application/vnd.ms-excel, text/*"
          onChange={({ target }) =>
            target.files[0] ? this.processFile(target.files[0]) : null
          }
          style={{ display: 'none' }}
        />
        <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
          <p style={{ margin: '2px' }}><FormattedMessage {...messages.modalTitle} /></p>
          <div style={{ fontSize: '0.6em', margin: '2px' }}>
            <FormattedMessage {...messages.modalDesc} />
            {/* <Tooltip animated color="inherit" right="62" top="135" direction="down" onClick={(event) => this.downloadSample(event)}>*/}
            {/* <Tooltip animated color="inherit" right="100" top="100" direction="down" onClick={(event) => this.downloadSample(event)}>*/}
            <Tooltip animated color="inherit" right="65" top="5" direction="down" onClick={(event) => this.downloadSample(event)}>
              <ImportStockInfoTooltip onClick={(event) => this.downloadSample(event)}>
                <FormattedMessage {...messages.modalHelp} />
              </ImportStockInfoTooltip>
            </Tooltip>
          </div>
          {this.state.items && (
            <p
              style={{
                marginTop: '20px',
                fontSize: '0.6em',
              }}
            >
              {this.state.items.length
                ? `${this.state.items.length} items found`
                : 'No items found'}
            </p>
          )}
          {this.state.loading && (
            <p
              style={{
                marginTop: '20px',
                fontSize: '0.6em',
              }}
            >
              <FormattedMessage {...messages.modalLoading} />
            </p>
          )}
        </div>
        {/* <p
          style={{
            position: 'absolute',
            width: '200px',
            top: '170px',
            left: '210px',
            fontSize: '0.6em',
          }}
        >
          300 items found
        </p>*/}
      </DottedContainer>
    );
  }
}

ModalDropZone.propTypes = {};

export default ModalDropZone;
