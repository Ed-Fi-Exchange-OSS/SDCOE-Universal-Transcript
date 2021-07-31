export const DETAILS = {
  requestId: 'Request ID',
  requestedType: 'Request Type',
  requestedBy: 'Request By',
  typeOfTranscript: 'Format',
  requestDate: 'Requested Date',
  status: 'Status',
  firstName: 'First Name',
  lastName: 'Last Name',
  dob: 'DOB',
  phoneNo: 'Phone',
  address: 'Address',
  classDescription: 'Classes Description',
  yearsAttended: 'Years(s) Attended',
  releaseToName: 'Release to Name',
  releaseToEmail: 'Release to Email',
  uploadSignatureFilename: 'Signature Upload',
  districtStudentSSID: 'District Student SSID',
  districtName: 'District Name',
};

export const REQUEST_DETAILS = [];

REQUEST_DETAILS['STUDENT'] = [
  'status',
  'firstName',
  'lastName',
  'dob',
  'phoneNo',
  'address',
  'classDescription',
  'yearsAttended',
  'districtName',
  'releaseToName',
  'releaseToEmail',
  'uploadSignatureFilename',
];

REQUEST_DETAILS['DISTRICT'] = [
  'requestId',
  'requestedBy',
  'requestedType',
  'typeOfTranscript',
  'requestDate',
  'status',
  'firstName',
  'lastName',
  'districtStudentSSID',
  'dob',
  'districtName',
];
