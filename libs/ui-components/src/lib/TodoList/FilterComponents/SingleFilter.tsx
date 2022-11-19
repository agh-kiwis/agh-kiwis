import { AccordionItem, AccordionPanel, Checkbox } from '@chakra-ui/react';
import { FilterContainer } from './FilterContainer';
import { FilterName } from './FilterName';
import { FilterInterface, FilterNames, FilterType } from './filterConstants';

type SingleFilterProps = {
  options: FilterType;
  onClick: (option: string) => void;
  filters: FilterInterface[];
  name: FilterNames;
};

export const SingleFilter: React.FC<SingleFilterProps> = ({
  options,
  onClick,
  filters,
  name,
}) => {
  return (
    <AccordionItem>
      <FilterName name={name} />
      <AccordionPanel pb="4">
        <FilterContainer options={options}>
          {options.map((value: string, key) => (
            <Checkbox
              isChecked={filters
                ?.filter((f) => f.name === name)?.[0]
                ?.options.some((option) => option === value)}
              onChange={() => onClick(value)}
              key={key}
            >
              {value}
            </Checkbox>
          ))}
        </FilterContainer>
      </AccordionPanel>
    </AccordionItem>
  );
};
