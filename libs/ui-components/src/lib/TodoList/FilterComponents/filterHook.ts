import { useState } from 'react';
import {
  GetCategoriesQuery,
  useGetCategoriesQuery,
} from '@agh-kiwis/data-access';
import { FilterNames, Priority } from './filterConstants';

export const useFilters = () => {
  const { data, loading, error } = useGetCategoriesQuery({
    onCompleted: () => console.log(data),
  });

  console.log(data);

  const getCategories = (data: GetCategoriesQuery) => {
    const categories: string[] = [];
    data?.getCategories.map((category, id) => {
      categories?.push(category.name);
    });
    return categories;
  };

  const [filters, setFilters] = useState([
    { name: FilterNames.Type, options: [] },
    { name: FilterNames.Status, options: [] },
    { name: FilterNames.Category, options: getCategories(data!) },
    {
      name: FilterNames.Priority,
      options: [Priority.Low, Priority.Medium, Priority.High],
    },
  ]);

  return { filters, setFilters };
};
