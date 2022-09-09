import { Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import { ChunkContainer } from './BreakdownContainer';
import { ChunkInfo } from './BreakdownInfo';

export const Chunk = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = async () => {
    setChecked(!checked);
  };

  return (
    <ChunkContainer checked={checked}>
      <Checkbox ml="1rem" checked={checked} onChange={() => handleChange()} />
      <ChunkInfo
        checked={checked}
        id={props.index}
        breakdown={props.breakdown}
      />
    </ChunkContainer>
  );
};
