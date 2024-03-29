import React from 'react';
import { FormikTouched } from 'formik';
import { Box } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ConstTaskType } from '@agh-kiwis/types';
import { FormModal } from '../Common/FormModal';
import { DependentChillTimeField } from '../DependentFields/DependentChillTimeField';
import { NumberInputType } from '../Pickers/IntervalPicker';

type ChillTimeInputProps = {
  touched: FormikTouched<ConstTaskType>;
  chillTimeInputFields: NumberInputType[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const ChillTimeInput: React.FC<ChillTimeInputProps> = ({
  chillTimeInputFields,
  setFieldValue,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  return (
    <>
      <Box w="50%" ml="2">
        <DependentChillTimeField name="chillTimeFacade" onModalOpen={onOpen} />
      </Box>

      <FormModal
        finalRef={finalRef}
        modalTitle="Chill time"
        isOpen={isOpen}
        onClose={onClose}
        inputFields={chillTimeInputFields}
        handleChange={setFieldValue}
      />
    </>
  );
};
