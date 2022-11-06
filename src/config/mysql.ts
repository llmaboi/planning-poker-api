import fastifyMySQL from '@fastify/mysql/index';
import { FastifyInstance } from 'fastify';
import { getEnvConfig } from './env';

export async function registerMySQL(server: FastifyInstance) {
  const envConfig = getEnvConfig();

  await server.register(fastifyMySQL, {
    connectionString: envConfig.DB_URI,
    promise: true,
    rowsAsArray: true,
  });
}
