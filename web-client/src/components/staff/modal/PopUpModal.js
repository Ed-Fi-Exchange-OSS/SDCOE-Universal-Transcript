import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { UiTimes } from 'vyaguta-icons/ui';

import { ConfirmationModal, Loading } from 'components/common';
import { CourseTable } from 'components/staff/reviewCourse/CourseTable';

import { parseString } from 'utils/parseString';
import { success, error } from 'utils/toast';
import { downloadTranscript } from 'utils/download';
import { textTransform } from 'utils/transformText';

import { getRopCoursesByRequestId, requestROPTranscript, updateROPTranscript } from 'services/ropCourse';

Modal.setAppElement('#root');

export default function PopUpModal(props) {
  const [ropCourses, setRopCourses] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [requestedRopCourses, setRequestedRopCourses] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadAvailable, setIsDownloadAvailable] = useState(false);
  const [isSendAvailable, setIsSendAvailable] = useState(false);

  const { btnClass, btnLabel, data, handleAction, isDisabled } = props;
  const {
    requestId,
    firstName,
    lastName,
    dob,
    industrySectors,
    classDescription,
    yearsAttended,
    districtName,
    typeOfTranscript,
    mrTranscript,
  } = data;
  let mrStudentRecords;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  try {
    let records = JSON.parse(mrTranscript);
    mrStudentRecords = records.studentTranscript.studentAcademicRecords;
  } catch (e) {
    console.log(e.message);
  }

  useEffect(() => {
    const getRopCourses = async (requestId) => {
      const selectedCourse = await getRopCoursesByRequestId(requestId);

      if (selectedCourse.length && !isDisabled) {
        setIsDownloadAvailable(true);
      }

      setRopCourses(selectedCourse);
    };
    getRopCourses(requestId);
  }, [requestId, modalIsOpen, isDisabled])

  const submitRequest = async () => {
    //archieve existing rop courses for particular requestId
    const ropCourses = await getRopCoursesByRequestId(requestId);
    if (ropCourses.length) {
      for (let course of ropCourses) {
        course.isArchieved = true;
        await updateROPTranscript(course, course.id);
      }
    }

    const selectedCourses = requestedRopCourses.filter(course => course.requestedROPTranscript === true || course.requestedROPCertificate === true);
    const response = await requestROPTranscript(selectedCourses);

    try {
      if (response) {
        success({ title: 'Requests for rop certificate saved successfully.', message: `${response.messages}` });
        setIsDownloadAvailable(true);
        setIsSendAvailable(true);
      }
    } catch (e) {
      error({ title: 'Error while saving data', message: `${e.message}` });
    }
  }

  const handleConfirmation = async () => {
    setConfirmation(false);
    return await handleAction();
  }

  const handleDownload = async () => {
    setIsDownloadAvailable(false);
    setIsDownloading(true);
    const studentName = textTransform(firstName + lastName, 'lowercase');
    let res = await downloadTranscript(requestId, studentName, typeOfTranscript);
    try {
      if (res) setIsDownloading(false)
    } catch (e) {
      error({ title: 'Error while downloading pdf', message: `${e.message}` });
    }

  }

  return (
    <>
      <button onClick={openModal} className={btnClass ? btnClass : null}>
        {btnLabel}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        className="sdcoe-modal"
        overlayClassName="sdcoe-modal__overlay"
      >
        <div className="sdcoe-modal__header">
          <div className="sdcoe-modal__title-info">
            <h1 className="sdcoe-modal__title">Review ROP Request</h1>
            <p className="sdcoe-modal__description">{`${isDisabled ? 'Selected' : 'Select the '}  ROP format for the requested courses`}</p>
          </div>
          <UiTimes onClick={closeModal} className="sdcoe-modal__close" />
        </div>
        <div className="sdcoe-modal__body">
          <div className="sdcoe-modal__sidebar-info">
            <h5 className="sdcoe-modal__subtitle">Request Details</h5>
            <table className="info-table sdcoe-modal__table">
              <tbody>
                <tr>
                  <td>Student Name:</td>
                  <td>{`${firstName} ${lastName}` || '--'}</td>
                </tr>
                <tr>
                  <td>DOB:</td>
                  <td>{dob || '--'}</td>
                </tr>
                <tr>
                  <td>Industry Sectors</td>
                  <td>{(industrySectors && parseString(industrySectors)) || '--'}</td>
                </tr>
                <tr>
                  <td>Classes Description:</td>
                  <td>{classDescription || '--'}</td>
                </tr>
                <tr>
                  <td>Year(s) Attended:</td>
                  <td>{(yearsAttended && parseString(yearsAttended)) || '--'}</td>
                </tr>
                <tr>
                  <td>District Name:</td>
                  <td>{districtName || '--'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sdcoe-modal__table-wrapper">
            {isDownloading && <Loading />}
            <CourseTable
              mrStudentRecords={mrStudentRecords}
              requestId={requestId}
              enableSave={setEnableSave}
              ropCourses={ropCourses}
              handleDownloadAvailable={setIsDownloadAvailable}
              submitRequest={submitRequest}
              requestedRopCourses={setRequestedRopCourses}
              handleConfirmation={setConfirmation}
              handleSendAvailable={setIsSendAvailable}
              isDisabled={isDisabled}
            />
          </div>
        </div>
        <div className="sdcoe-modal__footer">
          <div className="sdcoe-modal__footer-btn-wrapper">
            <button
              className={`btn ${isDownloadAvailable ? 'btn--secondary' : 'btn--secondary-disabled'}`}
              onClick={handleDownload}
            >
              Download
            </button>

            <button
              className={`btn ${(enableSave && !isDownloadAvailable && !isDisabled) || isSendAvailable ? 'btn--primary' : 'btn--primary-disabled'}`}
              onClick={isSendAvailable ? () => { setConfirmation(true) } : submitRequest}>
              {isSendAvailable ? 'Send' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>
      {confirmation &&
        <ConfirmationModal
          title={'Confirm'}
          description={'Please confirm that you want to send the generated Transcript(s) and Certificate(s)?'}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
          handleConfirmation={handleConfirmation}
        />
      }
    </>
  );
}
