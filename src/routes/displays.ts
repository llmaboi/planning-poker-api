import { FastifyPluginAsync, RequestGenericInterface } from 'fastify';
import { createDisplay, getDisplay, getDisplaysForRoom, updateDisplay } from '../methods/mysqlDisplays';

interface GetDisplayParams extends RequestGenericInterface {
  Params: {
    id: string;
  };
}

interface CreateDisplayParams extends RequestGenericInterface {
  Body: {
    roomId: number;
    name: string;
  };
}

interface UpdateDisplayParams extends GetDisplayParams {
  Body: {
    roomId: number;
    name: string;
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

  fastify.patch<UpdateDisplayParams>('/displays/:id', async (request, reply) => {
    const { id } = request.params;
    const { roomId, name } = request.body;

    try {
      return updateDisplay(fastify.mysql, {
        id: parseInt(id),
        roomId,
        name,
      });
    } catch (err) {
      return reply.send(500); //.json({ error: err });
    }
  });

  fastify.post<CreateDisplayParams>('/displays', async (request, reply) => {
    const { roomId, name } = request.body;

    try {
      return createDisplay(fastify.mysql, {
        roomId,
        name,
      });
    } catch (err) {
      return reply.send(500); //.json({ error: err });
    }
  });
};

export default displayRoutes;
