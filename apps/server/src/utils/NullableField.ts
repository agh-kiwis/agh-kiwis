import { Field, FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';

export function NullableField(
  returnTypeFunction?: ReturnTypeFunc,
  options?: FieldOptions
): PropertyDecorator & MethodDecorator {
  if (returnTypeFunction) {
    return Field(returnTypeFunction, {
      nullable: true,
      ...options,
    });
  }
  return Field({
    nullable: true,
    ...options,
  });
}
