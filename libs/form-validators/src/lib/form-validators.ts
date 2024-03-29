import * as Yup from 'yup';
import { MAX_INPUT_LENGTH } from '@agh-kiwis/workspace-constants';

export const CredentialSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address!').required('Required!'),
  password: Yup.string().required('Required!'),
});

export const TaskSchema = Yup.object({
  category: Yup.object().shape({
    name: Yup.string().max(MAX_INPUT_LENGTH, 'Too Long!').required('Required!'),
  }),
  taskName: Yup.string()
    .max(MAX_INPUT_LENGTH, 'Too Long!')
    .required('Required!'),
});

export const UserPreferencesSchema = Yup.object().shape({
  name: Yup.string().required('Required!'),
  birthDate: Yup.date()
    .max(new Date(), 'You have to choose the date from the past!')
    .required('Required!'),
});
