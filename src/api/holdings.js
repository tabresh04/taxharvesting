export const getHoldings = async () => {
  return [
    {
      name: "Bitcoin",
      symbol: "BTC",
      quantity: 1.2,
      purchasePrice: 30000,
      currentPrice: 28000,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      quantity: 10,
      purchasePrice: 2000,
      currentPrice: 1800,
    },
    {
      name: "Solana",
      symbol: "SOL",
      quantity: 50,
      purchasePrice: 20,
      currentPrice: 40,
    }
  ];
};
