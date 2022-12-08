const validateUsername = (username: string) => {
  if (!username) {
    return {
      isValid: false,
      errorType: 'required',
      errorMessage: 'Username is required!'
    };
  }

  const pattern = /^[a-z0-9_.]+$/;
  if (!pattern.test(username)) {
    return {
      isValid: false,
      errorType: 'pattern',
      errorMessage: 'Username is invalid!'
    };
  }

  return {
    isValid: true
  };
};

const validatePassword = (password: string) => {
  if (!password) {
    return {
      isValid: false,
      errorType: 'required',
      errorMessage: 'Password is required!'
    };
  }

  const pattern = /^[a-z0-9_.]+$/;
  if (!pattern.test(password)) {
    return {
      isValid: false,
      errorType: 'pattern',
      errorMessage: 'Password is invalid!'
    };
  }

  return {
    isValid: true
  };
};

export const validations = {
  username: validateUsername,
  password: validatePassword
};
