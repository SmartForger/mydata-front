export const Validators = {
  username: (val, errors, key = 'username') => {
    if (!val) {
      errors[key] = 'Username is required';
    } else if (!val.match(/^\w[\w\d]*$/)) {
      errors[key] = 'Username should contain only letters and numbers';
    }
  },

  password: (val, errors, key = 'password') => {
    if (!val) {
      errors[key] = 'Password is required';
    } else if (val.length < 8) {
      errors[key] = 'Password should be at least 8 characters long';
    }
  }
}