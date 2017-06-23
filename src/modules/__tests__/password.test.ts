import { range } from 'lodash';

import * as password from '../Password';

const PASSWORD = 'abc123';

const passwords: string[] = [];

beforeAll(async () => {
  for (let i = 0; i < 2; i++) {
    passwords.push(await password.hashPassword(PASSWORD));
  }
});

test('hash two passwords differently', () => {
  expect(passwords[0]).not.toBe(passwords[1]);
});

test('correctly validates a password', async () => {
  expect(await password.validatePassword(PASSWORD, passwords[0])).toBeTruthy();
});

test('correctly rejects a password', async () => {
  expect(await password.validatePassword('123', passwords[0])).toBeFalsy();
});

test('hashes a long password', async () => {
  const longPassword = range(300).reduce(prev => prev + 'a', '');
  const hash = await password.hashPassword(longPassword);
  expect(await password.validatePassword(longPassword, hash)).toBeTruthy();
  expect(await password.validatePassword(longPassword + 'a', hash)).toBeFalsy();
});
