/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import StockPaginationContainer from '../atoms/StockPaginationContainer';
import StockPaginationSection from '../atoms/StockPaginationSection';
import { DownloadIcon, SyncIcon, PageIteratorIcon } from '../atoms/StockIcons';
import PageIteratorContainer from '../atoms/PageIteratorContainer';

export function StockPagination({
  total,
  limit,
  skip,
  search,
  refreshStock,
  exportStock,
}) {
  const page = Math.floor(skip / limit);
  const lastPage = Math.ceil(total / limit) - 1;
  const enabledPrev = page > 0;
  const enabledNext = page < lastPage;
  return (
    <StockPaginationContainer>
      <StockPaginationSection>
        {/* <Octicon name={'sync'} onClick={() => refreshStock(limit, 0)} />*/}
        <DownloadIcon onClick={() => exportStock(false)} />
        <SyncIcon onClick={() => refreshStock(limit, 0)} />
      </StockPaginationSection>
      <StockPaginationSection right>
        <span>
          {skip + 1} ... {skip + limit} <FormattedMessage {...messages.paginationOf} /> {total}
        </span>
        <PageIteratorContainer>
          <PageIteratorIcon
            onClick={() =>
              enabledPrev ? refreshStock(limit, skip - limit, search) : null
            }
            enabled={enabledPrev}
          />
          <PageIteratorIcon
            onClick={() =>
              enabledNext ? refreshStock(limit, skip + limit, search) : null
            }
            enabled={enabledNext}
            next
          />
        </PageIteratorContainer>
      </StockPaginationSection>
    </StockPaginationContainer>
  );
}

export default StockPagination;
