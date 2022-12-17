import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useDisclosure } from '@chakra-ui/react';
import { FloatTaskType } from '@agh-kiwis/types';
import { ESTIMATION_INFO } from '@agh-kiwis/workspace-constants';
import { InfoInputField } from '../Common/InfoInputField';

type DependentTimeEstimationFieldProps = {
  name: string;
  onModalOpen: () => void;
};

export const DependentTimeEstimationField: React.FC<
  DependentTimeEstimationFieldProps
> = ({ name, onModalOpen }) => {
  const { values, setFieldValue } = useFormikContext<FloatTaskType>();
  const {
    isOpen: isHelperOpen,
    onToggle: onHelperToggle,
    onClose: onHelperClose,
  } = useDisclosure();

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
      label="Estimation"
      name={name}
      onModalOpen={onModalOpen}
      message={ESTIMATION_INFO}
      isOpen={isHelperOpen}
      onToggle={onHelperToggle}
      onClose={onHelperClose}
      readOnly={true}
    />
  );
};
