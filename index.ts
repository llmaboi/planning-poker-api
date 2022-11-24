import { createServer } from './src/config/server';
import { getEnvConfig } from './src/config/env';
import { registerMySQL } from './src/config/mysql';
import displayRoutes from './src/routes/displays';
import roomRoutes from './src/routes/rooms';
import webSockets from '@fastify/websocket';
import { MySQLPromisePool } from '@fastify/mysql';

// if you only pass connectionString
// declare module 'fastify' {
//   interface FastifyInstance {
//     mysql: MySQLPool;
//   }
// }

// if you passed type = 'connection'
// declare module 'fastify' {
//   interface FastifyInstance {
//     mysql: MySQLConnection;
//   }
// }

// if you passed promise = true
declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPromisePool;
  }
}

// if you passed promise = true, type = 'connection'
// declare module 'fastify' {
//   interface FastifyInstance {
//     mysql: MySQLPromiseConnection;
//   }
// }

async function start() {
  const envConfig = getEnvConfig();

  try {
    const server = await createServer();
    await registerMySQL(server);

    await server.register(webSockets, {
      options: {
        maxPayload: 1048576,
      },
    });

    await server.register(roomRoutes, { prefix: '/api/' });
    await server.register(displayRoutes, { prefix: '/api/' });
    // app.use(express.json());

    // TODO: I'm not sure if this is correct
    server.listen({ port: envConfig.SERVER_PORT }, () => {
      console.log('Server started...');
      server.printRoutes();
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

void start();
