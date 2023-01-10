import { Dispatch, SetStateAction } from 'react';
import { Accordion, Spinner } from '@chakra-ui/react';
import { useGetCategoriesQuery } from '@agh-kiwis/data-access';
import { AlertModal } from '@agh-kiwis/ui-components';
import { SingleFilter } from './SingleFilter';
import { FilterInterface, FilterNames, filterOptions } from './filterConstants';
import { getCategories, updateFilter } from './filterLogic';

type FiltersProps = {
  filters: FilterInterface[];
  setFilters: Dispatch<SetStateAction<FilterInterface[]>>;
};

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const { data, loading, error } = useGetCategoriesQuery();
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <AlertModal status={'error'} title={'Error!'} message={error.message} />
    );
  }

  return (
    <Accordion allowMultiple>
      <SingleFilter
        onClick={(option) =>
          updateFilter(filters, setFilters, FilterNames.Type, option)
        }
        options={filterOptions.get(FilterNames.Type)!}
        name={FilterNames.Type}
        filters={filters}
      />
      <SingleFilter
        onClick={(option) =>
          updateFilter(filters, setFilters, FilterNames.Status, option)
        }
        options={filterOptions.get(FilterNames.Status)!}
        name={FilterNames.Status}
        filters={filters}
      />
      <SingleFilter
        onClick={(option) =>
          updateFilter(filters, setFilters, FilterNames.Category, option)
        }
        options={Array.from(getCategories(data!).keys())}
        name={FilterNames.Category}
        filters={filters}
      />
      <SingleFilter
        onClick={(option) =>
          updateFilter(filters, setFilters, FilterNames.Priority, option)
        }
        options={filterOptions.get(FilterNames.Priority)!}
        name={FilterNames.Priority}
        filters={filters}
      />
      <SingleFilter
        onClick={(option) =>
          updateFilter(filters, setFilters, FilterNames.Repeat, option)
        }
        options={filterOptions.get(FilterNames.Repeat)!}
        name={FilterNames.Repeat}
        filters={filters}
      />
    </Accordion>
  );
};
