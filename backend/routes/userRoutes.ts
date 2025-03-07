import { Router } from 'express';
import { AuthService } from '../services/AuthService';
import { validation } from '../utils/validation';

const router = Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!validation.isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validation.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password does not meet requirements' });
    }

    const user = await authService.register(email, password, name);
    res.status(201).json({ user });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const { user, token } = await authService.login(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/password/update', async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!validation.isStrongPassword(newPassword)) {
      return res.status(400).json({ error: 'New password does not meet requirements' });
    }

    await authService.updatePassword(userId, oldPassword, newPassword);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update failed:', error);
    res.status(400).json({ error: 'Password update failed' });
  }
});

export default router;