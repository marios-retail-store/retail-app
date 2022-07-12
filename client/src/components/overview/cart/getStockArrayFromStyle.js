// desired format: array of pairs, where [size, quantity], and quantity > 0
const getStockArrayFromStyle = (style) => {
  let skus = Object.entries(style.skus);
  skus.sort((a, b) => a[0] - b[0]);
  skus = skus.filter((entry) => entry[1].quantity > 0);
  return skus.map((entry) => [entry[1].size, entry[1].quantity]);
};

export default getStockArrayFromStyle;
