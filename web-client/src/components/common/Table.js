import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useFlexLayout, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';

import { GlobalFilter, Loading } from 'components/common';
import DropDown from './DropDown';

import { TRANSCRIPT_FILTER as options } from 'constants/transcript';

const SIZE_OPTIONS = [10, 20, 50, 100];

const Table = ({ columns, data, searchPlaceholder, title, isLoading }) => {
  const getStyles = (props, align = 'left') => [
    props,
    {
      style: {
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
      },
    },
  ];

  const headerProps = (props, { column }) => getStyles(props, column.align);

  const cellProps = (props, { cell }) => getStyles(props, cell.column.align);

  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const memoizedColumns = useMemo(() => columns, [columns]);

  const memoizedData = useMemo(() => data, [data]);

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    state: { pageIndex, pageSize },
    setGlobalFilter,
  } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFlexLayout,
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;
  const [pageInput, setPageInput] = useState(1);
  const onChangeInInput = ({ target: { value } }) => {
    const page = value ? Number(value) - 1 : 0;
    setPageInput(value);
    gotoPage(page);
  };

  useEffect(() => {
    setPageInput(pageIndex + 1);
  }, [pageIndex]);

  let isInputError = pageInput > (pageOptions.length || 2) || pageInput < 1;

  const selectFilter = useAsyncDebounce(option => {
    const { value } = option;
    setGlobalFilter(value || undefined);
  }, 1000);

  return (
    <>
      <div className="heading">
        <h2>{title}</h2>
        <div className="table__heading-right">
          <div className="table__select-options">
            <span>Filter by</span>
            <DropDown
              options={options}
              name="filter-transcript"
              defaultValue={options.filter(option => option.label === 'ALL')}
              isSearchable={false}
              onChange={selectFilter}
            />
          </div>
          <GlobalFilter placeholder={searchPlaceholder} filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>
      <div className="lf-table">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="lf-table__head-row">
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(headerProps)} className="lf-table__col lf-table__col--head">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="lf-table__body">
            {isLoading ? (
              <tr>
                <td className="lf-table__no-data color--transparent">
                  <Loading />
                </td>
              </tr>
            ) : page.length ? (
              page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="lf-table__row">
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps([
                            {
                              className: cell.column.className,
                              style: cell.column.style,
                            },
                            cellProps,
                          ])}
                          className="lf-table__col"
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="lf-table__no-data">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
        {
          <div className="pagination lf-table__pagination">
            <span className="d-flex align-items-center">
              <span className="mr-2">Rows Per Page</span>
              <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                }}
                className="pagination-select custom-select-sm form-control form-control-sm"
              >
                {SIZE_OPTIONS.map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </span>

            <span className="d-flex align-items-center">
              Page
              <input
                type="number"
                value={pageInput}
                min={1}
                max={pageOptions.length}
                className={`ml-2 mr-2 form-control form-control-sm ${isInputError ? 'form-control--error' : ''}`}
                onChange={onChangeInInput}
                style={{ width: '60px' }}
              />
              of
              <span className="ml-2"> {pageOptions.length}</span>
            </span>
            <div className="lf-table__pagination--right d-flex justify-between">
              <button
                className={`btn btn--primary btn--md mr-4 ${!canPreviousPage ? 'btn--disabled' : ''}`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <button
                className={`btn btn--primary btn--md ${!canNextPage ? 'btn--disabled' : ''}`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default Table;
