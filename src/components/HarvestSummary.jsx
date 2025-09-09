import { useHarvest } from "./context/HarvestContext";

const HarvestSummary = () => {
  const { calculateCapitalGains, holdings } = useHarvest();
  const { pre, post } = calculateCapitalGains();

  // Calculate all values dynamically from holdings
  const calculateValues = () => {
    const selected = holdings.filter(h => h.selected);
    
    // Pre-harvest calculations
    const preHarvest = {
      shortTermProfit: selected.reduce((sum, h) => sum + (h.shortTermProfit > 0 ? h.shortTermProfit : 0), 0),
      shortTermLoss: selected.reduce((sum, h) => sum + (h.shortTermLoss > 0 ? h.shortTermLoss : 0), 0),
      longTermProfit: selected.reduce((sum, h) => sum + (h.longTermProfit > 0 ? h.longTermProfit : 0), 0),
      longTermLoss: selected.reduce((sum, h) => sum + (h.longTermLoss > 0 ? h.longTermLoss : 0), 0),
    };

    // Post-harvest calculations (harvesting losses)
    const postHarvest = {
      shortTermProfit: preHarvest.shortTermProfit, // Profits remain same
      shortTermLoss: selected.reduce((sum, h) => sum + Math.abs(h.shortTermLoss), 0), // Absolute losses
      longTermProfit: preHarvest.longTermProfit, // Profits remain same
      longTermLoss: selected.reduce((sum, h) => sum + Math.abs(h.longTermLoss), 0), // Absolute losses
    };

    // Net calculations
    const netPreShort = preHarvest.shortTermProfit - preHarvest.shortTermLoss;
    const netPreLong = preHarvest.longTermProfit - preHarvest.longTermLoss;
    const netPostShort = -postHarvest.shortTermLoss; // Only losses count post-harvest
    const netPostLong = -postHarvest.longTermLoss; // Only losses count post-harvest

    // Tax savings calculation (simplified - would use actual tax rates in real app)
    const taxRateShort = 0.3; // 30% for short-term
    const taxRateLong = 0.15; // 15% for long-term
    const taxSaved = 
      Math.max(0, netPreShort) * taxRateShort;
      Math.max(0, netPreLong) * taxRateLong;
      Math.max(0, netPostShort) * taxRateShort;
      Math.max(0, netPostLong) * taxRateLong;

    return {
      preHarvest: {
        ...preHarvest,
        netShortTerm: netPreShort,
        netLongTerm: netPreLong,
        totalGains: netPreShort + netPreLong
      },
      postHarvest: {
        ...postHarvest,
        netShortTerm: netPostShort,
        netLongTerm: netPostLong,
        totalGains: netPostShort + netPostLong,
        taxSaved: Math.max(0, taxSaved) // Don't show negative savings
      }
    };
  };

  const { preHarvest, postHarvest } = calculateValues();

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      {/* Pre Harvest */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Pre Harvesting</h2>
        
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-2">Profits</th>
              <th className="text-right">Short-term</th>
              <th className="text-right">Long-term</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2"></td>
              <td className="text-right">${preHarvest.shortTermProfit.toFixed(2)}</td>
              <td className="text-right">${preHarvest.longTermProfit.toFixed(2)}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Losses</td>
              <td className="text-right text-red-500">- ${preHarvest.shortTermLoss.toFixed(2)}</td>
              <td className="text-right text-red-500">- ${preHarvest.longTermLoss.toFixed(2)}</td>
            </tr>
            <tr className="border-b font-medium">
              <td className="py-2">Net Capital Gains</td>
              <td className="text-right">
                {preHarvest.netShortTerm >= 0 ? '$' : '-$'}
                {Math.abs(preHarvest.netShortTerm).toFixed(2)}
              </td>
              <td className="text-right">
                {preHarvest.netLongTerm >= 0 ? '$' : '-$'}
                {Math.abs(preHarvest.netLongTerm).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="font-semibold">Realised Capital Gains:</p>
        <p className={`text-xl font-bold ${
          preHarvest.totalGains >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {preHarvest.totalGains >= 0 ? '$' : '-$'}
          {Math.abs(preHarvest.totalGains).toFixed(2)}
        </p>
      </div>

      {/* Post Harvest */}
      <div className="w-full md:w-1/2 bg-blue-500 text-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">After Harvesting</h2>
        
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b border-blue-400">
              <th className="text-left pb-2">Profits</th>
              <th className="text-right">Short-term</th>
              <th className="text-right">Long-term</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-blue-400">
              <td className="py-2"></td>
              <td className="text-right">${preHarvest.shortTermProfit.toFixed(2)}</td>
              <td className="text-right">${preHarvest.longTermProfit.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-blue-400">
              <td className="py-2">Losses</td>
              <td className="text-right">- ${postHarvest.shortTermLoss.toFixed(2)}</td>
              <td className="text-right">- ${postHarvest.longTermLoss.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-blue-400 font-medium">
              <td className="py-2">Net Capital Gains</td>
              <td className="text-right">
                {postHarvest.netShortTerm >= 0 ? '$' : '-$'}
                {Math.abs(postHarvest.netShortTerm).toFixed(2)}
              </td>
              <td className="text-right">
                {postHarvest.netLongTerm >= 0 ? '$' : '-$'}
                {Math.abs(postHarvest.netLongTerm).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="font-semibold">Effective Capital Gains:</p>
        <p className={`text-xl font-bold ${
          postHarvest.totalGains >= 0 ? 'text-green-300' : 'text-red-300'
        }`}>
          {postHarvest.totalGains >= 0 ? '$' : '-$'}
          {Math.abs(postHarvest.totalGains).toFixed(2)}
        </p>
        
        <p className="mt-2">You are going to save up to</p>
        <p className="text-xl font-bold text-green-300">${postHarvest.taxSaved.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default HarvestSummary;