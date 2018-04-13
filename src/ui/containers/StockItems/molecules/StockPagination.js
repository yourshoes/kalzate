/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import StockPaginationContainer from '../atoms/StockPaginationContainer';
import StockPaginationSection from '../atoms/StockPaginationSection';
import DownloadIcon from '../atoms/DownloadIcon';
import SyncIcon from '../atoms/SyncIcon';
import PageIteratorContainer from '../atoms/PageIteratorContainer';
import PageIteratorIcon from '../atoms/PageIteratorIcon';

export function StockPagination({ total, limit, skip, search, refreshStock }) {
  const page = Math.floor(skip / limit);
  const lastPage = Math.ceil(total / limit) - 1;
  const enabledPrev = page > 0;
  const enabledNext = page < lastPage;
  return (
    <StockPaginationContainer>
      <StockPaginationSection>
        {/* <Octicon name={'sync'} onClick={() => refreshStock(limit, 0)} />*/}
        <DownloadIcon onClick={() => null} />
        <SyncIcon onClick={() => refreshStock(limit, 0)} />
      </StockPaginationSection>
      <StockPaginationSection right>
        <span>
          {skip + 1} ... {skip + limit} of {total}
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
