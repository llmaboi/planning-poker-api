import { MySQLPromisePool } from '@fastify/mysql';
import { RowDataPacket } from 'mysql2';
import { PromiseData } from '../types/response';
import { Room } from '../types/room';
import { ZodRoomRaw } from '../types/room.zod';

async function getRoom(connection: MySQLPromisePool, id: string): PromiseData<Room> {
  let queryString = 'SELECT * FROM Rooms WHERE ID = "';
  queryString += id + '"';

  const [rows] = await connection.query<RowDataPacket[]>(queryString);
  if (Array.isArray(rows) && rows.length === 1) {
    const row = rows[0];

    return { data: ZodRoomRaw.parse(row) };
  }

  throw new Error('There was an error finding your room');
}

async function getRooms(connection: MySQLPromisePool): PromiseData<Room[]> {
  const queryString = 'SELECT * FROM Rooms';

  const [rows] = await connection.query<RowDataPacket[]>(queryString);
  const data = rows.map((row) => ZodRoomRaw.parse(row));

  return { data };
}

async function updateRoom(connection: MySQLPromisePool, roomData: Room): PromiseData<Room> {
  let queryString = 'UPDATE Rooms ';
  queryString += `SET name = ${roomData.name}, `;
  if (roomData.label) {
    queryString += 'label = ' + roomData.label;
  }
  queryString += 'WHERE id = ' + roomData.id.toString();

  const [rows] = await connection.query<RowDataPacket[]>(queryString);
  if (Array.isArray(rows) && rows.length === 1) {
    const row = rows[0];

    return { data: ZodRoomRaw.parse(row) };
  }

  throw new Error('There was an error updating your room');
}

async function createRoom(connection: MySQLPromisePool, roomData: Omit<Room, 'id'>): PromiseData<Room> {
  let queryString = 'INSERT INTO Rooms (name';
  if (roomData.label) {
    queryString += ', label';
  }
  queryString += ')';

  queryString += 'VALUES (' + roomData.name;
  if (roomData.label) {
    queryString += ', ' + roomData.label;
  }
  queryString += ')';

  const [rows] = await connection.query<RowDataPacket[]>(queryString);
  if (Array.isArray(rows) && rows.length === 1) {
    const row = rows[0];

    return { data: ZodRoomRaw.parse(row) };
  }

  throw new Error('There was an error creating your room');
}

export { createRoom, getRoom, getRooms, updateRoom };
