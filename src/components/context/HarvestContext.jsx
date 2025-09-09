import { createContext, useContext, useState } from "react";

// Updated sample static data with all required fields
const defaultHoldings = [
  {
    id: 1,
    name: "Ethereum ETH",
    symbol: "ETH",
    holdingsAmount: 5.6736,
    holdingsValue: "1,920.15",
    totalCurrentValue: 9324.21,
    shortTermProfit: 55320.15,
    shortTermAmount: 2.332,
    shortTermLoss: 0,
    longTermProfit: 8239.29,
    longTermAmount: 3.245,
    longTermLoss: 0,
    amountToSell: "5.6736 ETH",
    selected: false,
  },
  {
    id: 2,
    name: "Bitcoin BTC",
    symbol: "BTC",
    holdingsAmount: 0.83776,
    holdingsValue: "85,320.15",
    totalCurrentValue: 55320.15,
    shortTermProfit: 0,
    shortTermAmount: 0.338,
    shortTermLoss: 1200,
    longTermProfit: 2400,
    longTermAmount: 0.300,
    longTermLoss: 0,
    amountToSell: null,
    selected: false,
  },
  {
    id: 3,
    name: "Tether USDT",
    symbol: "USDT",
    holdingsAmount: 3096.54,
    holdingsValue: "1.15",
    totalCurrentValue: 3142.21,
    shortTermProfit: 0,
    shortTermAmount: 2011.23,
    shortTermLoss: 1200,
    longTermProfit: 2400,
    longTermAmount: 902.47,
    longTermLoss: 0,
    amountToSell: null,
    selected: false,
  },
  {
    id: 4,
    name: "Polygon MATIC",
    symbol: "MATIC",
    holdingsAmount: 2210,
    holdingsValue: "2.31",
    totalCurrentValue: 4672.12,
    shortTermProfit: 0,
    shortTermAmount: 802,
    shortTermLoss: 1200,
    longTermProfit: 2400,
    longTermAmount: 1402,
    longTermLoss: 0,
    amountToSell: null,
    selected: false,
  },
  {
    id: 5,
    name: "JioCoin JIO",
    symbol: "JIO",
    holdingsAmount: 1500,
    holdingsValue: "1.50",
    totalCurrentValue: 2250,
    shortTermProfit: 456,
    shortTermAmount: 500,
    shortTermLoss: 0,
    longTermProfit: 2400,
    longTermAmount: 1000,
    longTermLoss: 0,
    amountToSell: null,
    selected: false,
  },
];

// Create context
const HarvestContext = createContext();

// Custom hook for consuming context
export const useHarvest = () => useContext(HarvestContext);

// Context provider component
export const HarvestProvider = ({ children }) => {
  const [holdings, setHoldings] = useState(defaultHoldings);

  const toggleSelect = (id) => {
    setHoldings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectedHoldings = holdings.filter((h) => h.selected);

  const calculateCapitalGains = () => {
    let pre = { short: 0, long: 0 };
    let post = { short: 0, long: 0 };

    selectedHoldings.forEach((item) => {
      pre.short += item.shortTermProfit - (item.shortTermLoss || 0);
      pre.long += item.longTermProfit - (item.longTermLoss || 0);
      post.short += -(item.shortTermLoss || 0);
      post.long += -(item.longTermLoss || 0);
    });

    return { pre, post };
  };

  return (
    <HarvestContext.Provider 
      value={{ 
        holdings, 
        selectedHoldings,
        toggleSelect, 
        calculateCapitalGains 
      }}
    >
      {children}
    </HarvestContext.Provider>
  );
};

export default HarvestContext;