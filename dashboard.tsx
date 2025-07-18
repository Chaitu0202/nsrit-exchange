// pages/dashboard.tsx

import { useEffect, useState } from 'react';
import Head from 'next/head';

type Item = {
  id: string;
  title: string;
  price: number;
};

export default function Dashboard() {
  // Dummy state, replace with API calls & auth
  const [coins, setCoins] = useState(75);
  const [itemsForSale, setItemsForSale] = useState<Item[]>([
    { id: '1', title: 'Mini Drafter Model X', price: 300 },
    { id: '5', title: 'Used Engineering Book', price: 150 },
  ]);
  const [itemsBought, setItemsBought] = useState<Item[]>([
    { id: '3', title: 'Physics Textbook', price: 200 },
  ]);
  const [loading, setLoading] = useState(false);

  // Withdraw handler
  const handleWithdraw = async () => {
    if (coins < 60) {
      alert('You need at least 60 coins to withdraw.');
      return;
    }
    setLoading(true);

    try {
      // Call withdraw API here with userId (replace with real user ID)
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'u1' }),
      });
      const data = await res.json();

      if (res.ok) {
        alert('Withdrawal successful! 50 coins credited to your bank.');
        setCoins(data.coins);
      } else {
        alert(data.message || 'Withdrawal failed');
      }
    } catch (error) {
      alert('Something went wrong');
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Dashboard | NSRIT Exchange</title>
      </Head>

      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

        {/* Coins section */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Coin Balance</h2>
          <p className="text-indigo-600 text-5xl font-bold">{coins} 🪙</p>
          <button
            onClick={handleWithdraw}
            disabled={loading || coins < 60}
            className={`mt-4 px-6 py-2 rounded text-white ${
              coins >= 60
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Processing...' : 'Withdraw Coins'}
          </button>
          {coins < 60 && (
            <p className="mt-2 text-sm text-gray-600">
              You need at least 60 coins to withdraw.
            </p>
          )}
        </section>

        {/* Items for Sale */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Items You Are Selling</h2>
          {itemsForSale.length === 0 ? (
            <p>You have not posted any items yet.</p>
          ) : (
            <ul className="list-disc list-inside space-y-2">
              {itemsForSale.map((item) => (
                <li key={item.id}>
                  <span className="font-semibold">{item.title}</span> - ₹{item.price}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Items Bought */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Items You Bought</h2>
          {itemsBought.length === 0 ? (
            <p>You have not bought any items yet.</p>
          ) : (
            <ul className="list-disc list-inside space-y-2">
              {itemsBought.map((item) => (
                <li key={item.id}>
                  <span className="font-semibold">{item.title}</span> - ₹{item.price}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
