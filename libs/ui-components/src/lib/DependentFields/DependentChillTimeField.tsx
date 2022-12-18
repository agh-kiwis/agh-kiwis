import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useDisclosure } from '@chakra-ui/react';
import { ConstTaskType } from '@agh-kiwis/types';
import { CHILL_TIME_INFO } from '@agh-kiwis/workspace-constants';
import { InfoInputField } from '../Common/InfoInputField';

type DependentChillTimeFieldProps = {
  name: string;
  onModalOpen: () => void;
};

export const DependentChillTimeField: React.FC<
  DependentChillTimeFieldProps
> = ({ name, onModalOpen }) => {
  const { values, setFieldValue } = useFormikContext<ConstTaskType>();
  const {
    isOpen: isHelperOpened,
    onToggle: onHelperToggle,
    onClose: onHelperClose,
  } = useDisclosure();

  useEffect(() => {
    setFieldValue(name, `${values.chillTime.minutes}min`);
  }, [name, setFieldValue, values.chillTime.minutes]);

  return (
    <InfoInputField
      label="Chill time"
      name={name}
      onModalOpen={onModalOpen}
      message={CHILL_TIME_INFO}
      isOpen={isHelperOpened}
      onToggle={onHelperToggle}
      onClose={onHelperClose}
      readOnly={true}
    />
  );
};
