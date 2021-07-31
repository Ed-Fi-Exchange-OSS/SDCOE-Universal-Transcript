class Valid {
  constructor(form) {
    this.form = form;
    this.email = document.getElementById('releaseEmail');
    this.studentName = document.getElementById('studentName');
    this.select = document.getElementById('transcriptType');
    this.init();
  }

  init() {
    this.login();
  }

  login() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      this.checkInputs();
    });
  }

  checkInputs() {
    const emailValue = this.email.value.trim();
    const studentNameValue = this.studentName.value.trim();
    const selectValue = this.select.value;

    const fieldMessage = 'Required field cannot be left blank'
    const selectMessage = 'Please select any one option'


    if (emailValue === '') {
      this.setErrorFor(this.email, fieldMessage);
    }

    if (studentNameValue === '') {
      this.setErrorFor(this.studentName, fieldMessage);
    }
    if (selectValue === '') {
      this.setErrorFor(this.select, selectMessage);
    }
  }

  setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('.form-text-error');
    formGroup.className = 'form-group form-group--required form-group--error';
    small.innerText = message;
  }
}
const form = document.getElementById('student-transcript-form')
var valid = new Valid(form);
