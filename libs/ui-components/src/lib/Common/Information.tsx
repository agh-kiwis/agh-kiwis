import React from 'react';
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
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
        <Box onClick={onToggle} alignSelf="start">
          {isOpen ? (
            <Icon as={AiFillQuestionCircle} boxSize="5" color="insignificant" />
          ) : (
            <Icon
              as={AiOutlineQuestionCircle}
              boxSize="5"
              color="insignificant"
            />
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent maxW={{ base: '175px', lg: '500px' }}>
        <PopoverArrow />
        <PopoverBody ref={ref}>{message}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
