import { createServer } from './src/config/server';
import { getEnvConfig } from './src/config/env';
import { registerMySQL } from './src/config/mysql';

async function start() {
  const envConfig = getEnvConfig();

  try {
    const server = await createServer();
    await registerMySQL(server);
    server.listen({ port: envConfig.PORT }, () => {
      console.log('Server started...');
      server.printRoutes();
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

void start();
