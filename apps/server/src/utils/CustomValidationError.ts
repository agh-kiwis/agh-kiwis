import { ApolloError } from 'apollo-server-errors';

export type CustomValidationError = {
  field: string;
  message: string;
};

export type CustomValidationErrorsOptions = {
  errors?: CustomValidationError[];
  message?: string;
  code?: string;
};

// There we could possibly extract to our own error class
export class CustomValidationErrors extends ApolloError {
  constructor(options: CustomValidationErrorsOptions) {
    const messageToSend = options.message || 'Validation error';
    const codeToSend = options.code || 'VALIDATION_ERROR';
    super(messageToSend, codeToSend);

    for (const key in options.errors) {
      this[key] = options.errors[key];
    }
  }
}
