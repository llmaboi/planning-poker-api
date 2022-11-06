import { setupServer } from 'msw/node';
import { roomHandlers } from './handlers';

export const server = setupServer(...roomHandlers);
