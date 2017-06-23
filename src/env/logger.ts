import * as debug from 'debug';

export default function(name: string) {
  return debug(`codebee:${name}`);
}
