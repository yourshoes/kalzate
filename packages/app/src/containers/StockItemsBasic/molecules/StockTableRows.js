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
import messages from '../messages';

const isRealNumeric = function (input) {
  return /^[1-9][0-9]*\.?[0-9]{0,2}$/.test(input);
};

export function StockTableRows(props) {
  console.log(props.items);
  return (
    <StockTableContainer>
      {props.items.map(({ _data }, i) => (
        <StockTableHeaderContainer key={i} even={(i + 1) % 2}>
          <StockField placeholder={_data.reference || this.props.intl.formatMessage(messages.reference)} readonly />
          <StockField
            placeholder={_data.brand || this.props.intl.formatMessage(messages.brand)}
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
            placeholder={_data.desc || this.props.intl.formatMessage(messages.desc)}
            value={
              props.tmp[_data.reference] && props.tmp[_data.reference].desc
                ? props.tmp[_data.reference].desc
                : ''
            }
            onChange={(desc) =>
              props.updateTmpData(_data.reference, {
                desc,
              })
            }
            size="30"
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
                  : price && props.tmp[_data.reference]
                    ? props.tmp[_data.reference].price
                    : '',
              })
            }
          />
          <StockField
            placeholder={_data.amount || props.intl.formatMessage(messages.amount)}
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
          <StockButton primary icon="link-external" onClick={() => props.addStockToTicket(_data)} />
        </StockTableHeaderContainer>
      ))}
    </StockTableContainer>
  );
}

StockTableRows.propTypes = {
  tmp: PropTypes.object,
  items: PropTypes.any, // @todo move to array type
};

export default StockTableRows;
