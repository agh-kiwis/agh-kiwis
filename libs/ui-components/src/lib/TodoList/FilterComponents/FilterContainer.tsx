import { Flex } from '@chakra-ui/react';
import { FilterType } from './filterConstants';

type FilterContainerProps = {
  children: React.ReactNode;
  options: FilterType;
};

export const FilterContainer: React.FC<FilterContainerProps> = ({
  children,
  options,
}) => {
  return (
    <Flex
      justifyContent={options.length === 2 ? 'center' : 'space-around'}
      flexWrap={'wrap'}
      gap={'1rem'}
    >
      {children}
    </Flex>
  );
};
