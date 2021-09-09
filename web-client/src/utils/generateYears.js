import { BASE_YEAR } from 'constants/validation';

export const generateYears = baseYear => {
  let currentYear = new Date().getFullYear(),
    years = [];
  baseYear = baseYear || BASE_YEAR;
  years = Array.from({ length: currentYear - BASE_YEAR + 1 }, (val, key) => key + BASE_YEAR);
  return years;
};
