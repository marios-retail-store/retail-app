import getStarValuesFromAvgRating from './getStarValuesFromAvgRating.js';

describe('getStarValuesFromAvgRating', () => {
  test('correctly reformats a numeric average between 0 - 5 into an array of 5 star values', () => {
    expect(getStarValuesFromAvgRating(1)).toEqual([1, 0, 0, 0, 0]);
    expect(getStarValuesFromAvgRating(2)).toEqual([1, 1, 0, 0, 0]);
    expect(getStarValuesFromAvgRating(3)).toEqual([1, 1, 1, 0, 0]);
    expect(getStarValuesFromAvgRating(4)).toEqual([1, 1, 1, 1, 0]);
    expect(getStarValuesFromAvgRating(5)).toEqual([1, 1, 1, 1, 1]);
    expect(getStarValuesFromAvgRating(1.1)).toEqual([1, 0, 0, 0, 0]);
    expect(getStarValuesFromAvgRating(1.2)).toEqual([1, 0.25, 0, 0, 0]);
    expect(getStarValuesFromAvgRating(1.3)).toEqual([1, 0.25, 0, 0, 0]);
    expect(getStarValuesFromAvgRating(1.4)).toEqual([1, 0.5, 0, 0, 0]);
    expect(getStarValuesFromAvgRating(1.7)).toEqual([1, 0.75, 0, 0, 0]);
    expect(getStarValuesFromAvgRating(1.9)).toEqual([1, 1, 0, 0, 0]);
    expect(getStarValuesFromAvgRating(3.3)).toEqual([1, 1, 1, 0.25, 0]);
  });
});
