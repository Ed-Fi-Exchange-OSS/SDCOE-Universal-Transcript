import { TOAST_MESSAGES } from 'constants/toast';
import { getTimeStamp } from 'utils/getTimeStamp';

import { downloadTranscript as download } from 'services/download';

export const downloadTranscript = async (id, studentName, type) => {
  try {
    const res = await download(id, type);
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
}