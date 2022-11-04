import dotenv from 'dotenv';
import { z } from 'zod';

interface Config {
  NODE_ENV: string;
  PORT: number;
  DB_URI: string;
}

const ZodEnvConfig = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.string(),
  PORT: z.string().nullish(),
});

let envConfig: Config | undefined;

function getEnvConfig() {
  if (envConfig?.DB_URI) {
    return envConfig;
  }

  // Set up dotenv files
  dotenv.config();

  const parsedConfig = ZodEnvConfig.safeParse(process.env);

  if (!parsedConfig.success) {
    throw new Error('Invalid ENV vars' + JSON.stringify(parsedConfig.error.format(), null, 2));
  }

  envConfig = {
    NODE_ENV: parsedConfig.data.NODE_ENV,
    DB_URI: parsedConfig.data.DATABASE_URL,
    PORT: parsedConfig.data.PORT ? parseInt(parsedConfig.data.PORT) : 3030,
  };

  return envConfig;
}

export { getEnvConfig };
