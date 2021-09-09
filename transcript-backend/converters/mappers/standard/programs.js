const { DEFAULT_VALUE } = require('../../../transcripts/constants');
const Programs = require('../../../transcripts/standard/programs');

function mapPrograms(programs) {
  if (!programs) {
    return [];
  }

  const studentPrograms = programs.map((studentProgram) => {

    const program = new Programs();

    program.studentUniqueID = studentProgram?.studentUniqueID || DEFAULT_VALUE;
    program.educationOrganizationId = studentProgram?.educationOrganizationId || DEFAULT_VALUE;
    program.nameOfInstitution = studentProgram?.nameOfInstitution || DEFAULT_VALUE;
    program.schoolYear = studentProgram?.schoolYear || DEFAULT_VALUE;
    program.term = studentProgram?.term || DEFAULT_VALUE;
    program.gradeLevel = studentProgram?.gradeLevel || DEFAULT_VALUE;
    program.programID = studentProgram?.programID || DEFAULT_VALUE;
    program.programTypeDescriptor = studentProgram?.programTypeDescriptor || DEFAULT_VALUE;
    program.programTitle = studentProgram?.programName || DEFAULT_VALUE;
    program.beginDate = studentProgram?.beginDate || DEFAULT_VALUE;
    program.endDate = studentProgram?.endDate || DEFAULT_VALUE;
    program.reasonExitedDescriptor = studentProgram?.reasonExitedDescriptor || DEFAULT_VALUE;

    return program;
  });

  return studentPrograms;
}

module.exports = mapPrograms;
