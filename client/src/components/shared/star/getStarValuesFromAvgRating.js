function getStarValuesFromAvgRating(averageRating) {
  const starValues = [];

  for (let i = 0; i < 5; i += 1) {
    if (averageRating - i >= 1) {
      starValues.push(1);
    } else if (averageRating - i < 0) {
      starValues.push(0);
    } else {
      starValues.push(Math.round((averageRating - i) * 4) / 4);
    }
  }

  return starValues;
}

export default getStarValuesFromAvgRating;
