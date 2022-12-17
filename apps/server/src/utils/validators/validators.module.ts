import { Module } from '@nestjs/common';
import { IsExist } from './is-exists.validator';
import { IsNotExist } from './is-not-exists.validator';

@Module({
  imports: [],
  providers: [IsExist, IsNotExist],
  exports: [IsExist, IsNotExist],
})
export class ValidatorsModule {}
