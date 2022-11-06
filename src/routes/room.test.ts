import { FastifyInstance } from 'fastify/types/instance';
import { createServer } from '../config/server';
import { testUrl } from '../mocks/handlers';
import { Room } from '../types/room';
import { ZodRoomRaw } from '../types/room.zod';
import * as mysqlRooms from '../methods/mysqlRooms';
import { registerMySQL } from '../config/mysql';

jest.mock('../methods/mysqlRooms', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    __esModule: true, //    <----- this __esModule: true is important
    ...jest.requireActual('../methods/mysqlRooms'),
  };
});

const room: Room = {
  id: 123,
  label: null,
  name: 'testName',
};
const rooms: Room[] = [
  {
    id: 123,
    label: null,
    name: 'testName',
  },
  {
    id: 234,
    label: null,
    name: 'notATestName',
  },
];

async function abcde() {
  return new Promise((resolve) => {
    server.listen({ port: 3030 }, () => {
      console.log('started');
      resolve(true);
    });
  });
}

let server: FastifyInstance;

beforeAll(async () => {
  server = await createServer();
  await registerMySQL(server);

  // await abcde();
});

afterAll(async () => {
  if (server) {
    await server.close();
  }
});

describe('Route: /rooms/:id', () => {
  describe('get room by id', () => {
    test('returns 200 and room data', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // const mySqlRoomMock = jest.spyOn(mysqlRooms, 'getRoom').mockReturnValueOnce({ data: room });

      const response = await server.inject({
        method: 'GET',
        url: '/api/rooms/1',
      });

      console.log('path: ', server.server.address());

      // console.log(server.server.address());
      // const response = await fetch(testUrl + '/api/rooms/1');

      // expect(response.status).toEqual(200);
      expect(response.statusCode).toEqual(200);
      const { data } = response.json<{ data: Room }>();
      // const data = response.json();
      // console.log(response);
      console.log(data);
      const { success } = ZodRoomRaw.safeParse(data);
      expect(success).toBeTruthy();
      // mySqlRoomMock.mockRestore();
      return Promise.resolve();
    });
  });
});

// Test trying MSW 😟
// describe('Route: /rooms/:id', () => {
//   describe('get room by id', () => {
//     test('returns 200 and room data', async () => {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       // const mySqlRoomMock = jest.spyOn(mysqlRooms, 'getRoom').mockReturnValueOnce({ data: room });

//       // const response = await server.inject({
//       //   method: 'GET',
//       //   url: '/api/rooms/1',
//       // });

//       console.log('path: ', server.server.address());

//       // console.log(server.server.address());
//       console.log(testUrl + '/api/rooms/1');
//       const response = await fetch(testUrl + '/api/rooms/1');

//       expect(response.status).toEqual(200);
//       // expect(response.statusCode).toEqual(200);
//       // const { data } = response.json<{ data: Room }>();
//       const data = response.json();
//       // console.log(response);
//       console.log(data);
//       const { success } = ZodRoomRaw.safeParse(data);
//       expect(success).toBeTruthy();
//       // mySqlRoomMock.mockRestore();
//       return Promise.resolve();
//     });
//   });
// });

describe('Route: /rooms', () => {
  describe('get rooms', () => {
    test('returns 200 and rooms data', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // const mySqlRoomMock = jest.spyOn(mysqlRooms, 'getRooms').mockReturnValueOnce({ data: rooms });

      const response = await server.inject({
        method: 'GET',
        url: '/api/rooms',
      });

      console.log('path: ', server.server.address());

      // console.log(server.server.address());
      // const response = await fetch(testUrl + '/api/rooms/1');

      // expect(response.status).toEqual(200);
      expect(response.statusCode).toEqual(200);
      const { data } = response.json<{ data: Room[] }>();
      // const data = response.json();
      // console.log(response);

      console.log(data);
      expect(data.length).toBeGreaterThan(0);
      const { success } = ZodRoomRaw.safeParse(data[0]);
      expect(success).toBeTruthy();
      // mySqlRoomMock.mockRestore();
      return Promise.resolve();
    });
  });
});
