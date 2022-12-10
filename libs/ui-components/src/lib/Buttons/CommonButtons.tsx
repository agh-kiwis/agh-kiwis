import React from 'react';
import { IconType } from 'react-icons/lib';
import { Box, Button, Icon, Image, Wrap, WrapItem } from '@chakra-ui/react';
import { GOOGLE_ICON_PATH } from '@agh-kiwis/workspace-constants';

type ButtonProps = {
  buttonText?: string;
  icon?: IconType;
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  colorScheme?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const CommonButton: React.FC<ButtonProps> = ({
  buttonText,
  icon,
  ...props
}) => {
  return (
    <Button {...props} w="100%">
      <Wrap spacing="8px">
        <Box>
          <WrapItem>{icon && <Icon as={icon} />}</WrapItem>
          <WrapItem>{buttonText}</WrapItem>
        </Box>
      </Wrap>
    </Button>
  );
};

export const GoogleButton: React.FC<ButtonProps> = ({
  buttonText,
  type,
  isLoading,
}) => {
  return (
    <Button variant="outline" type={type} isLoading={isLoading} w="100%">
      <Wrap spacing="8px">
        <WrapItem>
          <Image
            width="18px"
            height="18px"
            alt="Google sign-in"
            src={GOOGLE_ICON_PATH}
          />
        </WrapItem>
        <WrapItem>{buttonText}</WrapItem>
      </Wrap>
    </Button>
  );
};
