export const orderSerialize = (orders) => {
  return orders.map(order => {
    return {
      requestId: order.request_id,
      requestedBy: order.requested_by,
      requestedType: order.requested_type,
      firstName: order.first_name,
      lastName: order.last_name,
      phoneNo: order.phone_no,
      address: order.address,
      dob: order.dob,
      typeOfTranscript: order.type_of_transcript,
      requestDate: order.request_date,
      status: order.status,
      CDSCode: order.CDS_code,
      districtName: order.district_name,
      districtStaffName: order.district_staff_name,
      districtStudentSSID: order.district_student_ssid,
      industrySectors: order.industry_sectors,
      classDescription: order.class_description,
      yearsAttended: order.years_attended,
      releaseToName: order.release_to_name,
      releaseToEmail: order.release_to_email,
      signature: order.signature,
      signatureDate: order.signature_date,
      uploadSignatureFilename: order.upload_signature_filename,
      mrTranscript: order.mr_transcript,
    };
  });
};
