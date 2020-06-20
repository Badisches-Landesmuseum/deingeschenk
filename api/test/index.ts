import { Server } from 'http';
import { Api } from '../src/api';
import { Lib } from '../src/lib';

// TEMP: Hardcode a test config
export const config = {
  environment: 'test',
  sqlUri: 'sqlite3://:memory:',
  corsAllowedOrigins: '*',
  awsAccessKey: 'some-access-key',
  awsSecretAccessKey: 'some-secret-access-key',
  awsBucket: 'some-bucket',
  awsRegion: 'some-region',
};

// Singleton store of all components we've started that need to be shutdown.
type ShutdownableComponent = Api | Lib | Server;
const runningComponents: ShutdownableComponent[] = [];

// Return type of prepareComponents
interface PreparedComponents {
  api: Api;
  lib: Lib;
  server: Server;
}

/**
 * Prepare system components
 *
 * Helper function to instansiate the components we use in the system
 * (similar to what main.ts does).
 *
 * @returns An object with the prepared components
 */
export async function prepareComponents(): Promise<PreparedComponents> {
  const lib = await Lib.create(config);
  runningComponents.push(lib);

  const api = await Api.create({ lib, corsAllowedOrigins: config.corsAllowedOrigins });
  runningComponents.push(api);

  const server: Server = await new Promise((res, rej) => {
    const s = api.listen();
    s.once('listening', () => res(s));
    s.once('error', rej);
  });
  runningComponents.push(server);

  return {
    api,
    lib,
    server,
  };
}

/**
 * Shutdown the currently running compoents
 */
export async function shutdownComponents(): Promise<void> {
  runningComponents.forEach((c) => c.close());
}
