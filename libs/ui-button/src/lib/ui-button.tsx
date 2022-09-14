import styles from './ui-button.module.css';
import { Button, Wrap, WrapItem, Image, Flex, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

/* eslint-disable-next-line */
export interface UiButtonProps {}

export function UiButton(props: UiButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UiButton!</h1>
    </div>
  );
}

export default UiButton;

type ButtonProps = {
  buttonText: string;
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  onClick?: () => void;
};

export const CommonButton: React.FC<ButtonProps> = ({
  buttonText,
  ...props
}) => {
  return (
    <Button {...props} w={'100%'}>
      {buttonText}
    </Button>
  );
};

export const GoogleButton: React.FC<ButtonProps> = ({
  buttonText,
  type,
  isLoading,
}) => {
  return (
    <Button variant="outline" type={type} isLoading={isLoading} w={'100%'}>
      <Wrap spacing="8px">
        <WrapItem>
          <Image
            width="18px"
            height="18px"
            alt="Google sign-in"
            src="/google.png"
          />
        </WrapItem>
        <WrapItem>{buttonText}</WrapItem>
      </Wrap>
    </Button>
  );
};

export const TaskSwitchConst: React.FC = () => {
  return (
    <Flex justifyContent="center" mb={6}>
      <Box>
        <Button borderRightRadius={0}>CONST</Button>
        <NextLink href="/add/float-task" passHref>
          <Button variant="outline" borderLeftRadius={0}>
            FLOAT
          </Button>
        </NextLink>
      </Box>
    </Flex>
  );
};

export const TaskSwitchFloat: React.FC = () => {
  return (
    <Flex justifyContent="center" mb={6}>
      <Box>
        <NextLink href="/add/const-task" passHref>
          <Button variant="outline" borderRightRadius={0}>
            CONST
          </Button>
        </NextLink>
        <Button borderLeftRadius={0}>FLOAT</Button>
      </Box>
    </Flex>
  );
};
