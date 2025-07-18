import type { NextApiRequest, NextApiResponse } from 'next';

// Reference the same in-memory items as above
let items = [
  { id: '1', title: 'Mini Drafter Model X', category: 'mini-drafter', price: 300 },
  { id: '2', title: 'Lab Apron Blue', category: 'aprons', price: 150 },
  { id: '3', title: 'Physics Textbook', category: 'books', price: 200 },
  { id: '4', title: 'Old Calculator - Free', category: 'free', price: 0 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(items[itemIndex]);
  } else if (req.method === 'PUT') {
    const { title, category, price } = req.body;
    if (title) items[itemIndex].title = title;
    if (category) items[itemIndex].category = category;
    if (price !== undefined) items[itemIndex].price = price;
    return res.status(200).json(items[itemIndex]);
  } else if (req.method === 'DELETE') {
    items.splice(itemIndex, 1);
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
