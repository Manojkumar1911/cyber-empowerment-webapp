import { UserModel, User } from '../models/User';
import { security } from '../utils/security';
import { validation } from '../utils/validation';

export class AuthService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async register(email: string, password: string, name: string): Promise<User> {
    // Validate input
    if (!validation.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    if (!validation.isStrongPassword(password)) {
      throw new Error('Password does not meet security requirements');
    }

    // Check if user already exists
    const existingUser = await this.userModel.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = security.hashData(password);

    // Create user
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
    });

    return user;
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Find user
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const hashedPassword = security.hashData(password);
    if (hashedPassword !== user.password) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = security.generateSecureToken();

    return { user, token };
  }

  async validateToken(token: string): Promise<User | null> {
    // Add token validation logic here
    // This is a placeholder implementation
    return null;
  }

  async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    const hashedOldPassword = security.hashData(oldPassword);
    if (hashedOldPassword !== user.password) {
      throw new Error('Invalid current password');
    }

    // Validate new password
    if (!validation.isStrongPassword(newPassword)) {
      throw new Error('New password does not meet security requirements');
    }

    // Update password
    const hashedNewPassword = security.hashData(newPassword);
    await this.userModel.update(userId, { password: hashedNewPassword });

    return true;
  }
}