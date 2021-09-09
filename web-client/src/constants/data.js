import { generateYears } from 'utils/generateYears';

export const PDF_TYPES = {
  standardPDF: {
    label: 'Standard PDF',
    value: 'standard pdf',
  },
  jsonPDF: {
    label: 'JSON',
    value: 'json',
  },
  ropPDF: {
    label: 'ROP PDF',
    value: 'rop',
  },
};

export const REQUEST_TYPE = { student: 'student', district: 'district' };

export const typeOfTranscript = [PDF_TYPES.standardPDF, PDF_TYPES.ropPDF];

export const typeOfTranscriptForDistrict = [PDF_TYPES.standardPDF, PDF_TYPES.jsonPDF, PDF_TYPES.ropPDF];

export const industrySectors = [
  { label: 'Agriculture and Natural Resources Arts', value: 'Agriculture and Natural Resources' },
  { label: 'Arts, Media, and Entertainment', value: 'Arts, Media, and Entertainment' },
  { label: 'Building and Construction Trades', value: 'Building and Construction Trades' },
  { label: 'Business and Finance', value: 'Business and Finance' },
  {
    label: 'Education, Child Development, and Family Services',
    value: 'Education, Child Development, and Family Services',
  },
  { label: 'Energy, Environment, and Utilities', value: 'Energy, Environment, and Utilities' },
  { label: 'Engineering and Architecture', value: 'Engineering and Architecture' },
  { label: 'Fashion and Interior Design', value: 'Fashion and Interior Design' },
  { label: 'Health Science and Medical Technology', value: 'Health Science and Medical Technology' },
  { label: 'Hospitality, Tourism, and Recreation', value: 'Hospitality, Tourism, and Recreation' },
  { label: 'Information and Communication Technology', value: 'Information and Communication Technology' },
  { label: 'Manufacturing and Product Development', value: 'Manufacturing and Product Development' },
  { label: 'Marketing, Sales, and Service', value: 'Marketing, Sales, and Service' },
  { label: 'Public Services', value: 'Public Services' },
  { label: 'Transportation', value: 'Transportation' },
];

const generateAttendedYears = () => {
  let attendedYears = [];
  attendedYears = generateYears().map(year => {
    return { label: year, value: year };
  });
  return attendedYears;
};

export const attendedYears = generateAttendedYears();
