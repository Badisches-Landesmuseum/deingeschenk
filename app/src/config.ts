/**
 * The config module.
 *
 * This module is responsible for obtaining and parsing any necessary
 * configuration.  It is the responsibility of this module to fail
 * hard and fast if any required config is missing.  Else the bugs
 * will probably just appear in production when you least expect it.
 * That wouldn't be good.
 */

class ConfigError extends Error {
  public name = 'ConfigError';
}

// =====================================================================

export interface Config {
  environment: string;
  apiUri: string;
  museumOverride?: 'demo' | 'brighton' | 'munch' | 'mpu';
}


export const config: Config = {
  environment: readAsString(process.env.ENVIRONMENT),
  apiUri: readAsString(process.env.API_URI),
  museumOverride: (process.env.MUSEUM_OVERRIDE === 'demo') ? 'demo'
                : (process.env.MUSEUM_OVERRIDE === 'brighton') ? 'brighton'
                : (process.env.MUSEUM_OVERRIDE === 'munch') ? 'munch'
                : (process.env.MUSEUM_OVERRIDE === 'mpu') ? 'mpu'
                : undefined,
};


// =====================================================================


// =======
// Helpers
// =======

function readAsString(val?: string): string {
  return readOrThrow(val);
}

// function readAsBool(val?: string): boolean {
//   const val = readOrThrow(val).toLowerCase();
//   if (val === 'true') return true;
//   if (val === 'false') return false;
//   throw new ConfigError(`Invalid value: ${name}`);
// }

// function readAsInt(val?: string): number {
//   return parseInt(readOrThrow(val), 10);
// }

function readOrThrow(val?: string): string {
  if (val === undefined || val.trim() === '') {
    throw new ConfigError(`Required value missing: ${name}`);
  }

  return val.trim();
}
