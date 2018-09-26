/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import TableBodyContainer from '../atoms/TableBodyContainer';
import HeightAdapterContainer from '../atoms/HeightAdapterContainer';
import TableRowContainer from '../atoms/TableRowContainer';
import TableField from './TableField';

export class TableBody extends React.Component {

  render() {
    return (
      <HeightAdapterContainer>
        <TableBodyContainer>
          {this.props.data.map((topK, i) => (
            <TableRowContainer key={i} even={(i + 1) % 2}>
              <TableField placeholder={topK.sold} readonly />
              <TableField placeholder={topK.notSold} readonly />
              <TableField placeholder={topK.emptyStock} readonly />
              {/* <TableField placeholder={topK.alertStock} readonly />*/}
            </TableRowContainer>
          ))}
        </TableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TableBody.propTypes = {};

export default TableBody;
