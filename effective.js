import { effection } from 'effection';
import readline from 'readline';

effection.run(main).then(() => process.exit(0)).catch(() => process.exit(1));


// A hypothetical async operation to generate two directories in parallel for
// the `bigtest init` command. At the top is a listener that listens for the
// `ESC` to be pressed. If at any time, the user presses escape, then it will
// cancel the top level frame, resulting in all children to be cancelled.

async function main(frame) {
  frame.call(withEscape((frame) => {
    frame.call(generateTestsDirectory);
    frame.call(generateFactoriesDirectory);
  }));
  await frame.return;
}

async function generateTestsDirectory(frame) {
  try {
    // generate the tests direcotry

  } catch {
    // clean up in case of an error, including cancellation.
  }
}

async function generateFactoriesDirectory(frame) {
  try {
    // generate the network direcotry

  } catch {
    // clean up in case of an error, including cancellation.
  }
}


// takes an async function `fn` and returns a function that can be called
// which spawns a new frame with the parent waiting for an `ESC` key to cancel
// all of the children.
function withEscape(fn) {
  return async (frame) => {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => key === 'ESC' && frame.cancel());
    frame.call(fn);
    await frame.return;
  };
}
