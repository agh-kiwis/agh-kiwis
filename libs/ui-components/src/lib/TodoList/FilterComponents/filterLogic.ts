import { Dispatch, SetStateAction } from 'react';
import { GetCategoriesQuery } from '@agh-kiwis/data-access';
import {
  FilterInterface,
  FilterNames,
  FilterType,
  Priority,
  Repeat,
  Status,
  Type,
} from './filterConstants';

let categories_map: Map<string, number>;

export const getCategories = (data: GetCategoriesQuery) => {
  const categories: Map<string, number> = new Map([]);
  data.getCategories.map((category) => {
    if (!categories.has(category.name)) {
      categories.set(category.name, category.id);
    }
  });
  categories_map = categories;
  return categories;
};

export const updateFilter = (
  filters: FilterInterface[],
  setFilters: Dispatch<SetStateAction<FilterInterface[]>>,
  name: FilterNames,
  option: string
) => {
  if (
    filters
      ?.filter((f) => f.name === name)?.[0]
      ?.options.some((opt) => opt === option)
  ) {
    setFilters(
      filters.map((f): FilterInterface => {
        if (f.name === name) {
          return { name, options: f.options.filter((opt) => opt !== option) };
        }
        return f;
      })
    );
  } else {
    setFilters(
      filters.map((f): FilterInterface => {
        if (f.name === name) {
          return { name, options: [...f.options, option] };
        }
        return f;
      })
    );
  }
};

export interface MappedFilter {
  type: boolean | undefined;
  status: boolean | undefined;
  categories: number[] | undefined;
  priorities: string[] | undefined;
  repeat: boolean | undefined;
}

export const mapToGraphQLFields = (
  mappedFilter: MappedFilter,
  filters: FilterInterface[]
) => {
  filters.forEach((filter: FilterInterface) => {
    if (filter.name === FilterNames.Type)
      mappedFilter.type = typeHandler(filter.options);
    else if (filter.name === FilterNames.Status)
      mappedFilter.status = statusHandler(filter.options);
    else if (filter.name === FilterNames.Category)
      mappedFilter.categories = categoryHandler(filter.options);
    else if (filter.name === FilterNames.Priority)
      mappedFilter.priorities = priorityHandler(filter.options);
    else if (filter.name === FilterNames.Repeat)
      mappedFilter.repeat = repeatHandler(filter.options);
  });
  return mappedFilter;
};

const typeHandler = (optionsArray: FilterType) => {
  if (optionsArray.length !== 1) return undefined;
  else if (optionsArray[0] === Type.Float) return true;
  else return false;
};

const statusHandler = (optionsArray: FilterType) => {
  if (optionsArray.length !== 1) return undefined;
  else if (optionsArray[0] === Status.Done) return true;
  else return false;
};

export const categoryHandler = (optionsArray: FilterType) => {
  if (optionsArray.length === 0) {
    return undefined;
  }
  const ids: number[] = [];
  optionsArray.map((opt) => {
    if (categories_map && categories_map.has(opt)) {
      ids.push(categories_map.get(opt)!);
    }
  });
  return ids;
};

const priorityHandler = (optionsArray: FilterType) => {
  if (optionsArray.length === 0) {
    return Object.values(Priority);
  }
  return optionsArray;
};

const repeatHandler = (optionsArray: FilterType) => {
  if (optionsArray[0] === Repeat.ShouldRepeat) return true;
  if (optionsArray[0] === undefined) return undefined;
  else return false;
};
