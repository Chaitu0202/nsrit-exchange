import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory item store — replace with your DB
let items = [
  { id: '1', title: 'Mini Drafter Model X', category: 'mini-drafter', price: 300 },
  { id: '2', title: 'Lab Apron Blue', category: 'aprons', price: 150 },
  { id: '3', title: 'Physics Textbook', category: 'books', price: 200 },
  { id: '4', title: 'Old Calculator - Free', category: 'free', price: 0 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all items
    res.status(200).json(items);
  } else if (req.method === 'POST') {
    // Add new item from req.body
    const { title, category, price } = req.body;
    if (!title || !category || price === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newItem = {
      id: (items.length + 1).toString(),
      title,
      category,
      price,
    };
    items.push(newItem);
    res.status(201).json(newItem);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
