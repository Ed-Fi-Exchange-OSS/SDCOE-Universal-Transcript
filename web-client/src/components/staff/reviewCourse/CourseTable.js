import React, { useMemo, useEffect, useCallback } from 'react';
import useState from 'hooks/useStateRef';

import { Checkbox } from 'components/common';
import { RowSelectionTable } from 'components/common/tables';
import Loading from 'components/common/Loading';

export const CourseTable = ({
  mrStudentRecords,
  requestId,
  enableSave,
  ropCourses,
  isDisabled,
  handleDownloadAvailable,
  requestedRopCourses,
  handleConfirmation,
  handleSendAvailable,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Add gradeLevel & term i.e schoolYear_Descriptor 2021_Fall
  const studentRecordWithGradeTerm = mrStudentRecords.map(record => {
    let gradeLevel = record.gradeLevel
      ? `${record.gradeLevel.substr(record.gradeLevel.indexOf('#') + 1, record.gradeLevel.length).split(' ')[0]}`
      : '--';
    let term = `${
      record.termDescriptor.substr(record.termDescriptor.indexOf('#') + 1, record.termDescriptor.length).split(' ')[0]
    }_${record.schoolYear}`;

    for (let course of record.courseTranscript) {
      course.gradeLevel = gradeLevel;
      course.courseTerm = term;
    }

    return record;
  });

  // concat list of courses from arrays of  courseTranscript
  const courseDetails = [].concat.apply(
    [],
    studentRecordWithGradeTerm.map(record => record.courseTranscript)
  );

  //Add by default requestedROPTranscript & requestedRopCertificate to false
  let courseTranscripts = courseDetails.map(course => {
    return {
      ...course,
      requestId,
      requestedROPTranscript: false,
      requestedROPCertificate: false,
    };
  });

  // merge rop courses with large course transcripts
  courseTranscripts = ropCourses.concat(filterSelectedCourse(courseTranscripts, ropCourses));

  // filter the already selected course from the large courseTranscripts
  function filterSelectedCourse(courseTranscripts, ropCourses) {
    if (!ropCourses.length) {
      return courseTranscripts;
    }

    return courseTranscripts.filter(
      transcript =>
        !ropCourses.some(
          course =>
            transcript.requestId === course.requestId &&
            transcript.courseCode === course.courseCode &&
            transcript.courseTerm === course.courseTerm
        )
    );
  }

  const [selectedCourses, setSelectedCourses, selectedCoursesRef] = useState(courseTranscripts);

  // enables save if any certificate/transcrip is requested
  const handleSave = useCallback(() => {
    if (
      selectedCoursesRef.current.some(
        course => course.requestedROPTranscript === true || course.requestedROPCertificate === true
      )
    ) {
      return enableSave(true);
    }

    return enableSave(false);
  }, [enableSave, selectedCoursesRef]);

  // handles the rop certificate/transcript requests i.e checked/unchecked
  const handleRopRequest = useCallback(
    (e, courseCode, courseTerm, key) => {
      let currentCourses = selectedCoursesRef.current;
      const requestedTranscriptCourse = currentCourses.map(course => {
        if (course.courseCode === courseCode && course.courseTerm === courseTerm) {
          return { ...course, [key]: !course[key] };
        }
        return course;
      });

      setSelectedCourses(requestedTranscriptCourse);
      handleSave();
      handleDownloadAvailable(false);
      handleConfirmation(false);
      handleSendAvailable(false);
    },
    [
      handleSave,
      setSelectedCourses,
      selectedCoursesRef,
      handleDownloadAvailable,
      handleConfirmation,
      handleSendAvailable,
    ]
  );

  useEffect(() => {
    handleSave();
    requestedRopCourses(selectedCourses);
    setIsLoading(false);
  }, [selectedCourses, handleSave, requestedRopCourses]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'courseCode',
      },
      {
        Header: 'Course Title',
        accessor: 'courseTitle',
      },
      {
        Header: 'Term',
        accessor: 'courseTerm',
      },
      {
        Header: 'Grade',
        accessor: 'gradeLevel',
      },
      {
        Header: 'ROP Transcript',
        accessor: 'requestedROPTranscript',
        className: 'text-center',
        Cell: ({
          row: {
            original: { requestedROPTranscript },
            original,
          },
        }) => {
          return (
            <Checkbox
              checked={requestedROPTranscript}
              fieldKey={'requestedROPTranscript'}
              onChange={handleRopRequest}
              values={original}
            />
          );
        },
      },
      {
        Header: 'ROP Certificate',
        accessor: 'requestedROPCertificate',
        className: 'text-center',
        Cell: ({
          row: {
            original: { requestedROPCertificate },
            original,
          },
        }) => {
          return (
            <Checkbox
              checked={requestedROPCertificate}
              fieldKey={'requestedROPCertificate'}
              onChange={handleRopRequest}
              values={original}
            />
          );
        },
      },
    ],
    [handleRopRequest]
  );

  return isLoading ? (
    <Loading />
  ) : (
    <RowSelectionTable
      data={selectedCourses}
      columns={columns}
      showPagination={false}
      defaultPageSize={-1}
      isDisabled={isDisabled}
    />
  );
};
