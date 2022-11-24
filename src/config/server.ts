import urlData from '@fastify/url-data';
import fastify from 'fastify';
import { getEnvConfig } from '../config/env';
// TODO: cors good or bad? only use in dev / test?
import cors from '@fastify/cors';

getEnvConfig();
const server = fastify({ logger: true });

export async function createServer() {
  await server.register(urlData);
  // await server.register(cors, {
  //   // put your options here
  //   origin: (origin, cb) => {
  //     console.log('origin: ', origin);
  //     const hostname = new URL(origin).hostname;
  //     if (hostname === 'localhost') {
  //       //  Request from localhost will pass
  //       cb(null, true);
  //       return;
  //     }
  //     // Generate an error on other origins, disabling access
  //     cb(new Error('Not allowed'), false);
  //   },
  // });

  return server;
}
