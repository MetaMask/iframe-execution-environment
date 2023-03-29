const { copyFile, mkdir } = require('fs/promises');
const path = require('path');
const { promisify } = require('util');

const rimraf = promisify(require('rimraf'));
const { PUBLIC, ROOT } = require('./common');

const NODE_MODULES = path.join(ROOT, 'node_modules');

const HTML_FILE_NAME = 'index.html';

main();

/**
 * Our build process for the iframe execution environment website. In detail:
 * - Deletes and rewrites the destination directory, `/public`.
 * - Copies `index.html` and our JavaScript bundle to the destination directory.
 */
async function main() {
  await rimraf(PUBLIC);
  await mkdir(PUBLIC);

  // public/index.html
  await copyFile(
    path.join(
      NODE_MODULES,
      '@metamask/snaps-execution-environments/dist/browserify/iframe/index.html',
    ),
    path.join(PUBLIC, HTML_FILE_NAME),
  );

  // public/bundle.js
  await copyFile(
    path.join(
      NODE_MODULES,
      '@metamask/snaps-execution-environments/dist/browserify/iframe/bundle.js',
    ),
    path.join(PUBLIC, 'bundle.js'),
  );
}
