// pages/index.tsx

import Head from 'next/head';

const categories = [
  {
    title: '📐 Mini Drafter',
    description: 'Explore used mini drafters at affordable prices.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    title: '🧑‍🍳 Aprons',
    description: 'Clean, used aprons for labs and cooking sessions.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: '📚 Books',
    description: 'Buy/sell academic and reference books.',
    color: 'from-green-400 to-emerald-600',
  },
  {
    title: '🎁 Free Items',
    description: 'Post items for free and earn 2-3 coins!',
    color: 'from-yellow-400 to-orange-500',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>NSRIT Exchange</title>
        <meta name="description" content="Buy, sell, or give away items at NSRIT" />
      </Head>

      <main className="bg-gray-50 min-h-screen px-4 py-10 sm:px-8">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            Welcome to <span className="text-indigo-600">NSRIT Exchange</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Buy, Sell, or Give away items on campus and earn coins!
          </p>
        </section>

        {/* Category Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${cat.color} text-white p-6 rounded-xl shadow-lg transform transition hover:scale-105 cursor-pointer`}
            >
              <h2 className="text-xl font-semibold mb-2">{cat.title}</h2>
              <p className="text-sm opacity-90">{cat.description}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Ready to trade?</h2>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="/sell"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Sell an Item
            </a>
            <a
              href="/buy"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition"
            >
              Browse Items
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
