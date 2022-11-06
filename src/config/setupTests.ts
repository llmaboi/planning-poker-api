import dotenv from 'dotenv';
import path from 'path';

beforeAll(() => {
  // Set up dotenv files
  dotenv.config({
    path: path.resolve(__dirname, '../../.env.test'),
  });
});
