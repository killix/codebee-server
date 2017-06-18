const debug = require('debug');

export default function(name: string) {
  return debug(`codebee:${name}`);
}
