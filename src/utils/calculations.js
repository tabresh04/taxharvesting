export const calculateGains = (holdings) => {
  let preHarvestGains = 0;
  let postHarvestGains = 0;

  holdings.forEach((h) => {
    const gain = (h.currentPrice - h.purchasePrice) * h.quantity;
    preHarvestGains += gain;

    if (gain < 0) {
      // Assume sold at loss and repurchased at current price
      postHarvestGains += 0;
    } else {
      postHarvestGains += gain;
    }
  });

  return {
    preHarvestGains,
    postHarvestGains,
    taxSaved: preHarvestGains - postHarvestGains
  };
};
