import { server as mswServer } from '../mocks/server';

beforeAll(() => {
  mswServer.listen({ onUnhandledRequest: 'error' });
  mswServer.printHandlers();
});

afterEach(() => {
  mswServer.resetHandlers();
});

afterAll(() => {
  mswServer.close();
});
