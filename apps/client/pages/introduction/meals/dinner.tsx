import { useAddConstTaskMutation } from '@agh-kiwis/data-access';
import { ConstTaskType } from '@agh-kiwis/types';
import { ConstTaskForm } from '@agh-kiwis/ui-components';
import {
  chillTimeInputFields,
  durationInputFields,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from '../../../formConfig/initialValues';
import { initialDinnerPreferences } from '../../../formConfig/introductionInitialValues';
import { handleConstTaskSubmit } from '../../../services/taskService';

const Dinner: React.FC = () => {
  const [addConstTaskMutation] = useAddConstTaskMutation();

  const handleSubmit = async (values: ConstTaskType) => {
    handleConstTaskSubmit(
      values,
      addConstTaskMutation,
      '/introduction/meals/supper'
    );
  };

  return (
    <ConstTaskForm
      initialValues={initialDinnerPreferences}
      durationInputFields={durationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      repeatEverySelectField={repeatEverySelectField}
      repeatEveryAmountFields={repeatEveryAmountFields}
      onSubmit={handleSubmit}
      isInEditMode={false}
      isInIntroductionMode={true}
      customText="When do You eat dinner?"
      nextStep="/introduction/meals/supper"
    />
  );
};

export default Dinner;
