/**
 * A node repl that can handle basic await syntax.
 *
 * E.g.
 *
 * > const hello = await new Promise(res => setTimeout(() => res('world'), 1000));
 * (1 second later...)
 * 'world'
 * > hello
 * 'world'
 *
 * Some bits from:
 *   https://medium.com/entria/node-repl-with-await-syntax-6e351e347292
 *
 * Also, when you want to get the history file stuff working, take a look at:
 *   https://medium.com/@tjwebb/a-custom-node-repl-with-history-is-not-as-hard-as-it-looks-3eb2ca7ec0bd
 */
import * as repl from 'repl';

function preprocess(input: string): string {
  const awaitMatcher = /^(?:\s*(?:(?:let|var|const)\s)?\s*([^=]+)=\s*|^\s*)(await\s[\s\S]*)/;

  const asyncWrapper = (code: string, binder?: string) => {
    const bindVar = binder ? `global.${binder}` : 'global._last';
    return `
      (async () => {
        let result;
        try {
          result = ${code};
        } catch (err) {
          result = err;
        }
        ${bindVar} = result;
        console.log(result);
      })();`;
  };

  // match & transform
  const match = input.match(awaitMatcher);
  if (match) {
    return asyncWrapper(match[2], match[1]);
  }

  // Return the input as-is if no await syntax matched
  return input;
}

type ReplEvalFunction = (cmd: string, ...args: any[]) => void;

// Curried function to close around a repl eval function and preprocess the code
const evalAsyncWrapper = (originalEval: ReplEvalFunction): ReplEvalFunction =>
  (cmd, ...args) => {
    const code = preprocess(cmd);
    return originalEval(code, ...args);
  };

export function start(options?: string | repl.ReplOptions): repl.REPLServer {
  const replInstance: any = repl.start(options);
  const newEval = evalAsyncWrapper(replInstance.eval);
  replInstance.eval = newEval;
  return replInstance;
}
