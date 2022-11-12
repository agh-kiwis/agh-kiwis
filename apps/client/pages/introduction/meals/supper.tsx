import {
  chillTimeInputFields,
  durationInputFields,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from 'apps/client/formConfig/initialValues';
import { handleConstTaskSubmit } from 'apps/client/services/taskService';
import { useAddConstTaskMutation } from '@agh-kiwis/data-access';
import { ConstTaskType } from '@agh-kiwis/types';
import { ConstTaskForm } from '@agh-kiwis/ui-components';
import { initialSupperPreferences } from '../../../formConfig/introductionInitialValues';

const Supper: React.FC = () => {
  const [addConstTaskMutation] = useAddConstTaskMutation();

  const handleSubmit = async (values: ConstTaskType) => {
    handleConstTaskSubmit(values, addConstTaskMutation, '/');
  };

  return (
    <ConstTaskForm
      initialValues={initialSupperPreferences}
      durationInputFields={durationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      repeatEverySelectField={repeatEverySelectField}
      repeatEveryAmountFields={repeatEveryAmountFields}
      onSubmit={handleSubmit}
      isInEditMode={false}
      isInIntroductionMode={true}
      customText="When do You eat supper?"
    />
  );
};

export default Supper;
