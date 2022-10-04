import { Stack } from '@chakra-ui/react';

type ScrollStackProps = {
  children: React.ReactNode;
  height: string;
};

export const ScrollStack: React.FC<ScrollStackProps> = ({ children, height }) => {
  return (
    <Stack
      sx={{ '::-webkit-scrollbar': { display: 'none' } }}
      overflowY="scroll"
      mb="0.6rem"
      h={height}
    >
      {children}
    </Stack>
  );
};
