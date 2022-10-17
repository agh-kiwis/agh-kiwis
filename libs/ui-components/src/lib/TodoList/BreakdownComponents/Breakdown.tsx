import { useState } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { TaskBreakdown } from '@agh-kiwis/data-access';
import { BreakdownContainer } from './BreakdownContainer';
import { BreakdownInfo } from './BreakdownInfo';

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
      <BreakdownInfo checked={checked} id={index} breakdown={breakdown} />
      <Checkbox px="4" checked={checked} onChange={() => handleChange()} />
    </BreakdownContainer>
  );
};
