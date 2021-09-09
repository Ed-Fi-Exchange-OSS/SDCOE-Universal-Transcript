import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { UiCheckCircle, UiExclamationCircle, UiTimesCircle } from 'vyaguta-icons/ui';

const ICON_SIZE = 20;

const CustomToast = ({ statusType, toastMessage }) => {
  const toasts = {
    success: {
      className: 'success',
      icon: <UiCheckCircle size={ICON_SIZE} />,
    },
    warning: {
      className: 'warning',
      icon: <UiExclamationCircle size={ICON_SIZE} />,
    },
    danger: {
      className: 'danger',
      icon: <UiTimesCircle size={ICON_SIZE} />,
    },
  };

  const toast = toasts[statusType];

  return (
    <div>
      {toast && toast !== undefined && (
        <div className={`lf-toast lf-toast--${toast.className}`}>
          <div className="lf-toast__icon">{toast.icon}</div>
          <div className="lf-toast__content">
            <span className="lf-toast__title">{toastMessage.title}</span>
            <p className="lf-toast__message">{toastMessage.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const notify = props => {
  const { type, message, autoClose, draggable } = props;
  toast(<CustomToast statusType={type} toastMessage={message} />, {
    autoClose: autoClose || 5000,
    draggable: draggable || false,
    closeButton: false,
    progressClassName: 'lf-toast__progress-bar',
    hideProgressBar: true,
    newestOnTop: 'false',
    rtl: false,
  });
};

export default function Toast() {
  return <ToastContainer className="lf-toast__container" />;
}
