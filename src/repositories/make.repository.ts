import {DefaultCrudRepository} from '@loopback/repository';
import {Make, MakeRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MakeRepository extends DefaultCrudRepository<
  Make,
  typeof Make.prototype.Id,
  MakeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Make, dataSource);
  }
}
