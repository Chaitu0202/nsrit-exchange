// pages/sell.tsx

import { useState } from 'react';
import Head from 'next/head';

export default function Sell() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Replace with actual backend/API call
    console.log('Posting item:', form);
    alert('Item posted successfully!');
  };

  return (
    <>
      <Head>
        <title>Sell an Item | NSRIT Exchange</title>
      </Head>

      <main className="min-h-screen bg-gray-100 px-4 py-10 sm:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Post an Item for Sale</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Item Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              >
                <option value="">Select category</option>
                <option value="mini-drafter">Mini Drafter</option>
                <option value="aprons">Aprons</option>
                <option value="books">Books</option>
                <option value="free">Free Item (Earn 2-3 Coins!)</option>
              </select>
            </div>

            {/* Price */}
            {form.category !== 'free' && (
              <div>
                <label className="block mb-1 font-medium text-gray-700">Price (INR)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>
            )}

            {/* Image URL (placeholder) */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Image URL (optional)</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/item.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition font-medium"
              >
                Post Item
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
