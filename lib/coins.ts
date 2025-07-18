// lib/coins.ts

// Coins awarded on signup
export function awardSignupCoins() {
  return 10;
}

// Coins awarded per successful buy or sell
export function awardBuySellCoins() {
  return 10;
}

// Coins awarded for free item posting (2-3 random)
export function awardFreeItemCoins() {
  return Math.floor(Math.random() * 2) + 2; // 2 or 3
}

// Check if user can withdraw coins (minimum 60)
export function canWithdraw(coins: number) {
  return coins >= 60;
}
