import { Server } from 'http';
import * as should from 'should';
import * as request from 'supertest';

import { config, prepareComponents, shutdownComponents } from './index';


describe('api:prepared-upload', () => {
  let server: Server;

  before(async () => {
    ({ server } = await prepareComponents());
  });
  after(shutdownComponents);


  describe('[POST] /prepared-upload', () => {
    it('should successfully create a prepared-upload', async () => {
      const { body } = await request(server)
        .post('/prepared-upload')
        .send({ mimeType: 'image/jpeg' })
        .expect(201);

      should(body).match({
        postUrl: (x: any) => typeof x === 'string',
        postFields: (x: any) => typeof x === 'object',
        fileName: new RegExp('.+\.jpeg'),
        fileUrl: new RegExp(`${config.awsRegion}.+${config.awsBucket}.+${config.environment}.*/uploads/`),
        fileType: 'image/jpeg',
      });
    });

    it('should fail with a bad mimeType', async () => {
      await request(server)
        .post('/prepared-upload')
        .send({ mimeType: 'urban/omg' })
        .expect(400);
    });
  });
});
