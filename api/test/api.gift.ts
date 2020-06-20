import { Server } from 'http';
import * as should from 'should';
import * as request from 'supertest';
import * as uuidv5 from 'uuid/v5';

import { prepareComponents, shutdownComponents } from './index';


const testGiftData = {
  id: uuidv5('https://api.gift.com/gift/test', uuidv5.URL),
  kind: 'PersonalGift',
  museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
  senderName: 'The sender name',
  recipientName: 'The recipient name',
  parts: [{
    photo: 'https://todo.com/todo',
    note: 'https://todo.com/todo',
    clue: 'Part 1 clue',
  }],
};


describe.skip('api:gift', () => {
  let server: Server;

  before(async () => {
    ({ server } = await prepareComponents());
  });
  after(shutdownComponents);


  describe('[POST] /gift', () => {
    it('should successfully create a gift', async () => {
      const { body } = await request(server)
        .post('/gift')
        .send(testGiftData)
        .expect(201);

      should(body).match(testGiftData);
    });

    it('should refuse to create another gift with the same id', async () => {
      await request(server)
        .post('/gift')
        .send(testGiftData)
        .expect(409);
    });
  });


  describe('[GET] /gift/:giftId', () => {
    it('should retrieve the newly created gift', async () => {
      const { body } = await request(server)
        .get(`/gift/${testGiftData.id}`)
        .expect(200);

      should(body).match(testGiftData);
    });
  });
});
