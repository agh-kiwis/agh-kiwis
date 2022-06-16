import { Box } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

export const FilterOptions = () => {
    return (
    <Accordion allowMultiple>
        <AccordionItem>
            <h2>
            <AccordionButton>
                <Box flex='1' textAlign='left'>
                Task type
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            <Stack spacing={5} direction='row' alignItems='center' justifyContent='center'>
                <Checkbox size='lg'> Const </Checkbox>
                <Checkbox size='lg'> Float </Checkbox>
            </Stack>
            </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
            <h2>
            <AccordionButton>
                <Box flex='1' textAlign='left'>
                Task status
                </Box>
                <AccordionIcon />
            </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
            <Stack spacing={5} direction='row' alignItems='center' justifyContent='center'>
                <Checkbox size='lg'> Done </Checkbox>
                <Checkbox size='lg'> In progress </Checkbox>
            </Stack>
            </AccordionPanel>
        </AccordionItem>
</Accordion>
    )
}