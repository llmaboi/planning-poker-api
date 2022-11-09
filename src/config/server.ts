import fastify from 'fastify';
import { getEnvConfig } from '../config/env';
import fastifyMySQL from '@fastify/mysql/index';
import roomRoutes from '../routes/rooms';
import urlData from '@fastify/url-data';
import displayRoutes from '../routes/displays';

const envConfig = getEnvConfig();
const server = fastify({ logger: true });

export async function createServer() {
  await server.register(urlData);

  await server.register(roomRoutes, { prefix: '/api/' });
  await server.register(displayRoutes, { prefix: '/api/' });
  // app.use(express.json());

  return server;
}
