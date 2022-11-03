import { useState } from 'react';
import { FilterInterface, FilterNames } from './filterConstants';

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterInterface[]>([
    { name: FilterNames.Type, options: [] },
    { name: FilterNames.Status, options: [] },
    { name: FilterNames.Category, options: [] },
    { name: FilterNames.Priority, options: [] },
  ]);

  return { filters, setFilters };
};
