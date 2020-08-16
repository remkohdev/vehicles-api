import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Make} from '../models';
import {MakeRepository} from '../repositories';

export class MakeController {
  constructor(
    @repository(MakeRepository)
    public makeRepository : MakeRepository,
  ) {}

  @post('/makes', {
    responses: {
      '200': {
        description: 'Make model instance',
        content: {'application/json': {schema: getModelSchemaRef(Make)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Make, {
            title: 'NewMake',
            exclude: ['Id'],
          }),
        },
      },
    })
    make: Omit<Make, 'Id'>,
  ): Promise<Make> {
    return this.makeRepository.create(make);
  }

  @get('/makes/count', {
    responses: {
      '200': {
        description: 'Make model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Make) where?: Where<Make>,
  ): Promise<Count> {
    return this.makeRepository.count(where);
  }

  @get('/makes', {
    responses: {
      '200': {
        description: 'Array of Make model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Make, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Make) filter?: Filter<Make>,
  ): Promise<Make[]> {
    return this.makeRepository.find(filter);
  }

  @patch('/makes', {
    responses: {
      '200': {
        description: 'Make PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Make, {partial: true}),
        },
      },
    })
    make: Make,
    @param.where(Make) where?: Where<Make>,
  ): Promise<Count> {
    return this.makeRepository.updateAll(make, where);
  }

  @get('/makes/{id}', {
    responses: {
      '200': {
        description: 'Make model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Make, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Make, {exclude: 'where'}) filter?: FilterExcludingWhere<Make>
  ): Promise<Make> {
    return this.makeRepository.findById(id, filter);
  }

  @patch('/makes/{id}', {
    responses: {
      '204': {
        description: 'Make PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Make, {partial: true}),
        },
      },
    })
    make: Make,
  ): Promise<void> {
    await this.makeRepository.updateById(id, make);
  }

  @put('/makes/{id}', {
    responses: {
      '204': {
        description: 'Make PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() make: Make,
  ): Promise<void> {
    await this.makeRepository.replaceById(id, make);
  }

  @del('/makes/{id}', {
    responses: {
      '204': {
        description: 'Make DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.makeRepository.deleteById(id);
  }
}
