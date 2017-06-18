import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String
});
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
  email: string;
  username: string;
  password: string;
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
