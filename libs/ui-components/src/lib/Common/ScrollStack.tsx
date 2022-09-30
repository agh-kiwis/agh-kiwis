import { Stack } from '@chakra-ui/react';

type ScrollStackProps = {
  children: React.ReactNode;
  h: string;
};

export const ScrollStack: React.FC<ScrollStackProps> = ({ children, h }) => {
  return (
    <Stack
      sx={{ '::-webkit-scrollbar': { display: 'none' } }}
      overflowY="scroll"
      h={h}
    >
      {children}
    </Stack>
  );
};
