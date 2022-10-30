import { DocumentNode } from 'graphql';
import request from 'supertest-graphql';
import { INestApplication } from '@nestjs/common';

export const makeRequest = async (
  app: INestApplication,
  query: DocumentNode,
  variables: any = {}
): Promise<any> => {
  const { data } = await request(app.getHttpServer())
    .operation(query)
    .variables({ ...variables })
    .set('Cookie', [`Authorization=${variables.token}`])
    .expectNoErrors();

  return data;
};
