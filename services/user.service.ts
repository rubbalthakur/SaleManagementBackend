import { UserRepository } from "../repository/user.repository";
import { User } from "../models";

export class UserService {
  private userRepository = new UserRepository();

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(emailId: string) {
    return await this.userRepository.findByEmail(emailId);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return await this.userRepository.create(userData);
  }

  async update(userData: Partial<User>) {
    return await this.userRepository.update(userData);
  }

  async signup(userData: Partial<User>): Promise<User> {
    const existingUser = await this.getUserByEmail(userData.emailId!);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    return await this.createUser(userData);
  }

  async updatePassword(userData: Partial<User>) {
    if (userData.id === undefined) {
      throw new Error("User id required for update");
    }
    return this.update(userData);
  }

  async updateProfile(userData: Partial<User>) {
    if (userData.id === undefined) {
      throw new Error("User id required for update");
    }
    const user = this.getUserById(userData.id);
    if (!user) {
      throw new Error("User not found");
    }
    return this.update(userData);
  }
}
