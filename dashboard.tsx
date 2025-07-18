// pages/dashboard.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

type Item = {
  id: string;
  title: string;
  price: number;
};

export default function Dashboard() {
  const [coins, setCoins] = useState(75);
  const [itemsForSale, setItemsForSale] = useState<Item[]>([
    { id: "1", title: "Mini Drafter Model X", price: 300 },
    { id: "5", title: "Used Engineering Book", price: 150 },
  ]);
  const [itemsBought, setItemsBought] = useState<Item[]>([
    { id: "3", title: "Physics Textbook", price: 200 },
  ]);
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (coins < 60) {
      alert("You need at least 60 coins to withdraw.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "u1" }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Withdrawal successful! 50 coins credited to your bank.");
        setCoins(data.coins);
      } else {
        alert(data.message || "Withdrawal failed");
      }
    } catch (error) {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Dashboard | NSRIT Exchange</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 font-poppins">
        {/* Header */}
        <header className="max-w-6xl mx-auto flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            {/* NSRIT Logo */}
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/NSRIT_Logo.png/220px-NSRIT_Logo.png"
              alt="NSRIT Logo"
              width={60}
              height={60}
              className="rounded-full shadow-md"
              priority
            />
            <h1 className="text-3xl font-extrabold text-blue-900">
              NSRIT Exchange
            </h1>
          </div>
          <nav>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md shadow-md transition"
              onClick={() => alert("Logout functionality pending")}
            >
              Logout
            </button>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto p-6">
          {/* Coins Section */}
          <section className="mb-10 bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                Your Coin Balance
              </h2>
              <p className="text-indigo-900 text-6xl font-extrabold flex items-center space-x-3">
                <span>{coins}</span>
                <span className="text-4xl">🪙</span>
              </p>
              {coins < 60 && (
                <p className="mt-2 text-gray-500 font-medium">
                  You need at least 60 coins to withdraw.
                </p>
              )}
            </div>
            <button
              onClick={handleWithdraw}
              disabled={loading || coins < 60}
              className={`mt-6 md:mt-0 px-8 py-3 rounded-full text-white font-semibold shadow-lg transition ${
                coins >= 60
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : "Withdraw Coins"}
            </button>
          </section>

          {/* Items for Sale */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">
              Items You're Selling
            </h2>
            {itemsForSale.length === 0 ? (
              <p className="text-gray-600 italic">You have not posted any items yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {itemsForSale.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-indigo-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-indigo-600 font-semibold text-xl">₹{item.price}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Items Bought */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">
              Items You Bought
            </h2>
            {itemsBought.length === 0 ? (
              <p className="text-gray-600 italic">You have not bought any items yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {itemsBought.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-indigo-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-indigo-600 font-semibold text-xl">₹{item.price}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="max-w-6xl mx-auto text-center text-gray-600 p-6 mt-12">
          © {new Date().getFullYear()} NSRIT Exchange — Built with ❤️ by You
        </footer>
      </div>
    </>
  );
}
