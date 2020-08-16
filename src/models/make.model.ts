import {Entity, model, property} from '@loopback/repository';

@model()
export class Make extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
    required: true,
  })
  Make_ID: number;

  @property({
    type: 'string',
    required: true,
  })
  Make_Name: string;

  @property({
    type: 'number',
    required: true,
  })
  Model_ID: number;

  @property({
    type: 'string',
    required: true,
  })
  Model_Name: string;


  constructor(data?: Partial<Make>) {
    super(data);
  }
}

export interface MakeRelations {
  // describe navigational properties here
}

export type MakeWithRelations = Make & MakeRelations;
