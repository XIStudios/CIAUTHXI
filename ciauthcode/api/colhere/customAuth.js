import users from '../../../src/models/users.js';
import { hashPassword, comparePassword, generateToken } from '../../lib/authUtils.js';

export async function customRegister(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  if (users.find(u => u.username === username)) return res.status(409).json({ error: 'User exists' });
  const hashed = await hashPassword(password);
  users.push({ id: Date.now().toString(), username, password: hashed });
  res.status(201).json({ message: 'User registered (custom)' });
}

export async function customLogin(req, res) {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await comparePassword(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken({ id: user.id, username: user.username });
  res.json({ token, custom: true });
}
