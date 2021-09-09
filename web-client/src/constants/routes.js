import { TranscriptRequestByStudent } from 'components/student';
import { TranscriptRequestByDistrict } from 'components/district';
import { RequestedTranscriptStaff } from 'components/staff';
import { RequestedTranscriptDistrict } from 'components/district';
import { TranscriptValidate } from 'components/validate';
import { ChangePassword } from 'components/auth/ChangePassword';

export const HOME = '/';
export const LOGIN = '/login';
export const AUTH = '/auth/callback';
export const RESET_PASSWORD = '/reset-password';
export const CHANGE_PASSWORD = '/change-password';
export const FORGOT_PASSWORD = '/forgot-password';

export const VALIDATE_TRANSCRIPT = '/validate-transcript';
export const REQUEST_TRANSCRIPT_DISTRICT = '/request-transcript-district';
export const REQUEST_TRANSCRIPT_STUDENT = '/request-transcript-student';
export const REQUESTED_TRANSCRIPT_STAFF = '/requested-transcript-staff';
export const REQUESTED_TRANSCRIPT_DISTRICT = '/requested-transcript-district';

export const STAFF = 'staff';
export const PUBLIC = 'public';
export const DISTRICT = 'district';

export const ALLOWED_ROUTES = {
  [STAFF]: [
    { to: REQUESTED_TRANSCRIPT_STAFF, component: RequestedTranscriptStaff },
    { to: CHANGE_PASSWORD, component: ChangePassword },
  ],
  [DISTRICT]: [
    { to: REQUEST_TRANSCRIPT_DISTRICT, component: TranscriptRequestByDistrict },
    { to: REQUESTED_TRANSCRIPT_DISTRICT, component: RequestedTranscriptDistrict },
    { to: VALIDATE_TRANSCRIPT, component: TranscriptValidate },
    { to: CHANGE_PASSWORD, component: ChangePassword },
  ],
  [PUBLIC]: [
    { to: REQUEST_TRANSCRIPT_STUDENT, component: TranscriptRequestByStudent },
    { to: VALIDATE_TRANSCRIPT, component: TranscriptValidate },
  ],
};
