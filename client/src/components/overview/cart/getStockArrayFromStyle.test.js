import getStockArrayFromStyle from './getStockArrayFromStyle.js';
import { styleAllInStock, styleNoneInStock } from '../exampledata';

// expected:
//   input: style
//   output: array of objects, containing sku_id, size, and quantity property
//           sorted by sku_id (which is ascending by size)

const styleWithNullValues = {
  skus: {
    null: {
      quantity: 1,
      size: 'XS',
    },
    1394818: {
      quantity: null,
      size: 'S',
    },
    1394819: {
      quantity: 0,
      size: null,
    },
  },
};

describe('testing getStockArrayFromStyle helper function', () => {
  let stock;
  let stockNoQuantity;
  let stockNullValues;

  beforeAll(() => {
    stock = getStockArrayFromStyle(styleAllInStock);
    stockNoQuantity = getStockArrayFromStyle(styleNoneInStock);
    stockNullValues = getStockArrayFromStyle(styleWithNullValues);
  });

  test('returns an array in the correct format', () => {
    stock.forEach((item) => {
      expect(item.sku_id).not.toBe(undefined);
      expect(item.size).not.toBe(undefined);
      expect(item.quantity).not.toBe(undefined);
    });
  });

  test('returns the array in ascending sku_id order', () => {
    let lastId = -Infinity;
    stock.forEach((item) => {
      expect(Number(item.sku_id)).toBeGreaterThan(lastId);
      lastId = Number(item.sku_id);
    });
  });

  test('returns an empty array when none of the styles have stock', () => {
    expect(stockNoQuantity).toEqual([]);
  });

  test('handles null values', () => {
    expect(stockNullValues).toEqual([]);
  });
});
