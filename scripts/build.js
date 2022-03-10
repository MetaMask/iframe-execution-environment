const { copyFile, mkdir } = require('fs/promises');
const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));

const ROOT = path.resolve(__dirname, '..');
const NODE_MODULES = path.join(ROOT, 'node_modules');
const DIST = path.join(ROOT, 'public');

const HTML_FILE_NAME = 'index.html';
const LOCKDOWN_FILE_NAME = 'lockdown.umd.min.js';

main();

async function main() {
  await rimraf(DIST);
  await mkdir(DIST);

  // public/index.html
  await copyFile(
    path.join(ROOT, HTML_FILE_NAME),
    path.join(DIST, HTML_FILE_NAME),
  );

  // public/lockdown.umd.min.js
  await copyFile(
    path.join(NODE_MODULES, `ses/dist/${LOCKDOWN_FILE_NAME}`),
    path.join(DIST, LOCKDOWN_FILE_NAME),
  );

  // public/bundle.js
  await copyFile(
    path.join(
      NODE_MODULES,
      '@metamask/execution-environments/dist/iframe.bundle.js',
    ),
    path.join(DIST, 'bundle.js'),
  );
}
