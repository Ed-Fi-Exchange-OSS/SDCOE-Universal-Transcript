import React from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';

export default function Table({ columns, data, isDisabled }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} className="rowSelection-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="rowSelection-table__head-row">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="rowSelection-table__col rowSelection-table__col--head">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="rowSelection-table__body">
          {rows.map((row, i) => {
            prepareRow(row);
            const { requestedRopCertificate, requestedRopTranscript } = row.values;
            const isActive = requestedRopTranscript || requestedRopCertificate ? true : false;
            return (
              <tr
                {...row.getRowProps()}
                className={`rowSelection-table__body-row ${isActive && ' rowSelection-table__body-row--active'} ${
                  isDisabled && 'rowSelection-table__body-row--disabled'
                }`}
              >
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="rowSelection-table__col">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
