import React from 'react';
import { FormattedMessage } from 'react-intl';
import Center from 'components/Center';
import NotFound from 'components/NotFound';
import StockTableRows from './StockTableRows';
import StockTableBodyContainer from '../atoms/StockTableBodyContainer';
import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';
import messages from '../messages';

export function StockTableBody(props) {
  return (
    <StockTableBodyContainer content>
      {!props.total && (
        <Center>
          <NotFound icon="thumbsdown">
            <Title>
              <FormattedMessage {...messages.notFound} />
            </Title>
            <Subtitle>
              <FormattedMessage {...messages.notFoundHelp} />
            </Subtitle>
          </NotFound>
        </Center>
      )}
      {!!props.total && (
        <StockTableRows
          intl={props.intl}
          items={props.items}
          onRemove={({ reference }) =>
            props.removeStock(reference, props.limit, props.skip, props.search)
          }
          onUpdate={(stock) => props.updateStock(stock)}
          tmp={props.tmp}
          updateTmpData={props.updateTmpData}
          addStockToTicket={props.addStockToTicket}
        />
      )}
    </StockTableBodyContainer>
  );
}

export default StockTableBody;
