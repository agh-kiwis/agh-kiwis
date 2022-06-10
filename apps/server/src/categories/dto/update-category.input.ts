import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  colorId: number;
}
