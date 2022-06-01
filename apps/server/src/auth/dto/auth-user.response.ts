// TODO Make this global on the side of config
// To call new OurOwnError({ field: 'field', message: 'message' })
// And this error would be returned as a response
// Because now we would need to map this error messages to our types in frontend

// @DEPRECATED -> NEEDS TO BE HANDLED AS INTERNAL ERROR

// @ObjectType()
// export class FieldError {
//   @Field()
//   field: string;
//   @Field()
//   message: string;
// }

// @ObjectType()
// export class AuthUserResponse {
//   @Field(() => User, { nullable: true })
//   data?: UserDto;
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];
// }
