export const errorMessages = {
  typeOfTranscript: 'Please select any one option',
  firstName: 'First name cannot be left blank',
  lastName: 'Last name cannot be left blank',
  dob: 'DOB cannot be left blank',
  phoneNo: {
    empty: 'Phone number cannot be left blank',
    invalid: 'Invalid phone number',
  },
  address: 'Address cannot be left blank',
  industrySectors: 'Please select any one option',
  classDescription: 'Classes description cannot be left blank',
  yearsAttended: 'Attended year cannot be left blank',
  districtName: 'Please select any one option',
  releaseToName: 'Release to name cannot be left blank',
  releaseToEmail: {
    empty: 'Release to email cannot be left blank',
    invalid: 'Release to email address is invalid',
  },
  districtStudentSSID: 'District student SSID cannot be left blank',
  signature: {
    empty: 'Signature cannot be left blank',
    size: 'This file size is large, maximum filesize support is 200kb ',
    invalid: 'Only jpeg or png image are accepted',
  },
  length: 'You have reached your maximum limit of characters. Maximum limit of 100 characters are  allowed',
  date: {
    today: 'Today can not be selected as Date of Birth. Please select valid Date',
    future: 'Future dates can not be select as Date of Birth. Please select valid Date',
  },
  verify: {
    noFileSelected: 'File not selected',
    fileTypeError: 'Only PDF file format is supported',
    pdfInvalid: 'Invalid transcript',
    fallback: 'Could not verify the transcript',
  },
};

export const isEmptyPassword = 'Password can not be empty';
export const isWeakPassword =
  'Password must have at least one lowercase letter, one uppercase letter, one digit, one special character , and is at least eight characters long';
export const isOldPassword = 'Old password can not be a new password.';
export const isUnmatchedPassword = `Passwords didn't match. Try again.`;
export const passwordErrorMessages = {
  currentPassword: {
    isEmpty: `Current ${isEmptyPassword}`,
    isStrong: isWeakPassword,
  },
  newPassword: {
    isEmpty: `New ${isEmptyPassword}`,
    isStrong: isWeakPassword,
    isUnique: isOldPassword,
  },
  confirmPassword: {
    isEmpty: `Confirm ${isEmptyPassword}`,
    isStrong: isWeakPassword,
    isUnique: isUnmatchedPassword,
  },
};
