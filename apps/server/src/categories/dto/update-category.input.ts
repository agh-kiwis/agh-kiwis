import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  colorId?: number;
}
