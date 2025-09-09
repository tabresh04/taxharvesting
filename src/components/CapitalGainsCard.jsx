const CapitalGainsCard = ({ gains }) => (
  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
      Capital Gains Summary
    </h2>
    <div className="space-y-3">
      <p className="text-gray-600 dark:text-gray-300">
        Pre-Harvest Gains: <span className="font-medium">${gains.preHarvestGains.toFixed(2)}</span>
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Post-Harvest Gains: <span className="font-medium">${gains.postHarvestGains.toFixed(2)}</span>
      </p>
      <p className="text-green-600 dark:text-green-400 font-bold text-lg">
        Tax Saved: ${gains.taxSaved.toFixed(2)}
      </p>
    </div>
  </div>
);

export default CapitalGainsCard;