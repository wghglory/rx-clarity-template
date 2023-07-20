/*
Datagrid state example:

{
    "page": {
        "from": 0,
        "to": 9,
        "size": 10,
        "current": 1
    },
    "sort": {
        "by": "description",
        "reverse": false
    },
    "filters": [
        {
            "property": "name",
            "value": "aaa"
        },
        {
            "property": "productionDate",
            "value": "bbb"
        }
    ]
}

Convert to API HttpParams =>

{page: 1, pageSize: 10, filter: 'name==*aaa*;productionDate==*bbb*', sortAsc: 'description'}
*/
import { ClrDatagridStateInterface } from '@clr/angular';
import { isEmpty, pickBy } from 'lodash-es';
import { PageQuery } from '../models/page-query';

const DEFAULT_PAGE_SIZE = 10;

export function stateHandler(state: ClrDatagridStateInterface | null) {
  if (isEmpty(state)) {
    return {
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    };
  }

  const { page, pageSize } = pageHandler(state);
  const { sortAsc, sortDesc } = sortHandler(state);
  const filter = filterHandler(state);

  return pickBy<PageQuery>({ page, pageSize, filter, sortAsc, sortDesc }, Boolean);
}

function pageHandler(state: ClrDatagridStateInterface<any>) {
  let page = 0;
  let pageSize = DEFAULT_PAGE_SIZE;

  if (state.page) {
    page = state.page.current || 1;
    pageSize = state.page.size || DEFAULT_PAGE_SIZE;
  }
  return { page, pageSize };
}

function sortHandler(state: ClrDatagridStateInterface) {
  let sortAsc = '';
  let sortDesc = '';

  if (state.sort) {
    if (state.sort.reverse) {
      sortDesc = state.sort.by as string;
    } else {
      sortAsc = state.sort.by as string;
    }
  }
  return { sortAsc, sortDesc };
}

function filterHandler(state: ClrDatagridStateInterface) {
  const { filters } = state;
  if (!state || !filters) {
    return '';
  }
  return filters
    .map(filter => {
      const { property, value } = <{ property: string; value: string }>filter;
      return `${property}==*${value}*`;
    })
    .join(';');
}
