import { JsonWebTokenError } from 'jsonwebtoken';
import { pick } from 'lodash';

import Authorization from '../Authorization';
import { setEnv } from '../../env/Environment';

const PAYLOAD = {
  uid: 'user123'
};

function comparePayloads(original: object, decoded: object) {
  expect(pick(decoded, 'uid')).toEqual(pick(original, 'uid'));
}

beforeEach(() => {
  setEnv('JWT_SECRET', '123');
});

test('generate jwt token with user id', async () => {
  const token = await Authorization.generateToken(PAYLOAD);
  const decoded = await Authorization.decodeToken(token);
  comparePayloads(PAYLOAD, decoded);
});

test('fail on incorrect secret', async () => {
  const token = await Authorization.generateToken(PAYLOAD);
  setEnv('JWT_SECRET', '321');
  await expect(Authorization.decodeToken(token)).rejects.toBeInstanceOf(JsonWebTokenError);
});
