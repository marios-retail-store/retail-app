// transforms style's skus into sorted array of {sku_id, size, quantity} objects, where quant > 0
const getStockArrayFromStyle = (style) => {
  let skus = Object.entries(style.skus);
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
