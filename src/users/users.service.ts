import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    email: string,
    password: string,
    role = 'customer',
  ): Promise<User> {
    const newUser = new this.userModel({ email, password, role });
    return newUser.save();
  }

  // Read
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Read (single user by ID)
  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // Update
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  // Delete
  async deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
