import { User } from "../models";

export class UserRepository {
  async findByEmail(emailId: string): Promise<User | null> {
    return await User.findOne({ where: { emailId } });
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async create(userData: Partial<User>): Promise<User> {
    return await User.create(userData);
  }

  async update(userData: Partial<User>) {
    return await User.update(userData, { where: { id: userData.id } });
  }
}
