// Use a Toast Library

import { notify } from 'components/common/Toast';

import { APPROVED, DENIED, RESEND, FAILED, PROCESSING, COMPLETED, READY_TO_EMAIL } from 'constants/status';
import { TOAST_MESSAGES } from 'constants/toast';

export function toast(data, message) {
  switch (data) {
    case APPROVED: {
      success({ title: TOAST_MESSAGES.success.title, message: message || TOAST_MESSAGES.success.message });
      break;
    }
    case DENIED: {
      error({ title: TOAST_MESSAGES.error.title, message: message || TOAST_MESSAGES.error.message });
      break;
    }
    case RESEND: {
      success({ title: TOAST_MESSAGES.success.title, message: message || TOAST_MESSAGES.success.message });
      break;
    }
    case FAILED: {
      success({ title: TOAST_MESSAGES.success.title, message: message || TOAST_MESSAGES.success.message });
      break;
    }
    case COMPLETED: {
      success({ title: TOAST_MESSAGES.success.title, message: message || TOAST_MESSAGES.success.message });
      break;
    }
    case PROCESSING: {
      success({ title: TOAST_MESSAGES.success.title, message: message || TOAST_MESSAGES.success.message });
      break;
    }

    case READY_TO_EMAIL: {
      success({ title: TOAST_MESSAGES.readyToEmail.title, message: message || TOAST_MESSAGES.readyToEmail.message });
      break;
    }

    default: {
      error({ title: TOAST_MESSAGES.noOption.title, message: TOAST_MESSAGES.noOption.message });
      break;
    }
  }
}

export function success({ title, message }) {
  notify({ type: 'success', message: { title, message } });
}

export function error({ title, message }) {
  notify({ type: 'danger', message: { title, message } });
}

export function warning({ title, message }) {
  notify({ type: 'warning', message: { title, message } });
}
