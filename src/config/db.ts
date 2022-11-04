import { createConnection } from 'mysql2';
import { getEnvConfig } from './env';

const config = getEnvConfig();

const db = createConnection(config.DB_URI);

export { db };
