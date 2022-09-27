import { Box, Checkbox, HStack } from '@chakra-ui/react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';

export const FilterOptions = () => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Task type
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <HStack spacing={5} justifyContent="center">
            <Checkbox size="lg"> Const </Checkbox>
            <Checkbox size="lg"> Float </Checkbox>
          </HStack>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Task status
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <HStack spacing={5} justifyContent="center">
            <Checkbox size="lg"> Done </Checkbox>
            <Checkbox size="lg"> In progress </Checkbox>
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
