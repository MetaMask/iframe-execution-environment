const path = require('path');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
  /**
   * The path to the project root directory from the `./scripts` folder.
   */
  ROOT,

  /**
   * The path to the `./public` folder from the `./scripts` folder.
   */
  PUBLIC: path.join(ROOT, 'public'),
};
