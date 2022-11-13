import { useAddConstTaskMutation } from '@agh-kiwis/data-access';
import { ConstTaskType } from '@agh-kiwis/types';
import { ConstTaskForm } from '@agh-kiwis/ui-components';
import {
  chillTimeInputFields,
  durationInputFields,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from '../../../formConfig/initialValues';
import { initialBreakfastPreferences } from '../../../formConfig/introductionInitialValues';
import { handleConstTaskSubmit } from '../../../services/taskService';

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
      nextStep="/introduction/meals/dinner"
    />
  );
};

export default Breakfast;
