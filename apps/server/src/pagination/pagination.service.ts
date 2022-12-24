import { SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaginationOptions } from './pagination.options';

// TODO Move this to a separate module
@Injectable()
export class PaginationService {
  paginate<EntityType>(
    paginationOptions: PaginationOptions,
    query: SelectQueryBuilder<EntityType>
  ) {
    const skipNumber = paginationOptions.offset * paginationOptions.limit;
    return query.offset(skipNumber).limit(paginationOptions.limit);
  }
}
