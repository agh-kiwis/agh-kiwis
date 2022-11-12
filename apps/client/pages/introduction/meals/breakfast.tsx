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
import { initialBreakfastPreferences } from '../../../formConfig/introductionInitialValues';

const Breakfast: React.FC = () => {
  const [addConstTaskMutation] = useAddConstTaskMutation();

  const handleSubmit = async (values: ConstTaskType) => {
    handleConstTaskSubmit(
      values,
      addConstTaskMutation,
      '/introduction/meals/dinner'
    );
  };

  return (
    <ConstTaskForm
      initialValues={initialBreakfastPreferences}
      durationInputFields={durationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      repeatEverySelectField={repeatEverySelectField}
      repeatEveryAmountFields={repeatEveryAmountFields}
      onSubmit={handleSubmit}
      isInEditMode={false}
      isInIntroductionMode={true}
      customText="When do You eat breakfast?"
    />
  );
};

export default Breakfast;
