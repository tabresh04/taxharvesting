import { useState } from 'react';
import { useHarvest } from "../components/context/HarvestContext";

const HoldingsTable = () => {
  const { holdings, toggleSelect } = useHarvest();
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const displayedHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 4);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Holdings</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-2 font-medium">Asset</th>
            <th className="text-left py-3 px-2 font-medium">Holdings</th>
            <th className="text-left py-3 px-2 font-medium">Total Current Value</th>
            <th 
              className="text-left py-3 px-2 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => requestSort('shortTermProfit')}
            >
              <div className="flex items-center">
                Short-term {getSortIndicator('shortTermProfit')}
              </div>
            </th>
            <th 
              className="text-left py-3 px-2 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => requestSort('longTermProfit')}
            >
              <div className="flex items-center">
                Long-Term {getSortIndicator('longTermProfit')}
              </div>
            </th>
            <th className="text-left py-3 px-2 font-medium">Amount to Sell</th>
            <th className="text-left py-3 px-2 font-medium">Select</th>
          </tr>
        </thead>
        <tbody>
          {displayedHoldings.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="py-3 px-2">
                <div className="font-medium">{item.name}</div>
              </td>
              <td className="py-3 px-2">
                <div>
                  <div>{item.holdingsAmount} {item.symbol}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">${item.holdingsValue}</div>
                </div>
              </td>
              <td className="py-3 px-2">${item.totalCurrentValue?.toLocaleString()}</td>
              <td className="py-3 px-2">
                <div className={item.shortTermProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {item.shortTermProfit >= 0 ? '+' : ''}${Math.abs(item.shortTermProfit)?.toLocaleString()}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {item.shortTermAmount} {item.symbol}
                </div>
              </td>
              <td className="py-3 px-2">
                <div className={item.longTermProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {item.longTermProfit >= 0 ? '+' : ''}${Math.abs(item.longTermProfit)?.toLocaleString()}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {item.longTermAmount} {item.symbol}
                </div>
              </td>
              <td className="py-3 px-2">
                {item.amountToSell ? (
                  <div className="text-blue-600 dark:text-blue-400">
                    {item.amountToSell} {item.symbol}
                  </div>
                ) : (
                  <div className="text-gray-400">-</div>
                )}
              </td>
              <td className="py-3 px-2">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleSelect(item.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-start">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          {showAll ? 'Show less' : 'View all'}
        </button>
      </div>
    </div>
  );
};

export default HoldingsTable;