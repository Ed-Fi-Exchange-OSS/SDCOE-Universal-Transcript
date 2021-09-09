import { TOAST_MESSAGES } from 'constants/toast';
import { getTimeStamp } from 'utils/getTimeStamp';
import { APPROVED, DENIED, READY_TO_EMAIL, COMPLETED } from 'constants/status';

import { PDF_TYPES } from 'constants/data';
import { downloadTranscript } from 'services/download';
import { approveStatus, denyRequest, resendTranscript, updateStatus } from 'services/orders';

export const VIEW_TITLE = 'View Details';
export const REVIEW_TITLE = 'Start Review';
export const SHOW_REVIEW_TITLE = 'Show Review';
export const APPROVE_TITLE = 'Approve Request';
export const DENY_TITLE = 'Deny Request';
export const RESEND_TITLE = 'Resend Transcript';
export const DOWNLOAD_TITLE = 'Download Transcript';
export const READY_TO_EMAIL_TITLE = 'Email Queued';

export const VIEW_DETAILS = {
  title: VIEW_TITLE,
};

export const SHOW_REVIEW = {
  title: SHOW_REVIEW_TITLE
}

export const REVIEW = {
  title: REVIEW_TITLE,
  callback: async id => {
    const res = await updateStatus(READY_TO_EMAIL, id);
    try {
      return { message: 'The request has been added in a queue.You will get an email soon.', data: READY_TO_EMAIL };
    } catch (e) {
      return { message: res.message };
    }

  }
};

export const READY_TO_EMAIL_REQUEST = {
  title: READY_TO_EMAIL_TITLE
}

export const APPROVE_REQUEST = {
  title: APPROVE_TITLE,
  callback: async id => {
    const res = await approveStatus(APPROVED, id);

    return { message: res, data: APPROVED };
  },
};

export const DENY_REQUEST = {
  title: DENY_TITLE,
  callback: async id => {
    const res = await denyRequest(DENIED, id);

    return { message: res, data: DENIED };
  },
};

export const RESEND_TRANSCRIPT = {
  title: RESEND_TITLE,
  callback: async (id, studentName, type, status) => {
    let resendStatus = APPROVED;
    if (type === PDF_TYPES.ropPDF.value) {
      if (status === COMPLETED) {
        resendStatus = READY_TO_EMAIL;
      }
    }

    const res = await resendTranscript(resendStatus, id);

    return { message: res, data: resendStatus };
  },
};

export const DOWNLOAD_TRANSCRIPT = {
  title: DOWNLOAD_TITLE,
  callback: async (id, studentName, type) => {
    try {
      const res = await downloadTranscript(id, type);
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');

      let fileName = '';

      if (res.type === 'application/json') {
        fileName = `${studentName}_${getTimeStamp()}.json`;
      } else if (res.type === 'application/pdf') {
        fileName = `${studentName}_${getTimeStamp()}.pdf`;
      } else {
        return {
          title: TOAST_MESSAGES.downloadFailed.title,
          message: TOAST_MESSAGES.downloadFailed.message,
          isDownload: false,
          hasDownloadFailed: true,
        };
      }

      link.href = url;
      link.download = '';
      link.setAttribute('download', fileName);
      link.rel = 'noopener noreferrer';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();

      return { title: TOAST_MESSAGES.download.title, message: TOAST_MESSAGES.download.message, isDownload: true };
    } catch (error) {
      return {
        title: TOAST_MESSAGES.downloadFailed.title,
        message: TOAST_MESSAGES.downloadFailed.message,
        isDownload: false,
        hasDownloadFailed: true,
      };
    }
  },
};

export const ACTIONS = [];

ACTIONS['STAFF'] = {
  READY_TO_REVIEW: [REVIEW, DENY_REQUEST],
  PROCESSING: [VIEW_DETAILS],
  EMAIL_QUEUED: [VIEW_DETAILS],
  DENIED: [APPROVE_REQUEST, VIEW_DETAILS],
  FAILED: [RESEND_TRANSCRIPT, VIEW_DETAILS],
  APPROVED: [DENY_REQUEST, VIEW_DETAILS],
  RESEND: [APPROVE_REQUEST, VIEW_DETAILS],
  PENDING: [APPROVE_REQUEST, DENY_REQUEST, VIEW_DETAILS],
  COMPLETED: [DOWNLOAD_TRANSCRIPT, RESEND_TRANSCRIPT, SHOW_REVIEW, VIEW_DETAILS],
};

ACTIONS['DISTRICT'] = {
  PROCESSING: [VIEW_DETAILS],
  APPROVED: [VIEW_DETAILS],
  PENDING: [VIEW_DETAILS],
  DENIED: [VIEW_DETAILS],
  RESEND: [VIEW_DETAILS],
  FAILED: [VIEW_DETAILS],
  EMAIL_QUEUED: [VIEW_DETAILS],
  COMPLETED: [DOWNLOAD_TRANSCRIPT, SHOW_REVIEW, VIEW_DETAILS],
};
