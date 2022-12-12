import React from 'react';
import { FormikTouched } from 'formik';
import { Box } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ConstTaskType } from '@agh-kiwis/types';
import { FormModal } from '../Common/FormModal';
import { DependentTimeEstimationField } from '../DependentFields/DependentTimeEstimationField';
import { NumberInputType } from '../Pickers/IntervalPicker';

type EstimationInputProps = {
  touched: FormikTouched<ConstTaskType>;
  estimationInputFields: NumberInputType[];
  isEInfoOpen: boolean;
  onEInfoToggle: () => void;
  onEInfoClose: () => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const EstimationInput: React.FC<EstimationInputProps> = ({
  estimationInputFields,
  setFieldValue,
  isEInfoOpen,
  onEInfoToggle,
  onEInfoClose,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  return (
    <>
      <Box w="50%" ml={2}>
        <DependentTimeEstimationField
          name="timeEstimationFacade"
          isEInfoOpen={isEInfoOpen}
          onEInfoToggle={onEInfoToggle}
          onEInfoClose={onEInfoClose}
          onModalOpen={onOpen}
        />
      </Box>

      <FormModal
        finalRef={finalRef}
        modalTitle="Chill time"
        isOpen={isOpen}
        onClose={onClose}
        inputFields={estimationInputFields}
        handleChange={setFieldValue}
      />
    </>
  );
};
