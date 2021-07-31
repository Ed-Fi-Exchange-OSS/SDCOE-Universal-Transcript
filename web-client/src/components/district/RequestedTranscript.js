import React, { useState, useEffect } from 'react';
import findKey from 'lodash/findKey';

import { Table, Modal } from 'components/common';

import * as notify from 'utils/toast';
import { TOAST_MESSAGES } from 'constants/toast';
import { distritctRequestedTranscript } from 'constants/tableColumns';

import { getRequestedOrders } from 'services/orders';
import TableLoader from 'components/common/TableLoader';

export const RequestedTranscriptDistrict = () => {
  const [details, setDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, isSetLoading] = useState(true);
  const [changeStatus, setChangeStatus] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const getTabledata = async () => {
      const requestedOrder = await getRequestedOrders();
      setTableData(requestedOrder);
      isSetLoading(false);
    };
    getTabledata();
  }, []);

  const handleAction = async (id, callback, ...rest) => {
    try {
      setIsDownloading(true);
      const res = await callback(id, ...rest);
      const { message, data, isDownload, title, hasDownloadFailed } = res;

      if (data) {
        tableData[findKey(tableData, { requestId: id })].status = data;
        notify.toast(data, message);
        setChangeStatus(!changeStatus);
      }

      if (isDownload) {
        setIsDownloading(false);
        notify.success({ title, message });
      }

      if (hasDownloadFailed) {
        setIsDownloading(false);
        notify.error({ title, message });
      }
    } catch (err) {
      notify.error({ title: TOAST_MESSAGES.noOption.title, message: TOAST_MESSAGES.noOption.message });
    }
  };

  const viewDetails = data => {
    setDetails(data);
    setIsOpen(!isOpen);
  };

  return (
    <section className="section">
      <div className="container pb-5">
        {isDownloading ? (
          <TableLoader />
        ) : (
          <Table
            columns={distritctRequestedTranscript({ handleAction, viewDetails })}
            data={tableData}
            title="Requested Transcript"
            searchPlaceholder="Search by keywords"
            isLoading={isLoading}
          />
        )}
      </div>
      {isOpen && <Modal handleClick={viewDetails} data={details} />}
    </section>
  );
};
