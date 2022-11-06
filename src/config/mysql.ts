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

  // Docker instance
  // await server.register(fastifyMySQL, {
  //   host: 'localhost',
  //   database: 'planning-poker',
  //   user: 'test_user',
  //   password: 'test_user_password',
  //   port: 3306,
  //   promise: true,
  //   // rowsAsArray: true,
  // });
}
