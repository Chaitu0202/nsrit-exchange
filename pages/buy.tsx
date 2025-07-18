// pages/buy.tsx

import { useState } from 'react';
import Head from 'next/head';

const categories = ['mini-drafter', 'aprons', 'books', 'free'];

const itemsData = [
  {
    id: 1,
    title: 'Mini Drafter Model X',
    category: 'mini-drafter',
    price: 300,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Lab Apron Blue',
    category: 'aprons',
    price: 150,
    image: 'https://images.unsplash.com/photo-1526403222735-c7b4e0d6e6be?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Physics Textbook',
    category: 'books',
    price: 200,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'Old Calculator - Free',
    category: 'free',
    price: 0,
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=400&q=80',
  },
  // Add more dummy items here
];

export default function Buy() {
  const [selectedCategory, setSelectedCategory] = useState('mini-drafter');

  const filteredItems = itemsData.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Browse Items | NSRIT Exchange</title>
      </Head>

      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Browse Items</h1>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold
                ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-indigo-100'
                } transition`}
            >
              {cat
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No items available in this category.
            </p>
          )}

          {filteredItems.map(({ id, title, price, image }) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              <img src={image} alt={title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="mt-2 text-indigo-600 font-bold">
                  {price === 0 ? 'Free' : `₹${price}`}
                </p>
                <button
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  onClick={() => alert(`Buying ${title} (Implement purchase logic)`)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
