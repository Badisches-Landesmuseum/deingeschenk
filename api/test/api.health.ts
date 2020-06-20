import { Server } from 'http';
import * as should from 'should';
import * as request from 'supertest';

import { prepareComponents, shutdownComponents } from './index';

describe('api:health', () => {
  let server: Server;

  before(async () => {
    ({ server } = await prepareComponents());
  });
  after(shutdownComponents);

  describe('[GET] /ping', () => {
    it('should respond on ping', async () => {
      const { body } = await request(server).get('/ping').expect(200);
      should(body).eql({ pong: true });
    });
  });
});
