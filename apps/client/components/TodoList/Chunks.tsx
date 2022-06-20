import { Box, Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";


export const Chunks = (chunkNumber) => {
    const [checked, setChecked] = useState(
        new Array(chunkNumber).fill(false)
    );

    const handleChange = (position) => {
        const checkState = checked.map((item, index) =>
            index === position ? !item : item
        );
        setChecked(checkState);
    }

    return <Stack>
        {[...Array(chunkNumber)].map((_, index) => {
            return <Flex key={index} flex="1" flexDirection="row" justifyContent="space-between" borderRadius="0.5rem" backgroundColor={!checked[index] ? "green.200" : "gray.300"}>
                <Checkbox marginLeft="1rem" checked={checked[index]} onChange={() => handleChange(index)} />
                <Box alignSelf="center">
                    <Text>Chunk {index + 1}</Text>
                    <Text>{!checked[index] ? "08:00 - 10:00" : "Done"}</Text>
                </Box>
            </Flex>
        })}
    </Stack>
}

