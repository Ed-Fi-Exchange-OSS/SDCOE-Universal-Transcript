import React from 'react';

import { STAFF, DISTRICT } from 'constants/routes';
import { formatDate } from 'utils/formatDate';
import { GetActions, GetStatus } from 'components/common';

/*
  Prepare  Columns and Data for tables
*/

export const distritctRequestedTranscript = ({ handleAction, viewDetails }) => [
  {
    Header: 'Student SSID',
    accessor: 'districtStudentSSID', // accessor is the "key" in the data
  },
  {
    Header: 'Student Name',
    accessor: props => `${props.firstName} ${props.lastName}`,
    style: {
      fontWeight: '600',
    },
    Cell: ({ value, row: { original } }) =>
      value ? (
        <button className="btn--link text-semibold" onClick={() => viewDetails(original)}>
          {value}
        </button>
      ) : (
          <p className="text-center">--</p>
        ),
  },
  {
    Header: 'Format',
    accessor: 'typeOfTranscript',
    style: {
      textTransform: 'uppercase',
    },
    Cell: props => `${props.value === 'json' ? 'standard json' : props.value}` || <p className="text-center">--</p>,
  },
  {
    Header: 'Requested Date',
    accessor: 'requestDate',
    Cell: props => formatDate(props.value) || <p className="text-center">--</p>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: props => <GetStatus status={props.value} />,
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: props => (
      <GetActions
        status={props.row.values.status}
        handleAction={handleAction}
        viewDetails={viewDetails}
        {...props}
        role={DISTRICT}
      />
    ),
  },
];

export const staffRequestedTranscript = ({ handleAction, viewDetails }) => [
  {
    Header: 'Requested By',
    accessor: 'requestedBy',
    style: {
      fontWeight: '600',
    },
    Cell: ({ value, row: { original } }) =>
      value ? (
        <button className="btn--link text-semibold" onClick={() => viewDetails(original)}>
          {value}
        </button>
      ) : (
          <p className="text-center">--</p>
        ),
  },
  {
    Header: 'Requested type',
    accessor: 'requestedType',
  },
  {
    Header: 'Student Name',
    accessor: props => `${props.firstName} ${props.lastName}`,
  },

  {
    Header: 'Format',
    accessor: 'typeOfTranscript',
    Cell: props => `${props.value === 'json' ? 'standard json' : props.value}` || <p className="text-center">--</p>,
    style: {
      textTransform: 'uppercase',
    },
  },
  {
    Header: 'Requested Date',
    accessor: 'requestDate',
    Cell: props => formatDate(props.value) || <p className="text-center">--</p>,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: props => <GetStatus status={props.value} />,
    width: 200,
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: props => (
      <GetActions
        status={props.row.values.status}
        handleAction={handleAction}
        viewDetails={viewDetails}
        {...props}
        role={STAFF}
      />
    ),
  },
];
