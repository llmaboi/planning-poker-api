import { testServer } from '../config/setupTests';
import { DisplayRaw } from '../types/display';
import { ZodDisplayRaw } from '../types/display.zod';

describe('Route: /displays/room/:id', () => {
  describe('get displays by room id', () => {
    test('returns 200 and display data', async () => {
      const response = await testServer.inject({
        method: 'GET',
        url: '/api/displays/room/1',
      });

      expect(response.statusCode).toEqual(200);
      const { data } = response.json<{ data: DisplayRaw[] }>();
      expect(data.length).toBeGreaterThan(0);
      const { success } = ZodDisplayRaw.safeParse(data[0]);
      expect(success).toBeTruthy();
      return Promise.resolve();
    });
  });
});

describe('Route: /displays/:id', () => {
  describe('get a display by id', () => {
    test('returns 200 and display data', async () => {
      const response = await testServer.inject({
        method: 'GET',
        url: '/api/displays/1',
      });

      expect(response.statusCode).toEqual(200);
      const { data } = response.json<{ data: DisplayRaw }>();
      const { success } = ZodDisplayRaw.safeParse(data);
      expect(success).toBeTruthy();
      return Promise.resolve();
    });
  });

  describe('create or update a display by id', () => {
    test('returns 200 and display data for creation and updating', async () => {
      const testDisplay: Omit<DisplayRaw, 'id'> = {
        name: 'Wazzo',
        room_id: 12333445566,
      };

      const createResponse = await testServer.inject({
        method: 'POST',
        url: '/api/displays',
        payload: { roomId: testDisplay.room_id, name: testDisplay.name },
      });
      expect(createResponse.statusCode).toEqual(200);
      const { data: createData } = createResponse.json<{ data: DisplayRaw }>();
      const { success: createSuccess } = ZodDisplayRaw.safeParse(createData);
      expect(createSuccess).toBeTruthy();
      expect(testDisplay.name).toEqual(createData.name);
      expect(testDisplay.room_id).toEqual(createData.room_id);

      const newDisplay: Omit<DisplayRaw, 'id'> = {
        name: 'Updated Wazzo',
        room_id: 11111999999,
      };
      const updateResponse = await testServer.inject({
        method: 'PATCH',
        url: '/api/displays/' + createData.id.toString(),
        payload: { roomId: newDisplay.room_id, name: newDisplay.name },
      });

      expect(updateResponse.statusCode).toEqual(200);
      const { data: updateData } = updateResponse.json<{ data: DisplayRaw }>();
      const { success } = ZodDisplayRaw.safeParse(updateData);
      expect(success).toBeTruthy();
      expect(newDisplay.name).toEqual(updateData.name);
      expect(newDisplay.room_id).toEqual(updateData.room_id);
    });
  });
});
