import { FastifyInstance } from 'fastify/types/instance';
import { createServer } from '../config/server';
// import { registerMySQL } from '../config/mysql';
import fastifyMySQL from '@fastify/mysql';
import { Display } from '../types/display';
import { ZodDisplayRaw } from '../types/display.zod';

let server: FastifyInstance;

beforeAll(async () => {
  server = await createServer();
  // await registerMySQL(server);

  await server.register(fastifyMySQL, {
    host: 'localhost',
    database: process.env.MYSQL_DATABASE!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    port: parseInt(process.env.MYSQL_PORT!),
    promise: true,
  });
});

afterAll(async () => {
  if (server) {
    await server.close();
  }
});

describe('Route: /displays/room/:id', () => {
  describe('get displays by room id', () => {
    test('returns 200 and display data', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/displays/room/1',
      });

      expect(response.statusCode).toEqual(200);
      const { data } = response.json<{ data: Display[] }>();
      expect(data.length).toBeGreaterThan(0);
      const { success } = ZodDisplayRaw.safeParse(data[0]);
      expect(success).toBeTruthy();
      return Promise.resolve();
    });
  });
});

describe('Route: /displays/:id', () => {
  describe('get a display by id', () => {
    test('returns 200 and display data', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/displays/1',
      });

      expect(response.statusCode).toEqual(200);
      const { data } = response.json<{ data: Display }>();
      const { success } = ZodDisplayRaw.safeParse(data);
      expect(success).toBeTruthy();
      return Promise.resolve();
    });
  });
});
