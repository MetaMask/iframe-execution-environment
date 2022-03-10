const path = require('path');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
  ROOT,
  PUBLIC: path.join(ROOT, 'public'),
};
