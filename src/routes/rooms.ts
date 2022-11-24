import { FastifyPluginAsync, RequestGenericInterface } from 'fastify';
import { createRoom, getRoomById, getRoomByName, getRooms, updateRoom } from '../methods/mysqlRooms';
import { ZodRoomRaw } from '../../../types';

interface RoomByIdParams extends RequestGenericInterface {
  Params: {
    id: string;
  };
}

interface RoomByNameParams extends RequestGenericInterface {
  Querystring: {
    name: string;
  };
}

interface RoomCreate extends RequestGenericInterface {
  Body: {
    label: string | null;
    name: string;
  };
}

interface RoomUpdate extends RoomByIdParams {
  Body: {
    label: string | null;
    name: string;
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
const roomRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<RoomByIdParams>('/rooms/id/:id', async (request, reply) => {
    const { id } = request.params;
    // TODO: Remove this?
    const urlData = request.urlData();
    console.log('urlData: ', urlData);

    try {
      return getRoomById(fastify.mysql, id);
    } catch (err) {
      return reply.send(500); //.json({ error: err });
    }
  });

  fastify.get<RoomByNameParams>('/rooms/name', async (request, reply) => {
    const { name } = request.query;
    // TODO: Remove this?
    const urlData = request.urlData();
    console.log('urlData: ', urlData);

    try {
      return getRoomByName(fastify.mysql, name);
    } catch (err) {
      return reply.send(500); //.json({ error: err });
    }
  });

  fastify.get('/rooms', async (request, reply) => {
    // TODO: Remove this?
    const urlData = request.urlData();
    console.log('urlData: ', urlData);

    try {
      return getRooms(fastify.mysql);
    } catch (err) {
      return reply.send(500); //.json({ error: err });
    }
  });

  fastify.patch<RoomUpdate>('/rooms/:id', async (request, reply) => {
    const { id } = request.params;
    const { label, name } = request.body;

    try {
      const parsedRoomData = ZodRoomRaw.parse({
        id: parseInt(id),
        label,
        name,
      });

      return updateRoom(fastify.mysql, parsedRoomData);
    } catch (err) {
      console.error(err);
      return reply.code(500).send(JSON.stringify(err));
    }
  });

  fastify.post<RoomCreate>('/rooms', async (request, reply) => {
    const { label, name } = request.body;

    try {
      const { label: parsedLabel, name: parsedName } = ZodRoomRaw.parse({
        id: 1234,
        label,
        name,
      });

      return createRoom(fastify.mysql, { label: parsedLabel, name: parsedName });
    } catch (err) {
      console.error(err);
      return reply.code(500).send(JSON.stringify(err));
    }
  });
};

export default roomRoutes;
