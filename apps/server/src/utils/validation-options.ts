import { ValidationError, ValidationPipeOptions } from '@nestjs/common';

// TODO Change this to follow up the same error pattern (maybe)
// This can be used in main.ts as GlobalValidationPipe
const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) => ({
    field: 'field',
    message: 'message',
  }),
};

export default validationOptions;
