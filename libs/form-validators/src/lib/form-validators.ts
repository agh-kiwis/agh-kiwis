export const validateEmail = (value: string): string => {
  if (!value) {
    return 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return '';
};

export const validateNotEmpty = (value: string): string => {
  if (!value) {
    return 'Required';
  }
  return '';
};
