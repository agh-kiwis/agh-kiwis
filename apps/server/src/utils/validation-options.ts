import { ValidationError, ValidationPipeOptions } from '@nestjs/common';
import { FieldError } from '../auth/dto/auth-user.response';

// TODO Add own validations message & change error messages structure
const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) =>
    ({
      field: 'field',
      message: 'message',
    } as FieldError),
};

export default validationOptions;
