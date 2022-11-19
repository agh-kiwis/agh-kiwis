import {
  useAddConstTaskMutation,
  useGetCategoriesQuery,
} from '@agh-kiwis/data-access';
import { ConstTaskType } from '@agh-kiwis/types';
import { ConstTaskForm, CustomSpinner } from '@agh-kiwis/ui-components';
import {
  chillTimeInputFields,
  durationInputFields,
  repeatEveryAmountFields,
  repeatEverySelectField,
} from '../../../formConfig/initialValues';
import { initialBreakfastPreferences } from '../../../formConfig/introductionInitialValues';
import { handleConstTaskSubmit } from '../../../services/taskService';

const Breakfast: React.FC = () => {
  const { data, loading } = useGetCategoriesQuery();
  const [addConstTaskMutation] = useAddConstTaskMutation();

  const handleSubmit = async (values: ConstTaskType) => {
    handleConstTaskSubmit(
      values,
      addConstTaskMutation,
      '/introduction/meals/dinner'
    );
  };

  if (loading) {
    return <CustomSpinner />;
  }
  return (
    <ConstTaskForm
      initialValues={initialBreakfastPreferences(
        data?.getCategories?.find((category) => category.name === 'Meals')
      )}
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
