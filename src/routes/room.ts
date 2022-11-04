import { FastifyPluginAsync, RequestGenericInterface } from 'fastify';
import { createRoom, getRoom, getRooms, updateRoom } from '../methods/mysqlRooms';

interface RoomParams extends RequestGenericInterface {
  Params: {
    id: string;
  };
}

interface RoomCreate extends RequestGenericInterface {
  Body: {
    label: string | null;
    name: string;
  };
}

interface RoomUpdate extends RoomParams {
  Body: {
    label: string | null;
    name: string;
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
const roomRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/rooms', async (request, reply) => {
    try {
      return getRooms(fastify.mysql);
    } catch (err) {
      console.error(err);
      return reply.send(500); //.json({ error: err });
    }
  });

  fastify.get<RoomParams>('/rooms/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      return getRoom(fastify.mysql, id);
    } catch (err) {
      return reply.send(500); //.json({ error: err });
    }
  });

  fastify.patch<RoomUpdate>('/rooms/:id', async (request, reply) => {
    const { id } = request.params;
    const { label, name } = request.body;

    try {
      return updateRoom(fastify.mysql, {
        id: parseInt(id),
        label,
        name,
      });
    } catch (err) {
      return reply.send(500); //.json({ error: err });
    }
  });

  fastify.post<RoomCreate>('/rooms', async (request, reply) => {
    const { label, name } = request.body;

    try {
      return createRoom(fastify.mysql, {
        label,
        name,
      });
    } catch (err) {
      return reply.send(500); //.json({ error: err });
    }
  });
};

export default roomRoutes;
