import moment from 'moment';
import { UpdateUserInput, User } from '@agh-kiwis/data-access';
import { UserDetailsType } from '@agh-kiwis/types';

export const mapUserDetailsToUpdateUserMutation = (
  id: number,
  formData: UserDetailsType
): UpdateUserInput => ({
  id: id,
  name: formData.name,
  birthDate: new Date(formData.birthDate),
  gender: formData.gender,
  introductionCompleted: true,
});

export const userToUserDetailsType = (user: User): UserDetailsType => ({
  name: user.name,
  birthDate: moment(user.birthDate).format('yyyy-MM-DD'),
  gender: user.gender,
});
