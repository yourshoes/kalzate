/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import TableRowContainer from '../atoms/TableRowContainer';
import TableField from './TableField';

export class TableHeader extends React.Component {

  render() {
    return (
      <TableRowContainer content>
        <TableField placeholder={this.props.headerMessages[0]} readonly />
        <TableField placeholder={this.props.headerMessages[1]} readonly />
        <TableField placeholder={this.props.headerMessages[2]} readonly />
        {/* <TableField placeholder="one unit left Stock" readonly />*/}
      </TableRowContainer>
    );
  }
}

TableHeader.propTypes = {};

export default TableHeader;
