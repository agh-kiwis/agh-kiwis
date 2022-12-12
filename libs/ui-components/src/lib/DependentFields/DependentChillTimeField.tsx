import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { ConstTaskType } from '@agh-kiwis/types';
import { CHILL_TIME_INFO } from '@agh-kiwis/workspace-constants';
import { InfoInputField } from '../Common/InfoInputField';

type DependentChillTimeFieldProps = {
  name: string;
  isCTInfoOpen: boolean;
  onCTInfoToggle: () => void;
  onCTInfoClose: () => void;
  onModalOpen: () => void;
};

export const DependentChillTimeField: React.FC<
  DependentChillTimeFieldProps
> = ({ name, isCTInfoOpen, onModalOpen, onCTInfoToggle, onCTInfoClose }) => {
  const { values, setFieldValue } = useFormikContext<ConstTaskType>();

  useEffect(() => {
    setFieldValue(name, `${values.chillTime.minutes}min`);
  }, [name, setFieldValue, values.chillTime.minutes]);

  return (
    <InfoInputField
      placement="left"
      isOpen={isCTInfoOpen}
      onModalOpen={onModalOpen}
      message={CHILL_TIME_INFO}
      onToggle={onCTInfoToggle}
      onClose={onCTInfoClose}
      name={name}
      readOnly={true}
      label="Chill time"
    />
  );
};
