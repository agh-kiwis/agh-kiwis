import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { FloatTaskType } from '@agh-kiwis/types';
import { InputField } from '@agh-kiwis/ui-components';
import { ESTIMATION_INFO } from '@agh-kiwis/workspace-constants';
import { InfoInputField } from '../Common/InfoInputField';

type DependentTimeEstimationFieldProps = {
  name: string;
  isEInfoOpen: boolean;
  onEInfoToggle: () => void;
  onEInfoClose: () => void;
  onModalOpen: () => void;
};

export const DependentTimeEstimationField: React.FC<
  DependentTimeEstimationFieldProps
> = ({ name, isEInfoOpen, onEInfoToggle, onEInfoClose, onModalOpen }) => {
  const { values, setFieldValue } = useFormikContext<FloatTaskType>();

  useEffect(() => {
    if (values.timeEstimation.hours === 0) {
      setFieldValue(name, `${values.timeEstimation.minutes}min`);
    } else if (values.timeEstimation.minutes === 0) {
      setFieldValue(name, `${values.timeEstimation.hours}h`);
    } else {
      setFieldValue(
        name,
        `${values.timeEstimation.hours}h ${values.timeEstimation.minutes}min`
      );
    }
  }, [
    name,
    setFieldValue,
    values.timeEstimation.hours,
    values.timeEstimation.minutes,
  ]);

  return (
    <InfoInputField
      placement="right"
      isOpen={isEInfoOpen}
      onModalOpen={onModalOpen}
      message={ESTIMATION_INFO}
      onToggle={onEInfoToggle}
      onClose={onEInfoClose}
      name={name}
      readOnly={true}
      label="Estimation"
    />
  );
};
