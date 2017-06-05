import * as _ from 'lodash';

const db: { [id: number]: User } = {};

let counter = 1;

export default class User {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  save() {
    if (!this.id)
      this.id = counter++;
    db[this.id] = this;
  }

  static findById(id: number) {
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
