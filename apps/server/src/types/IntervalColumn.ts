import { Duration } from 'moment';
import moment = require('moment');
import { Column, ColumnOptions } from 'typeorm';

export function IntervalColumn(options?: ColumnOptions) {
  return function (target: unknown, propertyKey: string | symbol): void {
    Column({
      ...options,
      transformer: {
        to: (value: Duration) => (!value ? null : value.toISOString()),
        from: (value: string) => (!value ? null : moment.duration(value)),
      },
      type: 'interval',
    })(target, propertyKey);
  };
}
