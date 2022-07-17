import React from 'react';
import Overview from './Overview.jsx';
import ProductsAndOutfits from './ProductsAndOutfits.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';

function App() {
  return (
    <div>
      <Overview />
      <ProductsAndOutfits />
      <QuestionsAndAnswers productId={40344} productName="hoodies" />
    </div>
  );
}

export default App;
