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

const styleWithDuplicate1 = {
  skus: {
    1394818: {
      quantity: 14,
      size: 'S',
    },
    1394819: {
      quantity: 50,
      size: 'S',
    },
  },
};

const styleWithDuplicate2 = {
  skus: {
    1394818: {
      quantity: 100,
      size: 'S',
    },
    1394819: {
      quantity: 50,
      size: 'S',
    },
  },
};

describe('testing getStockArrayFromStyle helper function', () => {
  test('returns an array in the correct format', () => {
    const stock = getStockArrayFromStyle(styleAllInStock);
    stock.forEach((item) => {
      expect(item.sku_id).not.toBe(undefined);
      expect(item.size).not.toBe(undefined);
      expect(item.quantity).not.toBe(undefined);
    });
  });

  test('returns the array in ascending sku_id order', () => {
    const stock = getStockArrayFromStyle(styleAllInStock);
    let lastId = -Infinity;
    stock.forEach((item) => {
      expect(Number(item.sku_id)).toBeGreaterThan(lastId);
      lastId = Number(item.sku_id);
    });
  });

  test('returns an empty array when none of the styles have stock', () => {
    expect(getStockArrayFromStyle(styleNoneInStock)).toEqual([]);
  });

  test('handles null values', () => {
    expect(getStockArrayFromStyle(styleWithNullValues)).toEqual([]);
  });

  test('filters out duplicate sku sizes, choosing the one with greater quantity', () => {
    expect(getStockArrayFromStyle(styleWithDuplicate1)).toEqual([{ sku_id: '1394819', size: 'S', quantity: 50 }]);
    expect(getStockArrayFromStyle(styleWithDuplicate2)).toEqual([{ sku_id: '1394818', size: 'S', quantity: 100 }]);
  });
});
