import { Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import { BreakdownContainer } from './BreakdownContainer';
import { BreakdownInfo } from './BreakdownInfo';
import { TaskBreakdown } from '@agh-kiwis/data-access';

type BreakdownProps = {
  index: number;
  breakdown: TaskBreakdown;
};

export const Breakdown: React.FC<BreakdownProps> = ({ index, breakdown }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = async () => {
    setChecked(!checked);
  };

  return (
    <BreakdownContainer checked={checked}>
      <Checkbox ml="1rem" checked={checked} onChange={() => handleChange()} />
      <BreakdownInfo checked={checked} id={index} breakdown={breakdown} />
    </BreakdownContainer>
  );
};
