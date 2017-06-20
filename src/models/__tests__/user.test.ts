import { omit, pick } from 'lodash';

import { setupTest, clearDatabase } from '../../test/helper';
import { User, UserClass, UserModel } from '../user';

const users: UserModel[] = [];

async function setupUsers() {
  for (let i = 0; i < 3; i++) {
    const data: UserClass = {
      name: `user${i}`,
      username: `username${i}`,
      email: `user${i}@example.com`,
      password: ''
    } as any;
    const u = await User.create(data);
    users.push(u);
  }
}

beforeAll(async () => {
  await setupTest();
  await setupUsers();
});

test('test', () => expect(true).toBeTruthy());

test('register new user', async () => {
  const doc: UserClass = {
    name: 'New User',
    username: 'newusername',
    email: 'newuser@example.com',
    password: 'password123'
  };

  const user = (await User.register(doc)).toJSON();
  const newUser = pick.bind(null, user).apply(null, Object.keys(doc));

  expect(newUser).toEqual(doc);
});

test('find user by username', async () => {
  const user = users[0];
  const doc = await User.findByUsername(user.username);
  expect(user.toJSON()).toEqual(doc.toJSON());
});
