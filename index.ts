import fastify from 'fastify';
import { getEnvConfig } from './src/config/env';
import fastifyMySQL from '@fastify/mysql/index';
import roomRoutes from './src/routes/room';

const envConfig = getEnvConfig();
const server = fastify({ logger: true });
const port = envConfig.PORT;

async function apiStart() {
  await server.register(fastifyMySQL, {
    connectionString: envConfig.DB_URI,
    promise: true,
    rowsAsArray: true,
  });

  await server.register(roomRoutes, { prefix: '/api/' });
  // app.use(express.json());

  try {
    server.listen({ port }, () => {
      console.log('Server started...');
      server.printRoutes();
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

void apiStart();
