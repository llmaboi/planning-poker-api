import urlData from '@fastify/url-data';
import fastify from 'fastify';
import { getEnvConfig } from '../config/env';
import displayRoutes from '../routes/displays';
import roomRoutes from '../routes/rooms';

getEnvConfig();
const server = fastify({ logger: true });

export async function createServer() {
  await server.register(urlData);

  await server.register(roomRoutes, { prefix: '/api/' });
  await server.register(displayRoutes, { prefix: '/api/' });
  // app.use(express.json());

  return server;
}
