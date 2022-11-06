import { rest } from 'msw';
import { Room } from '../types/room';

// export const testUrl = 'http://127.0.0.1:3030';
// export const testUrl = 'http://localhost:80';
// export const testUrl = 'http://127.0.0.1:80';
export const testUrl = '127.0.0.1:80';
// export const testUrl = '';

export const roomHandlers = [
  rest.get(testUrl + '/api/rooms/:id', (req, res, ctx) => {
    const data: Room = {
      id: 123,
      label: null,
      name: 'testName',
    };

    console.log('HEEEEEERRRRRRRRREEEEEEEEEE');
    return res(
      ctx.json({
        data,
      })
    );
  }),
  rest.get('/api/rooms/:id', (req, res, ctx) => {
    const data: Room = {
      id: 123,
      label: null,
      name: 'testName',
    };

    console.log('HEEEEEERRRRRRRRREEEEEEEEEE');
    return res(
      ctx.json({
        data,
      })
    );
  }),
  rest.get(testUrl + '/api/rooms', (req, res, ctx) => {
    const data: Room[] = [
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
    return res(
      ctx.json({
        data,
      })
    );
  }),
];
