import { FastifyInstance } from 'fastify/types/instance';
import { createServer } from '../config/server';
import { Room } from '../types/room';
import { ZodRoomRaw } from '../types/room.zod';
// import { registerMySQL } from '../config/mysql';
import fastifyMySQL from '@fastify/mysql';

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

describe('Route: /rooms/:id', () => {
  describe('get room by id', () => {
    test('returns 200 and room data', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/rooms/1',
      });

      expect(response.statusCode).toEqual(200);
      const { data } = response.json<{ data: Room }>();
      const { success } = ZodRoomRaw.safeParse(data);
      expect(success).toBeTruthy();
      return Promise.resolve();
    });
  });
});

describe('Route: /rooms', () => {
  describe('get rooms', () => {
    test('returns 200 and rooms data', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/rooms',
      });

      expect(response.statusCode).toEqual(200);
      const { data } = response.json<{ data: Room[] }>();

      expect(data.length).toBeGreaterThan(0);
      const { success } = ZodRoomRaw.safeParse(data[0]);
      expect(success).toBeTruthy();
      return Promise.resolve();
    });
  });
});
