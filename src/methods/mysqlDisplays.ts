import { MySQLPromisePool } from '@fastify/mysql';
import { RowDataPacket } from 'mysql2';
import { Display, DisplayRaw } from '../types/display';
import { ZodDisplayRaw } from '../types/display.zod';
import { PromiseData } from '../types/response';

async function createDisplay(connection: MySQLPromisePool, displayData: Omit<Display, 'id'>): PromiseData<DisplayRaw> {
  let queryString = 'INSERT INTO Rooms (name';
  queryString += ', room_id';
  queryString += ')';

  queryString += 'VALUES (' + displayData.name;
  queryString += ', ' + displayData.roomId.toString();
  queryString += ')';

  const [rows] = await connection.query<RowDataPacket[]>(queryString);
  if (Array.isArray(rows) && rows.length === 1) {
    const row = rows[0];

    return { data: ZodDisplayRaw.parse(row) };
  }

  throw new Error('There was an error creating your display');
}

/**
 * Get single display information.
 * @param id - display ID
 */
async function getDisplay(connection: MySQLPromisePool, id: string): PromiseData<DisplayRaw> {
  let queryString = 'SELECT * FROM Displays WHERE ID = "';
  queryString += id + '"';

  const [rows] = await connection.query<RowDataPacket[]>(queryString);
  if (Array.isArray(rows) && rows.length === 1) {
    const row = rows[0];

    console.log('row: ', row);

    return { data: ZodDisplayRaw.parse(row) };
  }

  throw new Error('There was an error finding your display');
}

/**
 * Get all displays for a given room.
 * @param id - room ID
 */
async function getDisplaysForRoom(connection: MySQLPromisePool, id: string): PromiseData<DisplayRaw[]> {
  let queryString = 'SELECT * FROM Displays WHERE room_id = "';
  queryString += id + '"';

  const [rows] = await connection.query<RowDataPacket[]>(queryString);
  const data = rows.map((row) => ZodDisplayRaw.parse(row));

  return { data };
}

export { createDisplay, getDisplay, getDisplaysForRoom };
