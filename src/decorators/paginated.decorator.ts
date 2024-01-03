import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

/**
 * Decorator para especificar uma resposta paginada no Swagger.
 * @param model O modelo da entidade paginada.
 */
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
          {
            properties: {
              meta: {
                type: 'object',
                properties: {
                  total: { type: 'number' },
                  lastPage: { type: 'number' },
                  currentPage: { type: 'number' },
                  perPage: { type: 'number' },
                  prev: { type: 'number' },
                  next: { type: 'number' },
                },
                // Tornar algumas propriedades opcionais se necessário
                required: ['total', 'lastPage', 'currentPage', 'perPage'],
              },
            },
          },
        ],
      },
    }),
  );
};
