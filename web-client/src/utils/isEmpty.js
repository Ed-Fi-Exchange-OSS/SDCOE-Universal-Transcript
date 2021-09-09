import isEmpty from 'lodash/isEmpty';

// checks if an object contains empty values or not
export const checkEmpty = object => isEmpty(object) || !Object.values(object).some(x => !isEmpty(x));
