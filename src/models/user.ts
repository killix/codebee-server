import * as _ from 'lodash';

const db: { [id: string]: User } = {};

let counter = 1;

export class User {
  id: string;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  save() {
    if (!this.id)
      this.id = (counter++).toString();
    db[this.id] = this;
  }

  static findById(id: string) {
    const u: User = db[id];
    if (!u)
      throw new Error(`User ${id} does not exist`);
    return u;
  }

  static allUsers() {
    return _.values(db);
  }
}

for (let i = 0; i < 3; i++) {
  new User(`u${i + 1}`).save();
}

import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({ name: String });
schema.set('toJSON', {
  id: true,
  getters: true,
  versionKey: false,
  transform: (_: any, ret: mongoose.Document) => {
    delete ret._id;
    return ret;
  }
});

class UserClass {
  name: string;
}

type UserModel = UserClass & mongoose.Document;

schema.loadClass(UserClass);
const userModel = mongoose.model<UserModel>('User', schema);

async function test() {
  const us: UserModel[] = [];
  for (let i = 0; i < 3; i++) {
    const data = { name: `u${i + 1}` };
    us.push(await userModel.create(data));
  }
  const test = await userModel.findById(us[1]._id);
  console.log(test.toJSON());
}
test();

export default userModel;
