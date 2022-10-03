import { Stack } from '@chakra-ui/react';

type ScrollStackProps = {
  children: React.ReactNode;
  height: string;
  marginBot: string;
};

export const ScrollStack: React.FC<ScrollStackProps> = ({ children, height, marginBot }) => {
  return (
    <Stack
      sx={{ '::-webkit-scrollbar': { display: 'none' } }}
      overflowY="scroll"
      h={height}
      mb={marginBot}
    >
      {children}
    </Stack>
  );
};
