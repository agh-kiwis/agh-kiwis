import { AccordionButton, AccordionIcon, Box } from '@chakra-ui/react';

type FilterNameProps = {
  name: string;
};

export const FilterName: React.FC<FilterNameProps> = ({ name }) => {
  return (
    <AccordionButton>
      <Box flex="1" textAlign="left">
        {name}
      </Box>
      <AccordionIcon />
    </AccordionButton>
  );
};
