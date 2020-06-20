import { Server } from 'http';
import * as request from 'supertest';

import { prepareComponents, shutdownComponents } from './index';


const badEvents = [
  { name: 'no-occurred-at', payload: {} },
  { name: 'no-payload', occurredAt: new Date() },
  { payload: {}, occurredAt: new Date() },
];

const goodEvents = [
  { name: 'some-event', payload: { deviceId: 'did', userId: 'uid' }, occurredAt: new Date() },
  { name: 'some-event', payload: { deviceId: 'did', userId: 'uid' }, occurredAt: new Date() },
  { name: 'some-event', payload: { deviceId: 'did', userId: 'uid' }, occurredAt: new Date() },
];


describe('api:event', () => {
  let server: Server;

  before(async () => {
    ({ server } = await prepareComponents());
  });

  after(shutdownComponents);

  describe('[POST] /submit-events', () => {
    it('should force a name, payload and occurredAt', async () => {
      await Promise.all(badEvents.map(
        (event) => request(server).post('/submit-events').send([event]).expect(400),
      ));
    });

    it('should work', async () => {
      await request(server)
        .post('/submit-events')
        .send(goodEvents)
        .expect(204);
    });
  });
});
