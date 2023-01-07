import { SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OrderOptions } from './order.options';

// TODO Move this to a separate module
@Injectable()
export class OrderService {
  order<EntityType>(
    orderOptions: OrderOptions,
    query: SelectQueryBuilder<EntityType>
  ) {
    // get entity name
    const entityName = query.expressionMap.mainAlias!.name;

    const replacedField = `${entityName}_${orderOptions.field}`;

    return query.orderBy(replacedField, orderOptions.desc ? 'DESC' : 'ASC');
  }
}
