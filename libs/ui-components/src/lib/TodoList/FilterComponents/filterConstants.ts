export enum Type {
  Const = 'Const',
  Float = 'Float',
}

export enum Status {
  Done = 'Done',
  In_Progress = 'In progress',
}

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum FilterNames {
  Type = 'Type',
  Status = 'Status',
  Category = 'Category',
  Priority = 'Priority',
}

export type FilterType = Type[] | Status[] | Priority[] | string[];

export interface FilterInterface {
  name: FilterNames;
  options: FilterType;
}

export const filterOptions: Map<FilterNames, FilterType> = new Map([
  [FilterNames.Type, [Type.Const, Type.Float]],
  [FilterNames.Status, [Status.Done, Status.In_Progress]],
  [FilterNames.Priority, [Priority.Low, Priority.Medium, Priority.High]],
]);
