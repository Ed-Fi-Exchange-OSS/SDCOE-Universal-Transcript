class PasswordValidation {
  constructor(currentPassword, newPassword) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }

  hasStrongPassword() {
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    return strongPassword.test(this.currentPassword);
  }

  isEmpty() {
    if (this.currentPassword) return false;
    return true;
  }

  isPasswordUnique() {
    if (this.newPassword === this.currentPassword) return false;
    return true;
  }
}

export const isValidPassword = (newPassword, currentPassword) => {
  const pass = new PasswordValidation(newPassword, currentPassword);
  const isPasswordEmpty = pass.isEmpty();
  const isStrongPassword = pass.hasStrongPassword();
  const isPasswordUniq = pass.isPasswordUnique();

  return {
    isEmpty: isPasswordEmpty,
    isStrong: isStrongPassword,
    isUnique: isPasswordUniq,
  };
};
