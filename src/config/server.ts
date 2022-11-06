import fastify from 'fastify';
import { getEnvConfig } from '../config/env';
import fastifyMySQL from '@fastify/mysql/index';
import roomRoutes from '../routes/room';
import urlData from '@fastify/url-data';

const envConfig = getEnvConfig();
const server = fastify({ logger: true });

export async function createServer() {
  await server.register(urlData);

  await server.register(roomRoutes, { prefix: '/api/' });
  // app.use(express.json());

  return server;
}
