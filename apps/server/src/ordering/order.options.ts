import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderOptions {
  // TODO I've noticed that the default value is not being used
  // Don't know why, moving forward for now
  @Field(() => String, { defaultValue: 'id' })
  field: string = 'id';

  @Field(() => Boolean, { defaultValue: true })
  desc: boolean = true;
}
