import { ReadStream } from 'fs';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import * as uuidv4 from 'uuid/v4';
import * as ffmpeg from 'fluent-ffmpeg';

import { getLogger } from '../../util-libs/logging';

const logger = getLogger('lib:transcode');
const MAX_FFMPEG_RUNTIME = 60; // 1 min

// ------
// Domain
// ------

interface TranscodeResult {
  stream: ReadStream;
  extension: string;
  mimeType: string;
}


// -------
// Service
// -------

interface TranscodeConfig {
  // See below: this is really just here to override for testing atm.
  disableMaxRuntime?: boolean;
}

// TODO: Submit PR to fix FluentFfmpeg
//
// Unfortunately this ffmpeg library doesn't cleanup it's timers when the
// process finishes, so if you set a timeout when creating the command (e.g.
// ffmpeg({ timeout: 60 })) that timer will sit around for 60 secs. This is
// mostly annoying when trying to run tests as the test suite won't terminate
// till the event loop is empty.
//
// tslint:disable-next-line max-line-length
// See: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/blob/dcc052ab578bced58ce56e52edf58284688f6e60/lib/processor.js#L466


export class TranscodeService {

  private maxRuntime?: number;

  /**
   * Instantiate a TranscodeService.
   */
  public constructor(config: TranscodeConfig) {
    this.maxRuntime = (config.disableMaxRuntime) ? undefined : MAX_FFMPEG_RUNTIME;
  }

  /**
   * Transcode an audio input into AAC format in an MP4 container (m4a).
   *
   * See: https://trac.ffmpeg.org/wiki/Encode/AAC
   *
   * ffmpeg -i input.wav -c:a aac -ac 1 -b:a 64k -movflags +faststart output.m4a
   *
   * Uses:
   * - native aac encoder
   * - hard limit to 5mins max
   * - downmix to mono
   * - target bitrate 64k
   * - enable progressive download
   *
   * Consider adding:
   * - normalization
   * - silence detection
   * - libfdk_aac
   */
  public async transcodeAudio(input: string | ReadStream): Promise<TranscodeResult> {
    const fileName = `${uuidv4()}.m4a`;
    const filePath = path.join(os.tmpdir(), fileName);

    logger.debug('OutputPath', filePath);

    return new Promise((res, rej) => {
      const command = ffmpeg({ logger, timeout: this.maxRuntime })
        .input(input)
        .output(filePath)
        .duration('00:05:00')
        .audioChannels(1)
        .audioCodec('aac')
        .audioBitrate('64k')
        .outputOptions([
          '-movflags',
          '+faststart',
        ]);

      command.on('stderr', (line: string) => {
        logger.debug(`FfmpegStdErr: ${line}`);
      });

      command.on('end', () => {
        const stream = fs.createReadStream(filePath);
        const result = {
          stream,
          extension: 'm4a',
          mimeType: 'audio/m4a',
        };
        fs.unlink(filePath, (unlinkError) => {
          if (unlinkError) logger.error(unlinkError, 'CleanupError');
          logger.debug('TranscodeResult', result);
          res(result);
        });
      });

      command.on('error', (err) => {
        logger.error(err, 'FfmpegError');

        // If any output was written, attempt to clean it up before returning
        fs.unlink(filePath, (unlinkError) => {
          if (unlinkError) logger.debug('CleanupError', unlinkError);
          rej(err);
        });
      });

      command.run();
    });
  }


  /**
   * Transcode an image input into jpeg format.
   *
   * ffmpeg -i input.png -qscale:v 3 output.jpg
   *
   * Consider adding:
   * - graphics/image magick instead (much better suited!)
   */
  public async transcodeImage(input: string | ReadStream): Promise<TranscodeResult> {
    const fileName = `${uuidv4()}.jpg`;
    const filePath = path.join(os.tmpdir(), fileName);

    logger.debug('OutputPath', filePath);

    return new Promise((res, rej) => {
      const command = ffmpeg({ logger, timeout: this.maxRuntime })
        .input(input)
        .output(filePath)
        .outputOptions('-qscale:v 3');

      command.on('stderr', (line: string) => {
        logger.debug(`FfmpegStdErr: ${line}`);
      });

      command.on('end', () => {
        const stream = fs.createReadStream(filePath);
        const result = {
          stream,
          extension: 'jpg',
          mimeType: 'image/jpeg',
        };
        fs.unlink(filePath, (unlinkError) => {
          if (unlinkError) logger.error(unlinkError, 'CleanupError');
          logger.debug('TranscodeResult', result);
          res(result);
        });
      });

      command.on('error', (err) => {
        logger.error(err, 'FfmpegError');

        // If any output was written, attempt to clean it up before returning
        fs.unlink(filePath, (unlinkError) => {
          if (unlinkError) logger.debug('CleanupError', unlinkError);
          rej(err);
        });
      });

      command.run();
    });
  }
}
