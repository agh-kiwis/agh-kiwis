import { ValidationError, ValidationPipeOptions } from '@nestjs/common';
import { CustomValidationErrors } from './CustomValidationError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformErrorMessages = (errorMessages: any): string[] => {
  errorMessages = Object.values(errorMessages);
  return errorMessages.map((message: string) => {
    return message.trim().charAt(0).toUpperCase() + message.slice(1);
  });
};

const validationOptions: ValidationPipeOptions = {
  transform: true,

  exceptionFactory: (errors: ValidationError[]) =>
    new CustomValidationErrors({
      errors: errors.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.property]: transformErrorMessages(
            currentValue.constraints
          ),
        }),
        []
      ),
    }),
};

export default validationOptions;
