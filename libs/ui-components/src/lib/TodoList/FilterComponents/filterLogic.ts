import { GetCategoriesQuery } from '@agh-kiwis/data-access';
import {
  FilterInterface,
  FilterNames,
  FilterType,
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
  setFilters: any,
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

// TODO when back-end will be ready: number -> number[], string -> string[]
interface FinalFilter {
  type: boolean | undefined;
  status: boolean | undefined;
  category: number | undefined;
  priority: string | undefined;
}

export const mapper = (filters: FilterInterface[]) => {
  const result: FinalFilter = {
    type: undefined,
    status: undefined,
    category: undefined,
    priority: undefined,
  };
  filters.forEach((filter: FilterInterface) => {
    if (filter.name === FilterNames.Type)
      result.type = typeHandler(filter.options);
    else if (filter.name === FilterNames.Status)
      result.status = statusHandler(filter.options);
    else if (filter.name === FilterNames.Category)
      result.category = categoryHandler(filter.options);
    else if (filter.name === FilterNames.Priority)
      result.priority = filter.options[0];
  });
  return result;
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

const categoryHandler = (optionsArray: FilterType) => {
  const ids: number[] = [];
  optionsArray.map((opt) => {
    if (categories_map.has(opt)) {
      ids.push(categories_map.get(opt)!);
    }
  });
  return ids[0];
};
