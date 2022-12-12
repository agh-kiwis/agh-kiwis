import React from 'react';
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import { extendTheme } from '@chakra-ui/react';
import {
  Box,
  Icon,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useOutsideClick,
} from '@chakra-ui/react';

type InformationProps = {
  isOpen: boolean;
  message: string;
  placement: PlacementWithLogical | undefined;
  onToggle: () => void;
  onClose: () => void;
};

export const Information: React.FC<InformationProps> = ({
  isOpen,
  message,
  placement,
  onToggle,
  onClose,
}) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  useOutsideClick({
    ref: ref,
    handler: onClose,
  });
  return (
    <Popover placement={placement}>
      <PopoverTrigger>
        <Box onClick={onToggle}>
          {isOpen ? (
            <Icon as={AiFillQuestionCircle} boxSize={6} color="primary" />
          ) : (
            <Icon as={AiOutlineQuestionCircle} boxSize={6} color="primary" />
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent
        maxW={{ base: '175px', lg: '500px' }}
        bgColor="primary"
        textColor={'white'}
      >
        <PopoverArrow bgColor={'primary'} />
        <PopoverBody ref={ref}>{message}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
