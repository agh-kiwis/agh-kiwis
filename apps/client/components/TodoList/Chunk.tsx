import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import moment from 'moment';

export const Chunk = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = async () => {
    setChecked(!checked);
  };

  return (
    <Flex
      justifyContent="space-between"
      borderRadius="0.5rem"
      marginBottom="0.6rem"
      backgroundColor={!checked ? 'green.200' : 'gray.300'}
    >
      <Checkbox
        marginLeft="1rem"
        checked={checked}
        onChange={() => handleChange()}
      />
      <Flex justifyItems="center">
        <Box>
          <Text marginRight="1rem">Chunk {props.index + 1}</Text>
          <Text>{!checked ? props.timeInterval(props.chunk) : 'Done'}</Text>
        </Box>
        <Text marginRight="1rem">
          {moment(props.chunk.start).format('DD MMM')}
        </Text>
      </Flex>
    </Flex>
  );
};
