/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import StockTableContainer from '../atoms/StockTableContainer';
import StockTableHeaderContainer from '../atoms/StockTableHeaderContainer';
import StockButton from './StockButton';
import StockField from './StockField';

const isRealNumeric = function (input) {
  return /^[1-9][0-9]*\.?[0-9]{0,2}$/.test(input);
};

export function StockTableRows(props) {
  console.log(props.items);
  return (
    <StockTableContainer>
      {props.items.map(({ _data }, i) => (
        <StockTableHeaderContainer even={(i + 1) % 2}>
          <StockField placeholder={_data.reference || 'Reference'} readonly />
          <StockField
            placeholder={_data.brand || 'Brand'}
            value={
              props.tmp[_data.reference] && props.tmp[_data.reference].brand
                ? props.tmp[_data.reference].brand
                : ''
            }
            onChange={(brand) =>
              props.updateTmpData(_data.reference, {
                brand,
              })
            }
          />
          <StockField
            placeholder={_data.gender || 'Gender'}
            value={
              props.tmp[_data.reference] && props.tmp[_data.reference].gender
                ? props.tmp[_data.reference].gender
                : ''
            }
            onChange={(gender) =>
              props.updateTmpData(_data.reference, {
                gender,
              })
            }
          />
          <StockField
            placeholder={_data.colors.join() || 'Color'}
            value={
              props.tmp[_data.reference] && props.tmp[_data.reference].colors
                ? props.tmp[_data.reference].colors.join(',')
                : ''
            }
            onChange={(colors) =>
              props.updateTmpData(_data.reference, {
                colors: colors.split(',').map((c) => c.trim()),
              })
            }
          />
          <StockField
            placeholder={_data.size || 'Size'}
            value={
              props.tmp[_data.reference] && props.tmp[_data.reference].size
                ? props.tmp[_data.reference].size
                : ''
            }
            onChange={(size) =>
              props.updateTmpData(_data.reference, {
                size: parseInt(size, 10),
              })
            }
          />
          <StockField
            placeholder={_data.price.toFixed(2)}
            value={
              props.tmp[_data.reference] && props.tmp[_data.reference].price
                ? props.tmp[_data.reference].price
                : ''
            }
            onChange={(price) =>
              props.updateTmpData(_data.reference, {
                price: isRealNumeric(price)
                  ? price
                  : price ? props.tmp[_data.reference].price : '',
              })
            }
          />
          <StockField
            placeholder={_data.amount || 'Amount'}
            value={
              props.tmp[_data.reference] && props.tmp[_data.reference].amount
                ? props.tmp[_data.reference].amount
                : ''
            }
            onChange={(amount) =>
              props.updateTmpData(_data.reference, {
                amount: parseInt(amount, 10),
              })
            }
          />
          <StockButton
            primary
            icon="check"
            onClick={() => {
              props.onUpdate({ ..._data, ...props.tmp[_data.reference] });
            }}
          />
          <StockButton
            primary
            icon="remove-close"
            onClick={() => props.onRemove(_data)}
          />
          <StockButton primary icon="link-external" />
        </StockTableHeaderContainer>
      ))}
    </StockTableContainer>
  );
}

StockTableRows.propTypes = {
  tmp: PropTypes.object,
  items: PropTypes.array,
};

export default StockTableRows;
