import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

import { hashPassword } from '../modules/password';

interface UserStatic {
  findByUsername(username: string): Promise<UserModel>;
  register(user: UserClass): Promise<UserModel>;
}

class UserStatic {
  static async findByUsername(username: string) {
    return await User.findOne({ username });
  }

  static async register(user: UserClass) {
    user.password = await hashPassword(user.password);
    return await User.create(user);
  }
}

export class UserClass {
  name: string;
  email: string;
  username: string;
  password: string;
}

export type UserModel = UserClass & Document;
type UserType = UserClass & UserStatic & Model<UserModel>;

const schema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String
});

schema.set('toJSON', {
  id: true,
  getters: true,
  versionKey: false,
  transform: (_: any, ret: Document) => {
    delete ret._id;
    return ret;
  }
});

schema.loadClass(UserClass);
schema.loadClass(UserStatic);

export const User = mongoose.model<UserModel>('User', schema) as UserType;

export default User;
