import { FastifyInstance } from 'fastify';
import { getEnvConfig } from './env';
import { registerMySQL } from './mysql';
import { createServer } from './server';

let testServer: FastifyInstance;

beforeAll(async () => {
  getEnvConfig();
  testServer = await createServer();
  await registerMySQL(testServer);
});

afterAll(async () => {
  if (testServer) {
    await testServer.close();
  }
});

export { testServer };
