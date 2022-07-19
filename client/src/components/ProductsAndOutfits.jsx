import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { products, pStyles } from './ProductsandOutfits/exampleData.js';
import Carousel from './ProductsandOutfits/Carousel/Carousel.jsx';

const productTest = [products[pStyles.findIndex((style) => style.product_id === '40346')]].concat(products);
const styleTest = [{ product_id: '40346', results: [pStyles[pStyles.findIndex((style) => style.product_id === '40346')].results.find((result) => result.style_id === 240512)] }].concat(pStyles);
class ProductsAndOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: {
        products: [...productTest],
        styles: [...styleTest],
      },
      myOutfit: {
        products: [...productTest],
        styles: [...styleTest],
      },
    };
    this.deleteOutfitCard = this.deleteOutfitCard.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal(cardIndex, data) {
    console.log(cardIndex, data, this.currentProduct);
  }

  deleteOutfitCard(cardIndex) {
    const { myOutfit } = this.state;
    myOutfit.products.splice(cardIndex, 1);
    myOutfit.styles.splice(cardIndex, 1);
    this.setState({ myOutfit });
  }

  render() {
    const { relatedProducts } = this.state;
    const { myOutfit } = this.state;
    return (
      <>
        <p>Related Products</p>
        <Carousel
          products={relatedProducts.products}
          styles={relatedProducts.styles}
          type="related"
          actionBtnFunc={this.showModal}
        />
        <p>My Outfit</p>
        <Carousel
          products={myOutfit.products}
          styles={myOutfit.styles}
          type="outfit"
          actionBtnFunc={this.deleteOutfitCard}
        />
      </>
    );
  }
}
ProductsAndOutfits.propTypes = {
};
export default ProductsAndOutfits;
