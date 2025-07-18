// pages/item/[id].tsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';

// Dummy items data (replace with API call)
const itemsData = [
  {
    id: '1',
    title: 'Mini Drafter Model X',
    description: 'A well-maintained Mini Drafter used for engineering drawing.',
    category: 'mini-drafter',
    price: 300,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Lab Apron Blue',
    description: 'Used lab apron suitable for chemical and engineering labs.',
    category: 'aprons',
    price: 150,
    image: 'https://images.unsplash.com/photo-1526403222735-c7b4e0d6e6be?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Physics Textbook',
    description: 'Second-hand physics textbook, covers all basic concepts.',
    category: 'books',
    price: 200,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Old Calculator - Free',
    description: 'Old but functional calculator, free to anyone in need.',
    category: 'free',
    price: 0,
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80',
  },
];

export default function ItemDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    // Find item by id (replace with API fetch)
    const found = itemsData.find((i) => i.id === id);
    setItem(found || null);
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading item details...
      </div>
    );
  }

  const handleBuy = () => {
    alert(`You are buying "${item.title}". Implement purchase flow!`);
  };

  return (
    <>
      <Head>
        <title>{item.title} | NSRIT Exchange</title>
      </Head>

      <main className="min-h-screen bg-gray-50 px-4 py-10 max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 text-indigo-600 hover:underline"
        >
          &larr; Back
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <img
            src={item.image}
            alt={item.title}
            className="w-full md:w-1/2 h-64 object-cover"
          />
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.title}</h1>
              <p className="text-gray-700 mb-6">{item.description}</p>
              <p className="text-indigo-600 font-extrabold text-2xl">
                {item.price === 0 ? 'Free' : `₹${item.price}`}
              </p>
            </div>

            <button
              onClick={handleBuy}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
