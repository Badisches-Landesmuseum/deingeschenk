import * as fs from 'fs';
import * as path from 'path';
import * as should from 'should';
import { TranscodeService } from '../src/lib/services/transcode';

describe('lib:transcode', () => {
  const transcodeService = new TranscodeService({ disableMaxRuntime: true });


  describe('transcodeAudio', () => {
    const testFiles = [
      '2-seconds-of-silence-wav.wav',
      '2-seconds-of-silence-ogg-vorbis.ogg',
      '2-seconds-of-silence-ogg-opus.ogg',
      '2-seconds-of-silence-webm-vorbis.webm',
      '2-seconds-of-silence-webm-opus.webm',
    ];

    for (const filename of testFiles) {
      const input = path.join(__dirname, './fixtures/audio/', filename);

      it(`Should transcode from ${filename} file`, async () => {
        const result = await transcodeService.transcodeAudio(input);
        should(result).match({ extension: 'm4a', mimeType: 'audio/m4a' });
      });

      it(`Should transcode from ${filename} stream`, async () => {
        const result = await transcodeService.transcodeAudio(fs.createReadStream(input));
        should(result).match({ extension: 'm4a', mimeType: 'audio/m4a' });
      });
    }
  });


  describe('transcodeImage', () => {
    const testFiles = [
      'black.bmp',
      'black.gif',
      'black.jpg',
      'black.png',
    ];

    for (const filename of testFiles) {
      const input = path.join(__dirname, './fixtures/images/', filename);

      it(`Should transcode from ${filename} file`, async () => {
        const result = await transcodeService.transcodeImage(input);
        should(result).match({ extension: 'jpg', mimeType: 'image/jpeg' });
      });

      it(`Should transcode from ${filename} stream`, async () => {
        const result = await transcodeService.transcodeImage(fs.createReadStream(input));
        should(result).match({ extension: 'jpg', mimeType: 'image/jpeg' });
      });
    }
  });
});
