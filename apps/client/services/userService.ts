import { UpdateUserInput } from '@agh-kiwis/data-access';
import { UserDetailsType } from '@agh-kiwis/types';

export const mapUpdateUserMutation = (
  id: number,
  formData: UserDetailsType
): UpdateUserInput => {
  return {
    id: id,
    name: formData.name,
    birthDate: new Date(formData.birthDate),
    gender: formData.gender,
  };
};
