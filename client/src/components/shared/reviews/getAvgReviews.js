function getAvgReviews(reviews) {
  const { results } = reviews;
  const { length } = results;
  const sum = results.reduce((acc, current) => acc + current.rating, 0);
  const average = Number((sum / length).toFixed(2));
  return average;
}

export default getAvgReviews;
