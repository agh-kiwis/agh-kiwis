import { Column, ColumnOptions } from 'typeorm';

export function NullableColumn(
  options?: ColumnOptions
): PropertyDecorator & MethodDecorator {
  return Column({
    nullable: true,
    ...options,
  });
}
