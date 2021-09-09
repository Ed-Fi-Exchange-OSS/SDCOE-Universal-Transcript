import { IMAGE_SIZE_LIMIT, CHARACTER_LIMIT } from 'constants/validation';

export const validImageType = type => {
  const imageReg = /[/.](jpg|jpeg|png)$/i;
  return imageReg.test(type);
};

export const validFileSize = size => {
  return size <= IMAGE_SIZE_LIMIT * 1024;
};

export const validEmail = email => {
  const emailReg = RegExp(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );

  return emailReg.test(email);
};

export const validInputLength = val => {
  return val.length <= CHARACTER_LIMIT;
};

export const validDate = date => {
  date = new Date(date);
  const today = new Date();
  if (date >= today) {
    return false;
  }
  return true;
};

export const isValidTranscriptFile = fileType => fileType === 'application/pdf';
