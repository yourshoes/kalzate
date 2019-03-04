/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import TableContainer from '../atoms/TableContainer';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export class Table extends React.Component {

  render() {
    return (
      <TableContainer>
        <TableHeader {...this.props} />
        <TableBody {...this.props} />
      </TableContainer>
    );
  }
}

Table.propTypes = {};

export default Table;
