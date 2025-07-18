import type { NextApiRequest, NextApiResponse } from 'next';

// Simple in-memory users array
let users = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' });

  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ message: 'Name and email required' });

  // Check if user exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser)
    return res.status(409).json({ message: 'User already exists' });

  // Create new user with 10 signup coins
  const newUser = {
    id: `u${users.length + 1}`,
    name,
    email,
    coins: 10,
    boughtItems: [],
    soldItems: [],
  };

  users.push(newUser);

  res.status(201).json({ message: 'User created', user: newUser });
}
