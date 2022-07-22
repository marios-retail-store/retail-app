// transforms style's skus into sorted array of {sku_id, size, quantity} objects, where quant > 0
const getStockArrayFromStyle = (style) => {
  let skus = Object.entries(style.skus);
  // filter out duplicate sizes, keeping the one with largest stock:
  const accountedSizeIndices = {}; // key = size, value = index of size in entries array
  for (let i = 0; i < skus.length; i += 1) {
    const { size } = skus[i][1];
    if (size in accountedSizeIndices) {
      if (skus[i][1].quantity > skus[accountedSizeIndices[size]][1].quantity) {
        skus.splice(accountedSizeIndices[size], 1);
        i -= 1;
        accountedSizeIndices[size] = i;
      } else {
        skus.splice(i, 1);
        i -= 1;
      }
    } else {
      accountedSizeIndices[size] = i;
    }
  }
  skus = skus.filter((skuEntry) => (
    skuEntry[0] !== 'null' && skuEntry[1].quantity !== null && skuEntry[1].size !== null
  ));
  skus.sort((a, b) => a[0] - b[0]);
  skus = skus.filter((entry) => entry[1].quantity > 0);
  return skus.map((entry) => (
    {
      sku_id: entry[0],
      size: entry[1].size,
      quantity: entry[1].quantity,
    }
  ));
};

export default getStockArrayFromStyle;
