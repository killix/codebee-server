import * as _ from 'lodash';

const db: { [id: string]: User } = {};

let counter = 1;

export default class User {
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
