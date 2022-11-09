import { FastifyPluginAsync, RequestGenericInterface } from 'fastify';
import { getDisplay, getDisplaysForRoom } from '../methods/mysqlDisplays';

interface GetDisplayParams extends RequestGenericInterface {
  Params: {
    id: string;
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
const displayRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<GetDisplayParams>('/displays/room/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      return getDisplaysForRoom(fastify.mysql, id);
    } catch (err) {
      return reply.send(500); // json message?
    }
  });

  fastify.get<GetDisplayParams>('/displays/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      return getDisplay(fastify.mysql, id);
    } catch (err) {
      return reply.send(500); // json message?
    }
  });
};

export default displayRoutes;
