import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory users array (replace with DB)
let users = [
  { id: 'u1', name: 'Alice', coins: 75, bankBalance: 0 },
  { id: 'u2', name: 'Bob', coins: 40, bankBalance: 0 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' });

  const { userId } = req.body;

  if (!userId) return res.status(400).json({ message: 'Missing userId' });

  const user = users.find((u) => u.id === userId);

  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.coins < 60) {
    return res.status(400).json({ message: 'Need at least 60 coins to withdraw' });
  }

  // Withdraw 60 coins, credit 50 to bank balance
  user.coins -= 60;
  user.bankBalance += 50;

  res.status(200).json({ message: 'Withdrawal successful', coins: user.coins, bankBalance: user.bankBalance });
}
