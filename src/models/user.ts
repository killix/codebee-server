import * as mongoose from 'mongoose';
import { Document, Model, Schema } from 'mongoose';

import { setupSchema, autoIncrement } from './ModelUtils';
import { hashPassword, validatePassword } from '../modules/Password';

export class LoginError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}

interface UserRegistration {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface UserStatic {
  guest(): UserModel;
  findByUsername(username: string): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel>;
  register(user: UserRegistration): Promise<UserModel>;
  login(email: string, password: string): Promise<UserModel>;
}

class UserStatic {
  static guest() {
    return new User({
      name: 'Guest'
    });
  }

  static async findByUsername(username: string) {
    return await User.findOne({ username });
  }

  static async findByEmail(email: string) {
    return await User.findOne({ email });
  }

  static async register(user: UserRegistration) {
    user.password = await hashPassword(user.password);
    return await User.create(user);
  }

  static async login(email: string, password: string) {
    const user = await User.findByEmail(email);
    if (await validatePassword(password, user.password)) {
      return user;
    }
    throw new LoginError();
  }
}

export class UserClass {
  name: string;
  email: string;
  username: string;
  password: string;

  isAuthenticated() {
    return !!this.email;
  }
}

export type UserModel = UserClass & Document;
type UserType = UserClass & UserStatic & Model<UserModel>;

const schema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: String
});

setupSchema(schema);
autoIncrement('User', schema);

schema.loadClass(UserClass);
schema.loadClass(UserStatic);

export const User = mongoose.model<UserModel>('User', schema) as UserType;

export default User;
