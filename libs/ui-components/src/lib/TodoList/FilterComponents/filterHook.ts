import { useState } from 'react';
import '@agh-kiwis/data-access';
import { FilterNames } from './filterConstants';

export const useFilters = () => {
  const [filters, setFilters] = useState([
    { name: FilterNames.Type, options: [] },
    { name: FilterNames.Status, options: [] },
    { name: FilterNames.Category, options: [] },
    { name: FilterNames.Priority, options: [] },
    { name: FilterNames.Repeat, options: [] },
  ]);

  return { filters, setFilters };
};
