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
import { initialSupperPreferences } from '../../../formConfig/introductionInitialValues';
import { handleConstTaskSubmit } from '../../../services/taskService';

const Supper: React.FC = () => {
  const { data, loading } = useGetCategoriesQuery();
  const [addConstTaskMutation] = useAddConstTaskMutation();

  const handleSubmit = async (values: ConstTaskType) => {
    handleConstTaskSubmit(
      values,
      addConstTaskMutation,
      '/introduction/summary'
    );
  };

  if (loading) {
    return <CustomSpinner />;
  }
  return (
    <ConstTaskForm
      initialValues={initialSupperPreferences(
        data?.getCategories?.find((category) => category.name === 'Meals')
      )}
      durationInputFields={durationInputFields}
      chillTimeInputFields={chillTimeInputFields}
      repeatEverySelectField={repeatEverySelectField}
      repeatEveryAmountFields={repeatEveryAmountFields}
      onSubmit={handleSubmit}
      isInEditMode={false}
      isInIntroductionMode={true}
      customText="When do You eat supper?"
      nextStep="/introduction/summary"
    />
  );
};

export default Supper;
