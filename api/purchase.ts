import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory user and items data (replace with DB)
let users = [
  { id: 'u1', name: 'Alice', coins: 20, boughtItems: [], soldItems: [] },
  { id: 'u2', name: 'Bob', coins: 50, boughtItems: [], soldItems: [] },
];

let items = [
  { id: '1', title: 'Mini Drafter Model X', category: 'mini-drafter', price: 300, sellerId: 'u1', sold: false },
  { id: '2', title: 'Lab Apron Blue', category: 'aprons', price: 150, sellerId: 'u2', sold: false },
];

// Simple purchase logic:
// User buys item -> user gets +10 coins, seller gets +10 coins
// Item marked sold, user coin balance remains but maybe track transaction

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' });

  const { userId, itemId } = req.body;

  if (!userId || !itemId)
    return res.status(400).json({ message: 'Missing userId or itemId' });

  const user = users.find((u) => u.id === userId);
  const item = items.find((i) => i.id === itemId);

  if (!user || !item) return res.status(404).json({ message: 'User or Item not found' });

  if (item.sold) return res.status(400).json({ message: 'Item already sold' });

  // Mark item as sold
  item.sold = true;

  // Update buyer and seller coins (+10 each)
  user.coins += 10;

  const seller = users.find((u) => u.id === item.sellerId);
  if (seller) {
    seller.coins += 10;
    seller.soldItems.push(item.id);
  }

  user.boughtItems.push(item.id);

  res.status(200).json({ message: 'Purchase successful', userCoins: user.coins });
}
