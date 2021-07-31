export const orderMappings = (order) => {
  return {
    request_id: order.requestId,
    type_of_transcript: order.typeOfTranscript,
    first_name: order.firstName,
    last_name: order.lastName,
    dob: order.dob,
    phone_no: order.phoneNo,
    address: order.address,
    industry_sectors: order.industrySectors,
    class_description: order.classDescription,
    years_attended: order.yearsAttended,
    district_name: order.districtName,
    release_to_name: order.releaseToName,
    release_to_email: order.releaseToEmail,
    requested_by: order.requestedBy,
    requested_type: order.requestedType,
    request_date: order.requestDate,
    CDS_code: order.CDScode,
    district_student_ssid: order.districtStudentSSID,
    signature: order.signature,
    signature_date: order.signatureDate,
    upload_signature_filename: order.uploadSignatureFilename,
    mr_transcript: order.mrTranscript,
    status: order.status
  };
};
