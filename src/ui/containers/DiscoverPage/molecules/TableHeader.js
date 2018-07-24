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
        <TableField placeholder="Top Sold" readonly />
        <TableField placeholder="Top Less Sold" readonly />
        <TableField placeholder="Empty Stock" readonly />
        {/* <TableField placeholder="one unit left Stock" readonly />*/}
      </TableRowContainer>
    );
  }
}

TableHeader.propTypes = {};

export default TableHeader;
