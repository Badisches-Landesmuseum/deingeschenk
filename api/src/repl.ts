import { start } from './util-libs/async-repl';

import { Lib } from './lib';
import { config } from './config';

// tslint:disable no-console

console.log(`
===============================================================================
ENVIRONMENT: ${config.environment}
===============================================================================
`);

async function main(): Promise<void> {
  const lib = await Lib.create(config);
  const repl = start({ prompt: '> ' });
  repl.context.config = config;
  repl.context.lib = lib;
}
main().catch(console.error);
