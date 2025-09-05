import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import users from '../models/users.js';

const JWT_SECRET = 'your_jwt_secret'; // Replace with env var in production

export async function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  if (users.find(u => u.username === username)) return res.status(409).json({ error: 'User exists' });
  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: uuidv4(), username, password: hashed });
  res.status(201).json({ message: 'User registered' });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}

export function authorize(req, res) {
  // Simulate OAuth authorization endpoint
  const { client_id, redirect_uri, state } = req.query;
  // In production, validate client_id and redirect_uri
  res.json({ message: 'Consent screen would be shown here', client_id, redirect_uri, state });
}

export function token(req, res) {
  // Simulate token exchange endpoint
  const { code } = req.body;
  // In production, validate code and issue JWT
  if (code === 'valid_code') {
    const token = jwt.sign({ sub: 'user_id' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ access_token: token, token_type: 'Bearer', expires_in: 3600 });
  } else {
    res.status(400).json({ error: 'Invalid code' });
  }
}
